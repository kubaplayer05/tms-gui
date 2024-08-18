import {ReactNode} from "react";
import {CircularProgress, Paper} from "@mui/material";
import Typography from "@mui/material/Typography";

interface IStatusWrapper {
    status: "error" | "success" | "pending",
    children: ReactNode
}

export default function StatusWrapper({status, children}: IStatusWrapper) {

    if (status === "pending") {
        return (
            <Paper sx={{width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center"}}
                   square={false}>
                <CircularProgress/>
            </Paper>
        )
    }

    if (status === "error") {
        return <Paper sx={{width: "100%", height: "100%"}} square={false}>
            <Typography variant={"h2"}>Could not get data.</Typography>
        </Paper>
    }

    return children
}
