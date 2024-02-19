const Persons = (props) => {

  return (
    <div>
      <ul>
        {props.person.map((person) => (
          <li key={person.id}>
            {person.name} {person.number}
            <button id={person.id} type='submit' onClick={props.deletePerson}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Persons
