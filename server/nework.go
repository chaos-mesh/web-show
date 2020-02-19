package server

import (
	"net/http"
	"time"

	"github.com/pingcap/log"
	"github.com/sparrc/go-ping"
	"github.com/unrolled/render"
)

const (
	GoogleAddress = "www.google.com"
)

type PingD struct {
	Time  int64 `json:"time"`
	Delay time.Duration `json:"delay"`
}

func (p *PingD) Key() interface{} {
	return p
}

func (p *PingD) SetPosition(_ int) {}

func (s *Server) startPing() {
	ticker := time.NewTicker(10 * time.Second)
	for {
		select {
		case <-ticker.C:
			pinger, err := ping.NewPinger(GoogleAddress)
			if err != nil {
				log.Error(err.Error())
				s.push(&PingD{Time: time.Now().Unix()})
				continue
			}
			pinger.Count = 1
			pinger.Run() // blocks until finished
			stats := pinger.Statistics()
			s.push(&PingD{Time: time.Now().Unix(), Delay: stats.AvgRtt})
		}
	}
}

func (s *Server) push(data *PingD) {
	if s.pingData.Full() {
		s.pingData.Pop()
	}

	s.pingData.Push(data)
}

func (s *Server) network(w http.ResponseWriter, r *http.Request) {
	rdr := render.New()

	var data []PingD

	for _, p := range s.pingData.All() {
		pd,ok := p.(*PingD)
		if !ok {
			continue
		}

		data = append(data, *pd)
	}

	rdr.JSON(w, 200, data)
}
