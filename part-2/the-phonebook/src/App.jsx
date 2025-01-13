import { useState, useEffect } from 'react'
import axios from 'axios'
import Contacts from './components/Contacts'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [displayedPersons, setDisplayedPersons]  = useState([])

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => setPersons(response.data))
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();

    if (persons.some(p => p.name === newName || p.number === newNumber)) {
      alert(`${newName} is already added to the phonebook`)
      return;
  }

  const personObject = {
      name: newName,
      number: newNumber,
    }
    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter items={persons} setDisplayedPersons={setDisplayedPersons} />
      <PersonForm handleSubmit={handleSubmit} newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber} />
      <Contacts contacts={displayedPersons} />
    </div>
  )
}

export default App