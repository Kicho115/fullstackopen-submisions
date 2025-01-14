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

    const personObject = {
      name: newName,
      number: newNumber,
    }

    if (persons.some(p => p.number === newNumber)) {
      alert(`${newName} is already added to the phonebook`)
      return;
    } else if (persons.some(p => p.name === newName && p.number !== newNumber)) {
      if (!window.confirm(`${newName} is already added to the phonebook, replace the old number with the new number ${newNumber}?`)) return

      const existingPerson = persons.find(p => p.name === newName)
      const updatedPerson = { ...personObject, id: existingPerson.id }

      contactsService
      .update(updatedPerson)
      .then(contactObject => {
        const newPersons = persons.map(p => p.id === contactObject.id ? contactObject : p)
        setPersons(newPersons)
        setDisplayedPersons(newPersons)
        setNewName('')
        setNewNumber('')
      })
      return
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