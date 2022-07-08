import React, { useState, useEffect, useReducer } from 'react'
import { sendSms } from '../../api/api'
import './inputMessage.css'
import io from 'socket.io-client'

const socket = io.connect("http://localhost:3001")


const InputMessage = ({ currentNumber, setAllMessage }) => {
    // console.log(currentNumber._id)
    const sendMessage = () => {
        socket.emit("send_message", { message: "hello" })
    };

    useEffect(() => {
        socket.on("reveive_message", (data) => {
            alert(data.message)
        })
    }, [socket])

    const [number, setNumber] = useState("")
    const [message, setMessage] = useState("")
    const [reducerValue, forceUpdate] = useReducer(x => x + 1, 0);

    console.log(number)
    console.log(message);

    useEffect(() => {
        if (currentNumber !== undefined) {
            setNumber(currentNumber._id)
        }


    }, [currentNumber, reducerValue])

    const handleSubmit = async () => {
        await sendSms({
            To: number,
            Body: message,
        })
        forceUpdate()
    }


    return (
        // <form onSubmit={(e) => handleSubmit(e)} className="inputMessage">
        //     <span className="textinput">
        //         <input className="input"
        //             onChange={(e) => setMessage(e.target.value)}
        //             value={message}
        //             type="text"
        //             placeholder="Type a message..."
        //         /></span>
        //     <button className="btn btn-outline-success" >Send</button>
        //     {/* <button className="btn" style={{ background: "rgb(129, 73, 248)", border: "none", color: "white" }}>send</button> */}
        // </form>

        <div className="inputMessage">
            <span className="textinput">
                <input className="input" placeholder="Message....." />
            </span>
            <button onClick={sendMessage} className="btn btn-outline-success" >Send</button>
        </div>
    )
}




export default InputMessage