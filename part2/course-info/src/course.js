import React from 'react';

export const Course =({course})=>{
    return(
        <div>
        <Header name={course.name}/>
        <Content parts={course.parts}/>
        <Total parts={course.parts} />
    </div>
    )
    
    
}

const Header = ({name}) =>{
    return(
      <h1>{name}</h1>
    )
  }
  
  const Content = ({parts})=>{
    return(
      <div>
        {parts.map(part=><Part key={part.id} part={part.name} exercises={part.exercises}/>)}
        
      </div>
    )
  }
  
  
  const Part = ({part, exercises})=>{
    return(
      <p>
          {part} {exercises}
        </p>
    )
  }

  const Total = ({parts}) =>{
      const exercises= parts.map(part=>part.exercises);
      let totalExercises=exercises.reduce((a, b) => a + b, 0)
      
    return(
      <p><strong>Total of {totalExercises} exercises.</strong></p>
    )
  }