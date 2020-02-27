export interface ITrafficData {
  time: number;
  latency: number;
}

export interface IData {
  traffic: ITrafficData[];
}

export const data: IData = {
 traffic: [
  {time: 1503617297689, latency: 15},
  {time: 1503616962277, latency: 152},
  {time: 1503616882654, latency: 112},
  {time: 1503613184594, latency: 201},
  {time: 1503611308914, latency: 141},
    ]
}
