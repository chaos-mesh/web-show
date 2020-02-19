export interface ITrafficData {
  time: number;
  delay: number;
}

export interface IData {
  traffic: ITrafficData[];
}

export const data: IData = {
 traffic: [
  {time: 1503617297689, delay: 15},
  {time: 1503616962277, delay: 152},
  {time: 1503616882654, delay: 112},
  {time: 1503613184594, delay: 201},
  {time: 1503611308914, delay: 141},
    ]
}
