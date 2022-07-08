import React, { useEffect, useState } from 'react'
import PhoneIcon from '@material-ui/icons/Phone';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import './navbar.css'

const Navbar = ({ currentNumber }) => {

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