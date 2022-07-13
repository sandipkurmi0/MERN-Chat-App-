import React, { useState, useEffect, useContext } from 'react'
import { sendSms } from '../../api/api'
import './inputMessage.css'
import { GlobalInfo } from "../Home/Home"



const InputMessage = ({ setAllMessage }) => {
    const { currentNumber, allMessage, getAllNumber } = useContext(GlobalInfo)

    const [number, setNumber] = useState("")
    const [message, setMessage] = useState("")


    const sendMessage = async () => {
        await sendSms({
            To: number,
            Body: message,
            Type: "send"
        })
        setAllMessage([...allMessage, { number, message, type: "send", _id: Date.now() }])
        getAllNumber()
        setMessage("")
    };

    useEffect(() => {
        if (currentNumber !== undefined) {
            setNumber(currentNumber._id)
        }

    }, [currentNumber])


    return (
        <div className="inputMessage">
            <span className="textinput">
                <input onChange={(e) => setMessage(e.target.value)} value={message} className="input" placeholder="Message....." />
            </span>
            <button onClick={sendMessage} className="btn btn-outline-success">Send</button>
        </div>
    )
}




export default InputMessage