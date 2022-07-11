// import React, { useState } from 'react'
import './sidebarList.css'
import moment from 'moment'

const SidebarList = ({ list, setCurrentNumber }) => {

    const numberSelectHandler = () => {
        const selectedList = list
        setCurrentNumber(selectedList)
    }

    return (
        <div onClick={numberSelectHandler}>
            <ul className="SidebarList">
                <li className="row">
                    <span className="number">{list._id}</span>
                    <span className="message">{list.message.slice(0, 33)}...</span>
                    <span className="day">{moment(list.createdAt).format('dddd')}</span>
                </li>
            </ul>
        </div>
    )
}

export default SidebarList