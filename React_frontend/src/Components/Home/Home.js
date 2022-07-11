import React, { useState, useEffect } from 'react'
import Sidebar from '../Sidebar/Sidebar'
import Navbar from '../Navbar/Navbar'
import InputMessage from '../InputMessage/InputMessage'
import ChatMessages from '../chatMessage/ChatMessage'
import { getNumber, getMessage } from '../../api/api'

import io from 'socket.io-client'
const socket = io.connect("http://localhost:3001")

const Home = () => {

    const [numberList, setNumberList] = useState([])
    const [currentNumber, setCurrentNumber] = useState(numberList[0])
    const [allMessage, setAllMessage] = useState([])

    socket.on("reveive_message", (data) => {
        setAllMessage([...allMessage, data])
        getAllNumber()
    })

    useEffect(() => {
        if (currentNumber !== undefined) {
            getAllMessage(currentNumber._id);
        }
        // try {
        //     getMessage(currentNumber._id);
        // } catch (error) {
        //     console.error(error);
        // }

    }, [currentNumber])

    const getAllMessage = async (number) => {
        const response = await getMessage({ to: number });
        setAllMessage(response.data)
    }

    useEffect(() => {
        getAllNumber()
    }, [])

    const getAllNumber = async () => {
        let response = await getNumber();
        setNumberList(response.data)
    }

    return (
        <div style={{ display: "flex" }}>
            <Sidebar numberList={numberList} setCurrentNumber={setCurrentNumber} />
            <div style={{ flex: 5 }}>
                <Navbar currentNumber={currentNumber} />
                <div>
                    <ChatMessages allMessage={allMessage} />
                    <InputMessage currentNumber={currentNumber} setAllMessage={setAllMessage} allMessage={allMessage} getAllNumber={getAllNumber} getAllMessage={getAllMessage} />
                </div>
            </div>
        </div>
    )
}

export default Home