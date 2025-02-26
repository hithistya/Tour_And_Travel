import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Preload from '../components/Preload'
import Sidebar from '../components/Sidebar'

const Layout = () => {
    return (
        <>
        <div className='wrapper'>
            <Header/>
            <Sidebar/>
            <div className='content-wrapper'>{<Outlet/>}</div>
            <Footer/>
        </div>
        </>
    )
}

export default  Layout