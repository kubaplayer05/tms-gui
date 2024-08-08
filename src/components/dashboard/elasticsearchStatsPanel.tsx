import {IRefreshData, IStatsPanel} from "../../types/ui/statsPanel";
import {AxiosResponse} from "axios";
import {IValidationError} from "../../types/api/api";
import {CircularProgress, ListSubheader, Paper} from "@mui/material";
import DashboardNavbar from "./dashboardNavbar.tsx";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import DashboardPaperCard from "../ui/dashboardPaperCard.tsx";

interface IElasticsearchStatsPanel extends IStatsPanel<AxiosResponse<object, IValidationError> | undefined> {
    refreshData: IRefreshData
}

export default function ElasticsearchStatsPanel({data, status, fetchStatus, refreshData}: IElasticsearchStatsPanel) {

    const MOCK_DATA = {
        "cluster_name": "cluster",
        "status": "green",
        "timed_out": false,
        "number_of_nodes": 4,
        "number_of_data_nodes": 3,
        "active_primary_shards": 346,
        "active_shards": 693,
        "relocating_shards": 0,
        "initializing_shards": 0,
        "unassigned_shards": 0,
        "delayed_unassigned_shards": 0,
        "number_of_pending_tasks": 0,
        "number_of_in_flight_fetch": 0,
        "task_max_waiting_in_queue_millis": 0,
        "active_shards_percent_as_number": 100
    }

    if (status == "pending") {
        return (
            <Paper sx={{width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center"}}
                   square={false}>
                <CircularProgress/>
            </Paper>
        )
    }

    if (status == "error" || !data) {
        return <Paper sx={{width: "100%", height: "100%"}} square={false}>
            <Typography variant={"h2"}>Could not get data.</Typography>
        </Paper>
    }

    const listItems = []

    for (const key in MOCK_DATA) {
        const item = <>
            <Divider/>
            <ListItem>
                <ListItemText primary={key.replace(/_/gi, " ")}/>
                <ListItemText sx={{textAlign: "right"}} primary={MOCK_DATA[key].toString()}/>
            </ListItem>
        </>

        listItems.push(item)
    }

    return (
        <Paper sx={{
            width: "100%",
            height: "100%",
            padding: "0 2rem 1rem 2rem",
            display: "flex",
            flexDirection: "column",
            gap: "2rem"
        }} square={false}>
            <Box>
                <DashboardNavbar refreshTime={refreshData.time} onRefreshTimeChange={refreshData.onChange}
                                 fetchStatus={fetchStatus}/>
                <Divider/>
            </Box>
            <DashboardPaperCard sx={{
                width: "100%",
                height: "100%",
                maxHeight: "600px",
                padding: "1rem 2rem",
                overflow: "scroll"
            }}>
                <List subheader={
                    <ListSubheader disableSticky={true}>Elasticsearch Info</ListSubheader>
                }>
                    {listItems.map(item => item)}
                </List>
            </DashboardPaperCard>

        </Paper>
    )
}
