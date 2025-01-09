import { useState } from 'react'

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>{text}</button>
)

const StatisticLine = ({ name, value }) => (
  <tr>
    <td>{name}</td>
    <td>{value}</td>
  </tr>
)

const Statistics = ({ good, bad, neutral }) => {
  const total = good + bad + neutral;

  if (total === 0) return <div>No feedback given yet</div>

  const sum = good - bad;
  const avg = sum / total;
  const positive = 100 * good / total;

  return (
    <div>
      <h1>Statistics</h1>
      <table>
        <tbody>
          <StatisticLine name={"Good"} value={good} />
          <StatisticLine name={"Neutral"} value={neutral} />
          <StatisticLine name={"Bad"} value={bad} />
          <StatisticLine name={"Total"} value={total} />
          <StatisticLine name={"Average"} value={avg} />
          <StatisticLine name={"Positive"} value={positive + '%'} />
        </tbody>
      </table>
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button onClick={() => setGood(good + 1)} text="Good" />
      <Button onClick={() => setNeutral(neutral + 1)} text="Neutral" />
      <Button onClick={() => setBad(bad + 1)} text="Bad" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App