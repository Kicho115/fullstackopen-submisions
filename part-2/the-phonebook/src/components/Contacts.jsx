const Contacts = ({ contacts, handleRemoveContact }) => {
    return (
        <div>
            <h1>Numbers</h1>
            {contacts.map((person) => (
                <div key={person.id}>
                    <p>👤 {person.name}  📞 {person.number}</p>
                    <button onClick={() => handleRemoveContact(person)}>Delete</button>
                </div>
            ))}
        </div>
    )
}

export default Contacts