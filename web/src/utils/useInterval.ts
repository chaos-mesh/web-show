// useInterval Custom Hook
// Making setInterval Declarative with React Hooks

import { useEffect, useRef } from 'react'

const noop = () => {} // keep typescript happy
export const useInterval = (
  callback: () => void,
  latency: number | null,
  immediate?: boolean // called when mounted if true
) => {
  const savedCallback = useRef(noop)

  // Remember the latest function.
  useEffect(() => {
    savedCallback.current = callback
  })

  // Execute callback if immediate is set.
  useEffect(() => {
    if (!immediate) return
    savedCallback.current()
  }, [immediate])

  // Set up the interval.
  useEffect(() => {
    if (latency === null) return undefined

    const tick = () => savedCallback.current()
    const id = setInterval(tick, latency)
    return () => clearInterval(id)
  }, [latency])
}
