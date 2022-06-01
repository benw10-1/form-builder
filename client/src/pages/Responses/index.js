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
]

function parseResponseData(data) {

}

function ResponseView({ id }) {
    const [data, setData] = useState({
        columns: [],
        rows: []
    })
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        queries.getResponsesByForm(id).then(res => {
            setData(parseResponseData(res.result))
            setLoading(false)
        })
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