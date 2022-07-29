import { getLastScore } from '../util/prisma.js';

export default function Mood(req, res) {
  getLastScore().then((data) => {
    res.end(JSON.stringify(data, (_key, value) => (
      typeof value === 'bigint'
        ? parseInt(value.toString(), 10)
        : value
    )));
  }).catch((e) => {
    res.end(e.toString());
  });
}