const Contacts = ({ contacts, handleRemoveContact }) => {
    return (
        <div>
            <h2>Numbers</h2>
            <ul>
                {contacts.map((person) => (
                    <li className="note" key={person.id}>
                        <p>👤 {person.name}  📞 {person.number}</p>
                        <button onClick={() => handleRemoveContact(person)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Contacts