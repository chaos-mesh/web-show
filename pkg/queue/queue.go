package queue

import (
	"sync"
	"sync/atomic"

	"github.com/juju/errors"
)

// Item represent item in queue
type Item interface {
	Key() interface{}
	SetPosition(pos int)
}

// Queue represent a queue
type Queue interface {
	// push an item at tail of queue
	Push(t Item) error
	// put an item at head of queue
	Put(t Item) error
	// pop an item from head of queue
	Pop() (Item, error)
	// find a specified item from queue, otherwise return an error that key was already removed
	Find(key interface{}) (Item, error)
	// remove an specified item
	Remove(key interface{}) (Item, error)
	Size() int
	All() []Item
	Full() bool
}

type item struct {
	sync.RWMutex

	item Item

	next    *item
	present int32
}

// listQueue is a queue used link list
type listQueue struct {
	head, tail *item

	size      int32
	sizeLimit int32
}

// NewListQueue returns a list queue
func NewListQueue(size int32) Queue {
	tail := &item{}
	head := &item{
		next: tail,
	}

	return &listQueue{
		head:      head,
		tail:      tail,
		sizeLimit: size,
	}
}

func (q *listQueue) validatePresent(prev, curr *item) bool {
	return atomic.LoadInt32(&prev.present) == 0 &&
		atomic.LoadInt32(&curr.present) == 0 &&
		prev.next == curr
}

func (q *listQueue) validatePush() error {
	for {
		size := atomic.LoadInt32(&q.size)
		if size >= q.sizeLimit {
			return errors.NotValidf("queue is overflow, %d size limit", q.sizeLimit)
		}
		if atomic.CompareAndSwapInt32(&q.size, size, size+1) {
			break
		}
	}

	return nil
}

func (q *listQueue) validatePop() error {
	for {
		size := atomic.LoadInt32(&q.size)
		if size == 0 {
			return errors.NotValidf("queue is empty")
		}
		if atomic.CompareAndSwapInt32(&q.size, size, size-1) {
			break
		}
	}

	return nil
}

func (q *listQueue) Put(t Item) error {
	return errors.Trace(q.push(t, false))
}

func (q *listQueue) Push(t Item) error {
	return errors.Trace(q.push(t, true))
}

func (q *listQueue) push(t Item, atTail bool) error {
	if err := q.validatePush(); err != nil {
		return errors.Trace(err)
	}

	var (
		prev, curr *item
		absent     = true
		item       = &item{
			item: t,
		}
	)
	for absent {
		prev = q.head
		curr = q.head.next

		for atTail && curr != q.tail {
			prev = curr
			curr = curr.next
		}

		prev.Lock()
		curr.Lock()

		if q.validatePresent(prev, curr) {
			prev.next = item
			item.next = curr
			absent = false
		}

		prev.Unlock()
		curr.Unlock()
	}

	return nil
}

func (q *listQueue) Pop() (Item, error) {
	if err := q.validatePop(); err != nil {
		return nil, errors.Trace(err)
	}

	var (
		prev, curr *item
		present    = true
	)
	for present {
		prev = q.head
		curr = q.head.next

		prev.Lock()
		curr.Lock()

		if q.validatePresent(prev, curr) {
			atomic.StoreInt32(&curr.present, 1)
			prev.next = curr.next
			present = false
		}

		prev.Unlock()
		curr.Unlock()
	}

	return curr.item, nil
}

func (q *listQueue) Find(key interface{}) (Item, error) {
	index := 0
	for curr := q.head.next; curr != q.tail; curr = curr.next {
		index++
		if curr.item.Key() == key {
			if atomic.LoadInt32(&curr.present) == 0 {
				curr.item.SetPosition(index)
				return curr.item, nil
			}
			return nil, errors.Errorf("key %v was already removed", key)
		}
	}

	return nil, errors.NotFoundf("key %v", key)
}

func (q *listQueue) Remove(key interface{}) (Item, error) {
	var (
		prev, curr *item
		present    = true
	)
	for present {
		prev = q.head
		curr = q.head.next

		for curr != q.tail && curr.item.Key() != key {
			prev = curr
			curr = curr.next
		}

		if curr == q.tail {
			return nil, errors.Errorf("key %v was already removed", key)
		}

		prev.Lock()
		curr.Lock()

		if q.validatePresent(prev, curr) {
			atomic.StoreInt32(&curr.present, 1)
			atomic.AddInt32(&q.size, -1)
			prev.next = curr.next
			present = false
		}

		prev.Unlock()
		curr.Unlock()
	}

	return curr.item, nil
}

func (q *listQueue) Size() int {
	return int(atomic.LoadInt32(&q.size))
}

func (q *listQueue) Full() bool {
	return q.size >= q.sizeLimit
}

func (q *listQueue) All() []Item {
	size := int(atomic.LoadInt32(&q.size))
	items := make([]Item, 0, size)
	index := 0

	for curr := q.head.next; curr != q.tail; curr = curr.next {
		index++
		if atomic.LoadInt32(&curr.present) == 0 {
			curr.item.SetPosition(index)
			items = append(items, curr.item)
		}
	}

	return items
}
