import React, { useState, useEffect } from 'react'
import Sidebar from '../Sidebar/Sidebar'
import Navbar from '../Navbar/Navbar'
import InputMessage from '../InputMessage/InputMessage'
import ChatMessages from '../chatMessage/ChatMessage'
import { getNumber, getMessage } from '../../api/api'

const Home = () => {

    const [numberList, setNumberList] = useState([])
    const [currentNumber, setCurrentNumber] = useState(numberList[0])
    const [allMessage, setAllMessage] = useState([])


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
                    <InputMessage currentNumber={currentNumber} setAllMessage={setAllMessage} />
                </div>
            </div>
        </div>
    )
}

export default Home