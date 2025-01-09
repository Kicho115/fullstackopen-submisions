const Header = props => {
    return (
      <h1>{props.course}</h1>
    )
  }
  
  const Part = props => {
    return (
      <>
        <p>
          {props.part} {props.exercise}
        </p>
      </>
    )
  }
  
  const Content = props => {
    const parts = props.parts;
    return (
      props.parts.map(part => <Part key={part.id} part={part.name} exercise={part.exercises} />)
    )
  }
  
  const Total = ({parts}) => {
    return (
      <strong>Number of exercises {parts.reduce(
        (sum, part) => sum + part.exercises, 0
      )}</strong>
    )
  }
  
  const Course = ({course}) => {
    return (
      <div>
        <Header course={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
      </div>
    )
  }

  export default Course;