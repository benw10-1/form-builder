import React, { useState, useEffect } from "react";
import { queries, mutations } from "../../gqlJS"
import Auth from "../../utils/auth"
import "./Dashboard.css"

function Dashboard() {
    let [loading, setLoading] = useState(true)

    // only run once
    // second argument is the array in which each element is checked. If there are changes to the array, it runs the effect
    useEffect(async () => {
        // returns null if not logged in and user otherwise
        let loggedIn = Auth.loggedIn()
        // redirect if not logged in (pog)
        if (!loggedIn) window.location.replace(window.location.origin)
        // set loading state and re render
        setLoading(false)
    }, [1])

    // main render logic
    const pageRender = () => {
        const body = <div>Dashboard</div>

        if (loading) return <div>Loading...</div>
        return body
    }

    return (
        <main className="dashboard">
            {pageRender()}
        </main>
    );
}

export default Dashboard;
