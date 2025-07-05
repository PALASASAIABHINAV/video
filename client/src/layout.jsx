import React from 'react'
import { Outlet } from 'react-router-dom'
import SideBar from './components/SideBar'
import Container, { ScrollableContainer } from './components/Container'

function Layout() {
    return (
        <div className='flex'>
            <div className='w-1/5'>
            <SideBar />
            </div>
            {/* <div className='bg-gray-500 w-full'>
                <Outlet />
            </div> */}
            <Container>
                <ScrollableContainer />
            </Container>
        </div>
        
    )
}

export default Layout
