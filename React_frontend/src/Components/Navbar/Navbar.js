import React, { useEffect, useState, useContext } from 'react'
import PhoneIcon from '@material-ui/icons/Phone';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import './navbar.css'

import { GlobalInfo } from "../Home/Home"



const Navbar = () => {

    const { currentNumber } = useContext(GlobalInfo)

    const [number, setNumber] = useState("")

    useEffect(() => {
        if (currentNumber !== undefined) {
            setNumber(currentNumber._id)
        }
    }, [currentNumber])


    return (
        <div className="Navbar">
            <div className="wrapper">
                <div className="messageInfo">
                    <span className="name">sandip</span>
                    <span className="number">{number}</span>
                </div>
                <div className="items">
                    <div className="item">
                        <PhoneIcon className="icon" />
                    </div>
                    <div className="item">
                        <MoreVertIcon
                            className="icon"
                        // onClick={() => dispatch({ type: "TOGGLE" })}
                        />
                    </div>
                </div>
            </div>
            <hr />
        </div>
    )
}

export default Navbar