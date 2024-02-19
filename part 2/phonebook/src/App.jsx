import { useState, useEffect } from "react"
import Persons from "./components/persons"
import PersonForm from "./components/personForm"
import Filter from "./components/filter"
import Notification from "./components/notification"
import personService from "./services/persons"

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [filter, setFilter] = useState("")
  const [message, setMessage] = useState("")
  const [errorMessage, setErrorMessage] = useState("")

  useEffect(() => {
    personService.getAll().then((response) => {
      setPersons(response.data)
    })
  }, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleFilter = (event) => {
    const newFilter = event.target.value
    setFilter(newFilter)
  }

  const personNameMap = persons.map((person) => person.name)

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
    }
    const personName = personObject.name

    if (personNameMap.includes(personObject.name)) {
      if (
        window.confirm(
          `${personName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        const person = persons.find(
          (person) => person.name === personObject.name
        )
        const indexOfPerson = persons.indexOf(person)

        let modifiedArray = persons
        modifiedArray[indexOfPerson] = personObject

        personService.update(person.id, personObject).then((response) => {
          setPersons(modifiedArray)
          setNewName("")
          setNewNumber("")
          setMessage(`Updated '${personObject.name}'`)
          setTimeout(() => {
            setMessage("")
          }, 10000)
        })
      }
    } else {
      //Add person functionality
      personService.create(personObject).then((response) => {
        setPersons(persons.concat(response.data))
        setNewName("")
        setNewNumber("")
        setMessage(`Added '${personObject.name}'`)
        setTimeout(() => {
          setMessage("")
        }, 10000)
      })
    }
  }

  const deletePerson = (event) => {
    event.preventDefault()
    let personsCopy = persons.filter((person) => person.id != event.target.id)

    if (window.confirm(`Do you really want to delete this person?`)) {
      personService.delete(event.target.id).then((response) => {
        setPersons(personsCopy)
        personService.getAll()
        setMessage(`Person removed`)
        setTimeout(() => {
          setMessage("")
        }, 10000)
      }).catch (error => {
        setErrorMessage('This person has already been removed')
      }) 
    }
  }

  const filteredPersons = filter
    ? persons.filter((person) =>
        person.name.toLowerCase().includes(filter.toLowerCase())
      )
    : persons

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} errorMessage={errorMessage} />
      <Filter filter={filter} handleFilter={handleFilter}></Filter>
      <h3>add a new</h3>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      ></PersonForm>
      <h2>Numbers</h2>
      <Persons person={filteredPersons} deletePerson={deletePerson}></Persons>
    </div>
  )
}

export default App