import React, { useState, useEffect } from "react";
import { queries, mutations, Auth } from "../utils"
// import "./Dashboard.css"

function AllForms({ forms=[] }) {
    // main render logic
    const render = () => {
        let renderedForms = []

        forms.forEach(x => {
            const { _id, title } = x
            const onclick = (event) => {
                window.location.assign(window.location.origin + "/editForm/" + _id)
            }
            renderedForms.push(<button onClick={onclick}>{title}</button>)
        })

        const addForm = async () => {
            // for now default values, but can pass stuff from in
            let newForm = (await mutations.createForm("Form example", "Some description")).result
            if (!newForm) {
                console.log("Something went wrong")
                return
            }

            window.location.assign(window.location.origin + "/editForm/" + newForm._id)
        }

        renderedForms.push((
            <button onClick={addForm}>New form</button>
        ))

        return (
            <div className="forms-container">
                {renderedForms}
            </div>
        )
    }

    return render()
}

function Dashboard() {
    let [loading, setLoading] = useState(true)
    let [forms, setForms] = useState([])

    // only run once
    // second argument is the array in which each element is checked. If there are changes to the array, it runs the effect
    useEffect(async () => {
        let loggedIn = Auth.loggedIn()
        if (!loggedIn) {
            window.location.replace(window.location.origin + "/login")
            return
        }
        let myForms = (await queries.getMyForms())?.result ?? []
        setForms(myForms)
        setLoading(false)
    }, [1])

    // main render logic
    const pageRender = () => {
        if (loading) return <div>Loading...</div>
        const body = (
            <div>
                <div>Dashboard</div>
                <AllForms forms={forms} />
                <button onClick={Auth.logout}>Logout</button>
            </div>
        )
        return body
    }

    return (
        <main className="dashboard">
            {pageRender()}
        </main>
    );
}

export default Dashboard;
