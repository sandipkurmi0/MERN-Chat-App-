import React, { useContext } from 'react'
import './sidebarList.css'
import moment from 'moment'
import { GlobalInfo } from "../Home/Home"
// import { useState, useEffect } from 'react'

const SidebarList = ({ list, handleClick, activeListID }) => {

    const { setCurrentNumber } = useContext(GlobalInfo)

    const numberSelectHandler = () => {
        const selectedList = list
        setCurrentNumber(selectedList)
        handleClick(list._id);
    }

    return (
        <div onClick={numberSelectHandler} className={activeListID === list._id ? 'active' : ""}>
            <ul className="SidebarList">
                <li className="row" >
                    <span className="number">{list._id}</span>
                    <span className="message">{list.message.slice(0, 33)}...</span>
                    <span className="day">{moment(list.createdAt).format('dddd')}</span>
                </li>
            </ul>
        </div>
    )
}

export default SidebarList