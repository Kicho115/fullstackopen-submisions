import Input from "./Input"

const PersonForm = ({ handleSubmit, newName, setNewName, newNumber, setNewNumber }) => {
    return (
        <div>
            <h2>Add a contact</h2>
            <form onSubmit={handleSubmit}>
                <Input label={"Name"} value={newName} onChange={(e) => setNewName(e.target.value)} />
                <Input label={"Number"} value={newNumber} onChange={(e) => setNewNumber(e.target.value)} />
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
        </div>
    )
}

export default PersonForm