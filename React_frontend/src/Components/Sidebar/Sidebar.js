import React, { useContext, useState } from 'react'

import './sidebar.css'
// import { SidebarData } from './SidebarData'
import PopModal from '../Modal/PopModal'
import SidebarList from '../sidebarList/SidebarList'
import { GlobalInfo } from "../Home/Home"


const Sidebar = () => {

    const { numberList } = useContext(GlobalInfo)
    const [activeListID, setActiveListID] = useState('');
    const handleClick = (activeID) => {
        console.log(activeID);
        setActiveListID(activeID);
    }
    return (
        <div className="Sidebar"  >
            <div className="top">
                <span className="logo">Textnow </span>
                <span className="poppop"><PopModal /></span>
            </div>
            <div className="center" >
                {numberList.map((list) => {
                    return <SidebarList
                        handleClick={handleClick}
                        list={list}
                        key={list._id}
                        activeListID={activeListID}
                    />
                })}
            </div>
        </div>

    )
}

export default Sidebar

