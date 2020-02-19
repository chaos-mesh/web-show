import React from 'react';
import {
  Line,
  CartesianGrid,
  ComposedChart,
  ResponsiveContainer,
  XAxis,
  YAxis
} from 'recharts';
import { ITrafficData } from '../data';
import moment from 'moment'

interface IProps {
  data: ITrafficData[];
}

const TrafficChart: React.FC<IProps> = props => {
  const { data } = props;
  return (
    <ResponsiveContainer>
      <ComposedChart
        barGap="2%"
        width={600}
        height={400}
        margin={{
          top: 10,
          right: 30,
          left: 20,
          bottom: 20
        }}
        data={data}
      >
        <CartesianGrid vertical={false} />
        <Line type="monotone" dataKey="delay" stroke="#8884d8" />

        <XAxis
          tickLine={false}
          dataKey="time"
          domain = {['auto', 'auto']}
          tickFormatter = {(unixTime) => moment(unixTime).format('HH:mm Do')}
          type = 'number'
        />
        <YAxis
          label={{ value: 'Delay(ms)', position: 'insideLeft', angle: -90 }}
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
};

export default TrafficChart;
