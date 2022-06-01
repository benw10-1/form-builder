import React, { useState, useEffect } from 'react';
import { DataGrid } from "@mui/x-data-grid"
import { queries } from '../../utils'
import {
    Box,
    Skeleton
} from "@mui/material"

const responses = [
    {
        createdAt: 1654065883136,
        response: [
            {
                key: "_somepieceid",
                value: "dis, value"
            },
            {
                key: "_somepieceid1",
                value: "dis, value"
            },
            {
                key: "_somepieceid2",
                value: "dis, value"
            },
            {
                key: "_somepieceid3",
                value: "dis, value"
            },
            {
                key: "_somepieceid4",
                value: "dis, value"
            },
        ],
    },
    {
        createdAt: 1654065883137,
        response: [
            {
                key: "_somepieceid",
                value: "dis, value"
            },
            {
                key: "_somepieceid1",
                value: "dis, value1"
            },
            {
                key: "_somepieceid2",
                value: "dis, value1"
            },
            {
                key: "_somepieceid3",
                value: "dis, value1"
            },
            {
                key: "_somepieceid4",
                value: "dis, value1"
            },
        ],
    },
    {
        createdAt: 1654065883138,
        response: [
            {
                key: "_somepieceid",
                value: "dis, value"
            },
            {
                key: "_somepieceid1",
                value: "dis, value1"
            },
            {
                key: "_somepieceid2",
                value: "dis, value1"
            },
            {
                key: "_somepieceid3",
                value: "dis, value1"
            },
            {
                key: "_somepieceid4",
                value: "dis, value1"
            },
        ],
    },
    {
        createdAt: 1654065883139,
        response: [
            {
                key: "_somepieceid",
                value: "dis, value"
            },
            {
                key: "_somepieceid1",
                value: "dis, value1"
            },
            {
                key: "_somepieceid2",
                value: "dis, value1"
            },
            {
                key: "_somepieceid3",
                value: "dis, value1"
            },
            {
                key: "_somepieceid4",
                value: "dis, value1"
            },
        ],
    },
]

async function parseResponseData(data) {
    let parsed = {}

    data.forEach(res => {
        const { createdAt, response } = res
        let temp = {}
        response.forEach(r => {
            const { key, value } = r
            
        })
    })

    return {
        columns: Object.keys(parsed),
        rows: Object.values(parsed)
    }
}

function ResponseView({ id }) {
    const [data, setData] = useState({
        columns: [],
        rows: []
    })
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // queries.getResponsesByForm(id).then(res => {
        //     setData(await parseResponseData(res.result))
        //     setLoading(false)
        // })
        setData(await parseResponseData(responses))
        setLoading(false)
    }, [])

    const contsx = {
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    }

    return (
        <Box sx={contsx}>
            {loading ? 
            <Skeleton width={530} height={530} /> :
            <DataGrid
                columns={data.columns}
                rows={data.rows}
                pageSize={10}
                rowsPerPageOptions={[5]}
            />}
        </Box>
    )
}

export default ResponseView