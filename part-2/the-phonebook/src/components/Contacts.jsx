const Contacts = ({ contacts }) => {
    return (
        <div>
            <h1>Numbers</h1>
            {contacts.map((person, i) => <p key={i}>👤 {person.name}  📞 {person.number}</p>)}
        </div>
    )
}

export default Contacts