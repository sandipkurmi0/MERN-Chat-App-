import React from 'react'
import './sidebar.css'
// import { SidebarData } from './SidebarData'
import PopModal from '../Modal/PopModal'
import SidebarList from '../sidebarList/SidebarList'


const Sidebar = ({ numberList, setCurrentNumber }) => {

    return (

        <div className="Sidebar"  >
            <div className="top">
                <span className="logo">Textnow </span>
                <span className="poppop"><PopModal /></span>
            </div>
            <div className="center">
                {numberList.map((list) => {
                    return <SidebarList
                        //numberList={numberList}
                        list={list}
                        key={list._id}
                        setCurrentNumber={setCurrentNumber}
                    />
                })}
            </div>
        </div>

    )
}

export default Sidebar

