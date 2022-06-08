import React, { useState, useEffect } from 'react';
import { queries, dayTime, Auth } from '../../utils'
import { useParams } from 'react-router-dom';
import Box from "@mui/material/Box"
import Skeleton from "@mui/material/Skeleton"
import Paper from "@mui/material/Paper"
import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography"
import Divider from "@mui/material/Divider"
import Button from "@mui/material/Button"
import Popover from "@mui/material/Popover"
import Signout from '../Signout'
import { DataGrid } from "@mui/x-data-grid/DataGrid"

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
            flex: 1,
            valueFormatter: (params) => {
                if (!params.value) return ""
                const split = params.value.split("__sep__")
                return split.length > 1 ? split.join(", ") : params.value
            },
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
    const [anchorEl, setAnchorEl] = useState(null)
    const [selected, _setSelected] = useState(null)

    const select = (event, content) => {
        _setSelected(content)
        setAnchorEl(event.currentTarget)
    }
    const close = () => {
        setAnchorEl(null)
    }

    const { id } = useParams()

    useEffect(() => {
        let loggedIn = Auth.loggedIn()
        if (!loggedIn) {
            window.location.replace(window.location.origin + "/login")
            return
        }
        queries.getFormByID(id).then(form => {
            setForm(form.result)
            queries.getResponsesByForm(id).then(async res => {
                const pieces = (await queries.getPiecesByID(id))?.result ?? []
                setData(parseResponseData(res.result, pieces))
                setLoading(false)
            })
        })
    }, [])

    const contsx = {
        width: "100%",
        maxWidth: {
            xs: "unset",
            md: "800px"
        },
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: {
            xs: "30px 0",
            md: "60px"
        },
        flexShrink: 1,
    }

    const formContainersx = {
        width: {
            xs: "90%",
            md: "100%"
        },
        height: "100%",
        // overflow: "auto",
        marginTop: "36px",
        display: "flex",
        justifyContent: "center",
        // padding: "0 0 60px 0"
    }

    const titlesx = {
        width: "100%",
        marginBottom: "24px",
    }

    const sidesx = {
        width: "350px",
        padding: "30px",
        flexShrink: 2,
    }
    const sidebutssx = {
        width: {
            xs: "100%",
            md: "200px"
        },
        display: "flex",
        flexDirection: "column",
        justifyContent: {
            xs: "center",
            md: "start"
        },
        alignItems: "center",
        padding: "0 30px",
    }
    const buttonsx = {
        width: "174px",
        padding: "8px 0"
    }

    const handleCellClick = (params, event) => {
        if (params.formattedValue === '') return
        select(event, params.formattedValue)
    }
    return (
        <React.Fragment>
            <Signout />
            <Container disableGutters={true} maxWidth={true} sx={{ display: "flex", justifyContent: "center", paddingTop: { xs: 0, md: "80px" }, flexDirection: { xs: "column", md: "row" } }}>
                <Box sx={sidesx}>
                    <Typography variant="h4" sx={{ fontSize: "20px", fontWeight: 500, marginBottom: "34px" }}>
                        {(() => { return dayTime() + " " + (Auth.getProfile()?.name ?? "User") })()}
                    </Typography>
                    <Typography variant="h4" sx={{ fontSize: "16px", fontWeight: 400 }}>
                        {"Viewing: " + (form.title ?? "Form")}
                    </Typography>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "center", width: "100%", flexDirection: { xs: "column", md: "row" }, height: "calc(100% - 100px)" }}>
                    <Paper sx={contsx}>
                        <Box sx={titlesx}>
                            <Typography variant="h4" marginBottom={"6px"} sx={{ textAlign: { xs: "center", md: "start" } }} >
                                {form.title ?? "Form"}
                            </Typography>
                            {true ? <Typography variant="body1" sx={{ textAlign: { xs: "center", md: "start" } }} >{form.description ?? "Some description"}</Typography> : null}
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
                                    onCellClick={handleCellClick}
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
                                        '&.MuiDataGrid-root .MuiDataGrid-cell:focus': {
                                            outline: 'none',
                                        },
                                        '&': {
                                            border: "none"
                                        },
                                    }}
                                />}
                            <Box sx={{ position: "absolute", width: "fit-content", height: "fit-content" }}>
                                <Popover
                                    open={anchorEl !== null}
                                    onClose={close}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'left',
                                    }}
                                    transformOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'left',
                                    }}
                                    anchorEl={anchorEl}
                                >
                                    <Typography padding={".5em 1em"}>{selected}</Typography>
                                </Popover>
                            </Box>
                        </Box>
                    </Paper>
                    <Box sx={sidebutssx}>
                        <Button variant="contained" color="primary" onClick={() => {
                            window.location.assign(`/dashboard`)
                        }} sx={{ ...buttonsx, margin: { md: "100px 0 24px 0", xs: "50px 0 24px 0" } }}>Back to Dashboard</Button>
                    </Box>
                </Box>
            </Container>
        </React.Fragment>
    )
}

export default ResponseView