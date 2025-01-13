import { useState } from "react"
import Input from "./Input"

const Filter = ({items, setDisplayedPersons}) => {
    const [input, setInput] = useState('')

    const handleOnChange = (event) => {
        const newInput = event.target.value;
        setInput(newInput)
        
        const filteredContacts = items.filter((i) => i.name.toLowerCase().includes(newInput.toLowerCase()))
        setDisplayedPersons(filteredContacts);
    }

    return (
        <div>
            <Input label={"Filter contacts"} value={input} onChange={handleOnChange} />
        </div>
    )
}

export default Filter