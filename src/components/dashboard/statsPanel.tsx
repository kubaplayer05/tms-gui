import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import ConnectionGauge from "./connectionGauge.tsx";
import {CircularProgress, SelectChangeEvent} from "@mui/material";
import Typography from "@mui/material/Typography";
import BacklogCard from "./backlogCard.tsx";
import DashboardNavbar from "./dashboardNavbar.tsx";
import Divider from "@mui/material/Divider";
import {IQueueStats} from "../../types/api/queue";
import {AxiosResponse} from "axios";
import {IValidationError} from "../../types/api/api";

interface IStatsPanel {
    status: "success" | "pending" | "error",
    fetchStatus: "fetching" | "idle" | "paused"
    data: AxiosResponse<IQueueStats, IValidationError> | undefined,
    maxRate: number,
    refreshData: {
        time: number,
        onChange: (e: SelectChangeEvent<number>) => void
    }
}

export default function StatsPanel({data, status, maxRate, refreshData, fetchStatus}: IStatsPanel) {

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

    const statsData = data.data

    return (
        <Paper sx={{width: "100%", height: "100%"}} square={false}>
            <DashboardNavbar refreshTime={refreshData.time} onRefreshTimeChange={refreshData.onChange}
                             fetchStatus={fetchStatus}/>
            <Divider/>
            <Grid container spacing={2} sx={{padding: "2rem"}}>
                <Grid item xs={3}>
                    <ConnectionGauge rate={statsData.msgRateIn} maxRate={maxRate} label={"Msg Rate In"}
                                     throughput={statsData.msgThroughputIn}/>
                </Grid>
                <Grid item xs={6}>
                    <BacklogCard subscriptions={statsData.subscriptions}/>
                </Grid>
                <Grid item xs={3}>
                    <ConnectionGauge rate={statsData.msgRateOut} maxRate={maxRate} label={"Msg Rate Out"}
                                     throughput={statsData.msgThroughputOut}/>
                </Grid>
            </Grid>
        </Paper>
    )
}
