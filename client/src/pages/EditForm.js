// where users edit their owned forms (for now just renders form from db)
import React, { useState, useEffect } from "react";
import { queries, mutations, Auth, parseProps } from "../utils"
import { useParams } from "react-router-dom"

function HeaderEl({ title, subtitle }) {
    return (
        <div className="form-header">
            <div className="form-title">{title}</div>
            <div className="form-subtitle">{subtitle}</div>
        </div>
    )
}

function InputEl({ id, props }) {
    const { qtext, qsubtext, qtype, qoptions } = props
    if (qtype === "multiple") {
        let renderedOpt = []
        qoptions.forEach(x => {
            let element = (
                <option value={x}>{x}</option>
            )
            renderedOpt.push(element)
        })
        return (   
            <div className="question">
                <div className="question-header">
                    <div className="question-text">{qtext}</div>
                    {(() => {
                        if (qsubtext) return <div className="question-text">{qsubtext}</div>
                    })()}
                </div>
                <select id={id} name="Question">
                    {renderedOpt}
                </select>
            </div>
        )
    }
    if (qtype === "text") {
        // something here
    }
}

function Form() {
    let { id } = useParams()

    let [loading, setLoading] = useState(true)
    let [pieces, setPieces] = useState([])

    // same logic as Dashboard.js
    useEffect(() => {
        async function req() {
            let loggedIn = Auth.loggedIn()
            if (!loggedIn) {
                window.location.replace(window.location.origin + "/login")
                return
            }
            let reqPieces = (await queries.getPiecesByID(id)).result ?? []
            if (!reqPieces) {
                window.location.replace(window.location.origin + "/dashboard")
            }
            else {
                setPieces(reqPieces)
                setLoading(false)
            }
        }
        req()
    }, [])

    // main render logic
    const pageRender = () => {
        if (loading) return <div>Loading...</div>

        let renderedPieces = []
        pieces.forEach(x => {
            const { _id, _type, props } = x
            const parsed = parseProps(props)
            console.log(parsed)

            let element
            if (_type === "header") {
                element = <HeaderEl title={parsed.title} subtitle={parsed.subtitle}></HeaderEl>
            }
            if (_type === "question") {
                element = <InputEl qid={_id} props={parsed}></InputEl>
            }

            renderedPieces.push(element)
        })
        const body = (
            <div>
                {renderedPieces}
            </div>
        )

        return body
    }

    return (
        <main className="form-page">
            {pageRender()}
        </main>
    );
}

export default Form;
