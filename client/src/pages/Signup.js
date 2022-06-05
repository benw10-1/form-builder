import React, { useState, useEffect } from "react";
import { queries, mutations, Auth } from "../utils"

function Signup() {
    // regex matching the correct password
    const allowed = {
        login: /[\w\d!@#$%&.-]+/,
        password: /[^\s[\]'"\\./()`~<>;:-]+/
    }

    let [loading, setLoading] = useState(true)
    // states that set the values for the inputs
    let [nameVal, setNameVal] = useState("")
    let [emailVal, setEmailVal] = useState("")
    let [passVal, setPassVal] = useState("")

    // same logic as Dashboard.js
    useEffect(() => {
        async function req() {
            let loggedIn = Auth.loggedIn()
            if (loggedIn) window.location.replace(window.location.origin + "/dashboard")
            else setLoading(false)
        }
        req()
    }, [])

    // on login edit
    const handleNameChange = (event) => {
        // match the desired restricted output
        let match = event.target.value.match(allowed.login)
        // if no match, returns null
        // set login value state causing rerender
        setNameVal(match ? match[0] : "")
    }

    const handleEmailChange = (event) => {
        // match the desired restricted output
        let match = event.target.value.match(allowed.login)
        // if no match, returns null
        // set login value state causing rerender
        setEmailVal(match ? match[0] : "")
    }

    // on password edit
    const handlePassChange = (event) => {
        // match the desired restricted output
        let match = event.target.value.match(allowed.password)
        // if no match, returns null
        // set password value state causing rerender
        setPassVal(match ? match[0] : "")
    }

    // ran on form submit
    const handleSubmit = async (event) => {
        event.preventDefault()
        // mutations 
        let result = await mutations.signup(nameVal, emailVal, passVal)
        // checks for error status (see client/src/gqlJS and server/schemas/resolvers)
        // TODO: Change alert
        if (result.__status__ === "error") alert("Bad signup")
        else window.location.assign(window.location.origin + "/dashboard")
    }

    // main render logic
    const pageRender = () => {
        const body = (
            <form className="signup-areas" onSubmit={handleSubmit}>
                <input className="signup-inp" type="text" value={nameVal} onChange={handleNameChange} placeholder="Username" />
                <input className="signup-inp" type="text" value={emailVal} onChange={handleEmailChange} placeholder="Email" />
                <input className="signup-inp" type="text" value={passVal} onChange={handlePassChange} placeholder="Password" />
                <input type="submit" value="Signup" />
            </form>
        );

        if (loading) return <div>Loading...</div>
        return body
    }

    return (
        <main className="signup-page">
            {pageRender()}
        </main>
    );
}

export default Signup;
