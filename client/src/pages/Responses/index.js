import React, { useState, useEffect } from 'react';
import { DataGrid } from "@mui/x-data-grid"
import { queries, dayTime, Auth } from '../../utils'
import { useParams } from 'react-router-dom';
import {
    Box,
    Skeleton,
    Paper,
    Container,
    Typography,
    Divider,
    Button
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
        r.responses.forEach(p => {
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

function ResponseView({ }) {
    const [data, setData] = useState({
        columns: [],
        rows: []
    })
    const [loading, setLoading] = useState(true)
    const [pageSize, setPageSize] = useState(10)
    const [form, setForm] = useState({})

    const { id } = useParams()

    useEffect(() => {
        queries.getFormByID(id).then(form => {
            setForm(form)
            queries.getResponsesByForm(id).then(async res => {
                const pieces = (await queries.getPiecesByID(id))?.result ?? []
                setData(parseResponseData(res.result, pieces))
                setLoading(false)
            })
        })
        // const data = parseResponseData(responses, pieces)
        // setData(data)
        // setLoading(false)
    }, [])

    const contsx = {
        width: "800px",
        height: "calc(100% - 100px)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "60px",
        flexShrink: 1,
    }

    const formContainersx = {
        width: "100%",
        height: "100%",
        // overflow: "auto",
        marginTop: "36px",
        // padding: "0 0 60px 0"
    }

    const titlesx = {
        width: "100%",
        marginBottom: "24px",
    }

    const sidesx = {
        width: "300px",
        padding: "30px",
        flexShrink: 2,
    }
    const sidebutssx = {
        width: "200px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "0 30px",
    }
    const buttonsx = {
        width: "174px",
        padding: "8px 0"
    }

    return (
        <Container disableGutters={true} maxWidth={false} sx={{ display: "flex", justifyContent: "center", paddingTop: "80px"}}>
            <Box sx={sidesx}>
                <Typography variant="h4" sx={{ fontSize: "20px", fontWeight: 500, marginBottom: "34px" }}>
                    {(() => {return dayTime() + " " + (Auth.getProfile()?.name ?? "User")})()}
                </Typography>
                <Typography variant="h4" sx={{ fontSize: "16px", fontWeight: 400 }}>
                    {"Form: " + (form.name ?? "Form")}
                </Typography>
            </Box>
            <Paper sx={contsx}>
                <Box sx={titlesx}>
                    <Typography variant="h4" marginBottom={"6px"} >
                        {form.name ?? "Form"}
                    </Typography>
                    {true ? <Typography variant="body1">{form.description ?? "Some description"}</Typography> : null}
                </Box>
                <Divider flexItem={true} />
                <Box sx={formContainersx}>
                    {loading ?
                        <Skeleton sx={formContainersx} /> :
                        <DataGrid
                            columns={data.columns}
                            rows={data.rows}
                            // autoHeight={true}
                            pageSize={pageSize}
                            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                            rowsPerPageOptions={[10, 20, 50, 100]}
                            disableColumnSelector={true}
                            disableSelectionOnClick
                            disableColumnMenu
                            sx={{
                                '& .MuiDataGrid-columnSeparator': {
                                    display: "none"
                                },
                                '& .MuiDataGrid-footerContainer': {
                                    border: "none"
                                },
                                "& .MuiDataGrid-columnHeaders": {
                                    // position: "sticky"
                                },
                                '&': {
                                    border: "none"
                                },
                            }}
                        />}
                </Box>
            </Paper>
            <Box sx={sidebutssx}>
                <Button variant="contained" color="primary" onClick={() => {
                    window.location.assign(`/editform/${id}`)
                }} sx={{ ...buttonsx, margin: "100px 0 24px 0"}}>Edit Form</Button>
                <Divider flexItem={true}  />
                <Button variant="outlined" color="secondary" disabled={!!form.endpoint} onClick={() => {
                    if (form.endpoint) {
                        window.location.assign("/form/" + form.endpoint)
                    }
                }} sx={{ ...buttonsx, margin: "24px 0 12px 0"}}>Preview</Button>
                <Button variant="outlined" color="primary" onClick={() => {}} sx={{ ...buttonsx, margin: "0 0 12px 0"}}>Export Responses</Button>
            </Box>
        </Container>
    )
}

export default ResponseView