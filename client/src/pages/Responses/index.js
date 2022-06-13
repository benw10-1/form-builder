import React, { useState, useEffect } from 'react';
import { queries, dayTime, Auth } from '../../utils'
import { useParams } from 'react-router-dom';
import Box from "@mui/material/Box"
import Skeleton from "@mui/material/Skeleton"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import Popover from "@mui/material/Popover"
import { DataGrid } from "@mui/x-data-grid/DataGrid"
import { PaperCenter } from '../Layouts';

function parseResponseData(responses, pieces) {
    let columns = [{
        field: "createdAt",
        headerName: "Submitted At",
        editable: true,
        sortable: true,
        valueFormatter: (params) => {
            return new Date(Number(params.value)).toLocaleString()
        },
        width: 140
    }].concat(pieces.filter(p => p._type === "question").map(p => {
        return {
            field: p._id,
            headerName: p.props.reduce((prev, curr) => {
                if (curr.key === "qtitle") return curr.value
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

    const isMob = window.innerWidth < 900

    const formContainersx = {
        flex: 1,
        // marginTop: "36px",
        display: "flex",
        justifyContent: "center",
    }

    const titlesx = {
        width: "100%",
        paddingBottom: "24px",
    }

    const buttonsx = {
        width: "174px",
        padding: "8px 0"
    }

    const handleCellClick = (params, event) => {
        if (params.formattedValue === '') return
        select(event, params.formattedValue)
    }

    const paperheader = (
        <Box sx={titlesx}>
            <Typography variant="h4" marginBottom={"6px"} >
                {form.title ?? "Form"}
            </Typography>
            {true ? <Typography variant="body1" >{form.description ?? "Some description"}</Typography> : null}
        </Box>
    )

    const paperbody = (
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
                        "& .MuiDataGrid-columnHeader": {
                            "&:focus": {
                                outline: "none",
                                border: "none"
                            },
                            border: "none"
                        },
                        '&.MuiDataGrid-root .MuiDataGrid-cell:focus': {
                            outline: 'none',
                        },
                        '&': {
                            border: "none",
                            height: "unset",
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
    )

    const dashbut = (
        <Button variant="contained" color="primary" onClick={() => {
            window.location.assign(`/dashboard`)
        }} sx={{ ...buttonsx, margin: 0 }}>Back to Dashboard</Button>
    )

    const left = (
        <React.Fragment>
            <Typography variant="h4" sx={{ fontSize: "20px", fontWeight: 500, marginBottom: { md: "28px", xs: "0"} }}>
                {(() => { return dayTime() + " " + (Auth.getProfile()?.name ?? "User") })()}
            </Typography>
            {isMob ? 
            null :
            <Typography variant="h4" sx={{ fontSize: "16px", fontWeight: 400 }}>
                {"Viewing: " + (form.title ?? "Form")}
            </Typography>}
        </React.Fragment>
    )

    return (
        <React.Fragment>
            <PaperCenter
                paper={[paperheader, paperbody]}
                left={left}
                buttons={dashbut}
            />
        </React.Fragment>
    )
}

export default ResponseView