//displays list of all forms the user has created
//each form has option to edit or view responses
//include redundant new form button at bottom why not

import React, { useState, useEffect } from "react";
import { queries, mutations } from "../../gqlJS"
//import "./formView.css"

function AllForms() {
    let [loading, setLoading] = useState(true)

    // only run once
    // second argument is the array in which each element is checked. If there are changes to the array, it runs the effect
    useEffect(async () => {
        let formData = await queries.getForms()
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

export default AllForms;
