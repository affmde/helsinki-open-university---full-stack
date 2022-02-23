import React, { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood =()=> setGood(good+1)
  const handleNeutral = ()=> setNeutral(neutral+1)
  const handleBad = ()=>setBad(bad+1)
  

  return (
    <div>
      <Header text="give feedback" />
      <Button text="good" handle={handleGood}></Button>
      <Button text="neutral" handle={handleNeutral} ></Button>
      <Button text="bad" handle={handleBad} ></Button>
      <Header text="Statistics" />
      <Stats good={good} neutral={neutral} bad={bad} />
      
    </div>
  )
}

const Header = ({text})=><h3>{text}</h3>

const Button = ({text, handle})=><button onClick={handle}>{text}</button>

const Stats = ({good, neutral, bad})=>{
  const total=good+neutral+bad;
  const average = (good-bad)/total
  const percentage = good*100/total

  if(!good && !neutral && !bad){
    return (<p>No feedback given</p>)
  }

  return(
    <table>
      <tbody>
        <StatsLine text="good" value={good} />
        <StatsLine text="neutral" value={neutral} />
        <StatsLine text="bad" value={bad} />
        <StatsLine text="all" value={total} />
        <StatsLine text="average" value={average} />
        <StatsLine text="positive" value={percentage} />

      </tbody>
    </table>
  )
}


const StatsLine = ({text, value})=>{
  return(
    <tr>
      <td>
        {text}  {value}
      </td>
    </tr>
  )
}

export default App