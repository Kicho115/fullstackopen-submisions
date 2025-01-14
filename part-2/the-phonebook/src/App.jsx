import { useState, useEffect } from 'react'
import contactsService from './services/contacts'
import Contacts from './components/Contacts'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [displayedPersons, setDisplayedPersons] = useState([])

  useEffect(() => {
    
    contactsService
      .getAll()
      .then(initialContacts => {
        setPersons(initialContacts)
        setDisplayedPersons(initialContacts)
      })
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

    contactsService
      .create(personObject)
      .then(contactObject => {
        setPersons(persons.concat(contactObject))
        setDisplayedPersons(persons.concat(contactObject))
        setNewName('')
        setNewNumber('')
      })
  }

  const handleRemoveContact = contact => {
    if (!window.confirm(`Delete ${contact.name}?`)) return

    contactsService
    .remove(contact.id)
    .then(contactObject => {
      const updatedContacts = persons.filter(item => item.id !== contactObject.id)
      setPersons(updatedContacts)
      setDisplayedPersons(updatedContacts)
    })
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter items={persons} setDisplayedPersons={setDisplayedPersons} />
      <PersonForm handleSubmit={handleSubmit} newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber} />
      <Contacts contacts={displayedPersons} handleRemoveContact={handleRemoveContact}/>
    </div>
  )
}

export default App