import React from 'react'
import DashboardMenu from './DashboardMenu'
import { Outlet } from 'react-router-dom'

export default function Dashboard() {
    // ovde se nesto izvrsava

    // pri cemu ce outleti da budu zapravo srtanice profila
    return (
        <>
            <DashboardMenu />
            <Outlet />
        </>
    )
}
