import React from 'react'

const Header = props =>
  <h1>{props.course}</h1>

// const Total = props => {

//   return <p>Number of exercises {props.parts[0].exercises+props.parts[1].exercises+props.parts[2].exercises}</p>
// }
  

const Part = props =>
  <p>{props.part.name} {props.part.exercises}</p>


const Content = props => {
     return props.parts.map((part)=> <Part key={part.id} part={part} />)
}

const Course = ({course}) => {    
  return (
  <div>
    <Header course={course.name} />
    <Content parts={course.parts}/>
    {/* <Total parts={course.parts} /> */}
  </div>
  )
}

export default Course;