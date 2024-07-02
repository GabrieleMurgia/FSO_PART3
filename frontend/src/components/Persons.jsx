const Persons = ({ persons , handleDeletePerson}) => {
    return (
      <div>
        {persons.map(person =>{
        return <p key={person.id}>{person.name} {person.number} <button onClick={()=>{handleDeletePerson(person)}}>Delete</button></p>
      })}
      </div>
    )
  }
  
  export default Persons