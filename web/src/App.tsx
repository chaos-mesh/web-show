import React, { Dispatch, SetStateAction } from 'react'
import styled, { ThemeProvider } from 'styled-components'
import { Point } from 'react-simple-maps'
import Banner from './components/Banner'
import TrafficChartContainer from './components/ChartContainer'

export interface IAppState {
  selectedPoint: Point
  setSelectedPoint: Dispatch<SetStateAction<Point>>
}

const theme = {
  colors: [
    '#935B92',
    '#52A429',
    '#F3B266',
    '#A09E92',
    '#634465',
    '#00AFD6',
    '#95C01F',
    '#F796B8',
    '#E67921',
    '#A62D4E'
  ]
}

const AppStyles = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  height: 100%;
  margin-bottom: 20px;
`
const BodyStyles = styled.div`
  width: 95%;
  margin-left: auto;
  margin-right: auto;
`

const Row = styled.div`
  margin-top: 20px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <AppStyles className="App">
        <Banner />
        <BodyStyles className="body">
          <Row>
            <TrafficChartContainer title="Ping" />
          </Row>
        </BodyStyles>
      </AppStyles>
    </ThemeProvider>
  )
}

export default App
