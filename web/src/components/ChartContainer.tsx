import React, { useState } from 'react'
import styled from 'styled-components'

import TrafficChart from './TrafficChart'

import { useInterval } from '../utils/useInterval'
import { ITrafficData } from '../data'

interface IChartProps {
  title: string
}

const ChartContainerStyles = styled.div`
  border: 0.5px solid #eeeeee;
  padding: 10px;
  padding-top: 0px;
  margin: 10px 10px 10px 10px;
  display: flex;
  flex-direction: column;
  width: 46%;
  height: 600px;
`

const ChartTitleStyles = styled.h2`
  width: 100%;
  padding: 0;
  font-size: 14px;
  align-self: flex-start;
  text-align: center;
`

const ChartContainer: React.FC<IChartProps> = props => {
  const { title } = props
  const [traffic, setTraffic] = useState<ITrafficData[]>([])

  const fetchData = () => {
    console.log('on fetch data', new Date())
    // TODO: use real fetch data API, and update response data with setTraffic Hook
    fetch("/api/network").then(res => res.json()).then((data) => {
        setTraffic(data)
    }).catch(console.log)
  }

  useInterval(fetchData, 10 * 1000, true)

  return (
    <ChartContainerStyles>
      <ChartTitleStyles>{title}</ChartTitleStyles>
      <TrafficChart data={traffic} />
    </ChartContainerStyles>
  )
}

export default ChartContainer
