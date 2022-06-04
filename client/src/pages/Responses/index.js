import React, { useState, useEffect } from 'react';
import { DataGrid } from "@mui/x-data-grid"
import { queries } from '../../utils'
import {
    Box,
    Skeleton
} from "@mui/material"

const pieces = [
    {
        _id: "_somepieceid",
        props: [
            {
                key: "qtext",
                value: "question1"
            }
        ]
    },
    {
        _id: "_somepieceid1",
        props: [
            {
                key: "qtext",
                value: "question2"
            }
        ]
    },
    {
        _id: "_somepieceid2",
        props: [
            {
                key: "qtext",
                value: "question3"
            }
        ]
    },
    {
        _id: "_somepieceid3",
        props: [
            {
                key: "qtext",
                value: "question4"
            }
        ]
    },
    {
        _id: "_somepieceid4",
        props: [
            {
                key: "qtext",
                value: "question5"
            }
        ]
    },
]

const responses = [
    {
        createdAt: 1654065883136,
        response: [
            {
                key: "_somepieceid",
                value: String(Math.random() * 200)
            },
            {
                key: "_somepieceid1",
                value: String(Math.random() * 200)
            },
            {
                key: "_somepieceid2",
                value: String(Math.random() * 200)
            },
            {
                key: "_somepieceid3",
                value: String(Math.random() * 200)
            },
            {
                key: "_somepieceid4",
                value: String(Math.random() * 200)
            },
        ],
    },
    {
        createdAt: 1654065883137,
        response: [
            {
                key: "_somepieceid",
                value: String(Math.random() * 200)
            },
            {
                key: "_somepieceid1",
                value: String(Math.random() * 200)
            },
            {
                key: "_somepieceid2",
                value: String(Math.random() * 200)
            },
            {
                key: "_somepieceid3",
                value: String(Math.random() * 200)
            },
            {
                key: "_somepieceid4",
                value: String(Math.random() * 200)
            },
        ],
    },
    {
        createdAt: 1654065883138,
        response: [
            {
                key: "_somepieceid",
                value: String(Math.random() * 200)
            },
            {
                key: "_somepieceid1",
                value: String(Math.random() * 200)
            },
            {
                key: "_somepieceid2",
                value: String(Math.random() * 200)
            },
            {
                key: "_somepieceid3",
                value: String(Math.random() * 200)
            },
            {
                key: "_somepieceid4",
                value: String(Math.random() * 200)
            },
        ],
    },
    {
        createdAt: 1654065883139,
        response: [
            {
                key: "_somepieceid",
                value: String(Math.random() * 200)
            },
            {
                key: "_somepieceid1",
                value: String(Math.random() * 200)
            },
            {
                key: "_somepieceid2",
                value: String(Math.random() * 200)
            },
            {
                key: "_somepieceid3",
                value: String(Math.random() * 200)
            },
            {
                key: "_somepieceid4",
                value: String(Math.random() * 200)
            },
        ],
    },
    {
        createdAt: 1654065883139,
        response: [
            {
                key: "_somepieceid",
                value: String(Math.random() * 200)
            },
            {
                key: "_somepieceid1",
                value: String(Math.random() * 200)
            },
            {
                key: "_somepieceid2",
                value: String(Math.random() * 200)
            },
            {
                key: "_somepieceid3",
                value: String(Math.random() * 200)
            },
            {
                key: "_somepieceid4",
                value: String(Math.random() * 200)
            },
        ],
    },
    {
        createdAt: 1654065883139,
        response: [
            {
                key: "_somepieceid",
                value: String(Math.random() * 200)
            },
            {
                key: "_somepieceid1",
                value: String(Math.random() * 200)
            },
            {
                key: "_somepieceid2",
                value: String(Math.random() * 200)
            },
            {
                key: "_somepieceid3",
                value: String(Math.random() * 200)
            },
            {
                key: "_somepieceid4",
                value: String(Math.random() * 200)
            },
        ],
    },
    {
        createdAt: 1654065883139,
        response: [
            {
                key: "_somepieceid",
                value: String(Math.random() * 200)
            },
            {
                key: "_somepieceid1",
                value: String(Math.random() * 200)
            },
            {
                key: "_somepieceid2",
                value: String(Math.random() * 200)
            },
            {
                key: "_somepieceid3",
                value: String(Math.random() * 200)
            },
            {
                key: "_somepieceid4",
                value: String(Math.random() * 200)
            },
        ],
    },
    {
        createdAt: 1654065883139,
        response: [
            {
                key: "_somepieceid",
                value: String(Math.random() * 200)
            },
            {
                key: "_somepieceid1",
                value: String(Math.random() * 200)
            },
            {
                key: "_somepieceid2",
                value: String(Math.random() * 200)
            },
            {
                key: "_somepieceid3",
                value: String(Math.random() * 200)
            },
            {
                key: "_somepieceid4",
                value: String(Math.random() * 200)
            },
        ],
    },
    {
        createdAt: 1654065883139,
        response: [
            {
                key: "_somepieceid",
                value: String(Math.random() * 200)
            },
            {
                key: "_somepieceid1",
                value: String(Math.random() * 200)
            },
            {
                key: "_somepieceid2",
                value: String(Math.random() * 200)
            },
            {
                key: "_somepieceid3",
                value: String(Math.random() * 200)
            },
            {
                key: "_somepieceid4",
                value: String(Math.random() * 200)
            },
        ],
    },
    {
        createdAt: 1654065883139,
        response: [
            {
                key: "_somepieceid",
                value: String(Math.random() * 200)
            },
            {
                key: "_somepieceid1",
                value: String(Math.random() * 200)
            },
            {
                key: "_somepieceid2",
                value: String(Math.random() * 200)
            },
            {
                key: "_somepieceid3",
                value: String(Math.random() * 200)
            },
            {
                key: "_somepieceid4",
                value: String(Math.random() * 200)
            },
        ],
    },
    {
        createdAt: 1654065883139,
        response: [
            {
                key: "_somepieceid",
                value: String(Math.random() * 200)
            },
            {
                key: "_somepieceid1",
                value: String(Math.random() * 200)
            },
            {
                key: "_somepieceid2",
                value: String(Math.random() * 200)
            },
            {
                key: "_somepieceid3",
                value: String(Math.random() * 200)
            },
            {
                key: "_somepieceid4",
                value: String(Math.random() * 200)
            },
        ],
    },
    {
        createdAt: 1654065883139,
        response: [
            {
                key: "_somepieceid",
                value: String(Math.random() * 200)
            },
            {
                key: "_somepieceid1",
                value: String(Math.random() * 200)
            },
            {
                key: "_somepieceid2",
                value: String(Math.random() * 200)
            },
            {
                key: "_somepieceid3",
                value: String(Math.random() * 200)
            },
            {
                key: "_somepieceid4",
                value: String(Math.random() * 200)
            },
        ],
    },
]

