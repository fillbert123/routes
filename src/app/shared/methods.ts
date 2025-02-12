import corridorData from '../../assets/data/corridor.json';
import stopData from '../../assets/data/stop.json';
import stopDirection from '../../assets/data/stopDirection.json';

export function getStopName(code) {
  return stopData.find((item) => {
    return item.stopId === code;
  }).stopName;
}