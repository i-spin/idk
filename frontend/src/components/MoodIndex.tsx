import { useEffect, useState } from 'preact/hooks';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export default function MoodIndex() {
  const [moodData, setMoodData] = useState<{ id: number, date: number, score: number } | undefined>(undefined);

  useEffect(() => {
    fetch('https://api.idk.i-sp.in/mood')
      .then((res) => res.json())
      .then((data) => { setMoodData(data); console.log(data) })
  }, [])

  return (
    <div className='text-center'>
      <p>{!moodData ? "loading..." : `Mood Index: ${moodData.score}`}</p>
      <p>{!moodData ? "loading..." : `Updated ${dayjs.unix(moodData.date / 1000).fromNow()}`}</p>
    </div>
  )
}