function parseResponseData(responses, pieces) {
    let columns = [{
        field: "createdAt",
        headerName: "Submitted At",
        editable: true,
        sortable: true,
        valueFormatter: (params) => {
            return new Date(Number(params.value)).toLocaleString()
        },
        width: 150
    }].concat(pieces.map(p => {
        return {
            field: p._id,
            headerName: p.props.reduce((prev, curr) => {
                if (curr.key === "qtext") return curr.value
                return prev
            }, ""),
            editable: false,
            sortable: false,
            minWidth: 100,
            flex: 1
        }
    }))
    let rows = responses.map((r, i) => {
        const rs = {}
        r.response.forEach(p => {
            if (rs[p.key]) rs[p.key] += `, ${p.value}`
            else rs[p.key] = p.value
        })
        rs.id = i
        rs.createdAt = r.createdAt
        return rs
    })
    return {
        columns,
        rows
    }
}

function ResponseView({ id }) {
    const [data, setData] = useState({
        columns: [],
        rows: []
    })
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // queries.getResponsesByForm(id).then(async res => {
        //     const pieces = (await queries.getPiecesByID(id))?.result ?? []
        //     setData(await parseResponseData(res.result, pieces))
        //     setLoading(false)
        // })
        const data = parseResponseData(responses, pieces)
        setData(data)
        setLoading(false)
    }, [])

    const contsx = {
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    }

    const formContainersx = {
        width: "100%",
        height: "375px",
    }

    return (
        <Box sx={contsx}>
            <Box sx={formContainersx}>
                {loading ?
                    <Skeleton sx={formContainersx} /> :
                    <DataGrid
                        columns={data.columns}
                        rows={data.rows}
                        rowsPerPageOptions={[5, 10, 20, 50, 100]}
                        // disableSelectionOnClick
                        sx={{
                            '& .MuiDataGrid-columnSeparator': {
                                display: "none"
                            },
                            '& .MuiDataGrid-footerContainer': {
                                border: "none"
                            },
                            '&': {
                                border: "none"
                            },
                        }}
                    />}
            </Box>
        </Box>
    )
}

export default ResponseView