import React, { useState, useEffect, createContext } from 'react'
import Sidebar from '../Sidebar/Sidebar'
import Navbar from '../Navbar/Navbar'
import InputMessage from '../InputMessage/InputMessage'
import ChatMessages from '../chatMessage/ChatMessage'
import { getNumber, getMessage } from '../../api/api'
import io from 'socket.io-client'
const socket = io.connect("https://my-mern-chat-app-twilio.herokuapp.com")

export const GlobalInfo = createContext()

const Home = () => {

    const [numberList, setNumberList] = useState([])
    const [currentNumber, setCurrentNumber] = useState([])
    const [allMessage, setAllMessage] = useState([])



    socket.on("reveive_message", (data) => {
        if (currentNumber !== undefined) {

            if (currentNumber._id === data.to) {
                getAllMessage(data.to)
            }
        }
        getAllNumber()
    })


    const divStyle = {
        overflowY: 'scroll',
        // border: '1px solid red',
        width: '100%',
        float: 'left',
        height: '808px',
        position: 'relative'
    };

    useEffect(() => {
        if (currentNumber !== undefined) {
            getAllMessage(currentNumber._id);
        }
        getAllNumber()
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

    const getAllNumber = async () => {
        let response = await getNumber();
        setNumberList(response.data)
    }


    return (
        <GlobalInfo.Provider value={{ numberList, allMessage, setCurrentNumber, currentNumber, getAllNumber }}>
            <div style={{ display: "flex" }}>
                <Sidebar />
                <div style={{ flex: 5 }}>
                    <Navbar />
                    <div>
                        <div style={divStyle}>
                            <ChatMessages />
                        </div>
                        <InputMessage setAllMessage={setAllMessage} />
                    </div>
                </div>
            </div>
        </GlobalInfo.Provider>
    )
}

export default Home