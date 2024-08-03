import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import ConnectionGauge from "./connectionGauge.tsx";
import {useQuery} from "@tanstack/react-query";
import {getQueueStats} from "../../lib/api/queue/getQueueStats.ts";
import useApiAuthContext from "../../hooks/useApiAuthContext.ts";
import {CircularProgress} from "@mui/material";
import Typography from "@mui/material/Typography";
import BacklogCard from "./backlogCard.tsx";
import DashboardNavbar from "./dashboardNavbar.tsx";
import Divider from "@mui/material/Divider";

export default function ConnectionPanel() {
    const {apiPrefix, accessToken} = useApiAuthContext()
    const {data, status} = useQuery({
        queryKey: ["queueStats"], queryFn: () => {
            return getQueueStats({prefixUrl: apiPrefix, accessToken})
        }
    })

    if (status == "pending") {
        return (
            <Paper sx={{width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center"}}
                   square={false}>
                <CircularProgress/>
            </Paper>
        )
    }

    if (status == "error") {
        return <Paper sx={{width: "100%", height: "100%"}} square={false}>
            <Typography variant={"h2"}>Could not get data.</Typography>
        </Paper>
    }

    const dashboardData = data?.data

    return (
        <Paper sx={{width: "100%", height: "100%"}} square={false}>
            <DashboardNavbar/>
            <Divider/>
            <Grid container spacing={2} sx={{padding: "2rem"}}>
                <Grid item xs={3}>
                    <ConnectionGauge rate={dashboardData?.msgRateIn} maxRate={10000} label={"Msg Rate In"}
                                     throughput={dashboardData?.msgThroughputIn}/>
                </Grid>
                <Grid item xs={6}>
                    <BacklogCard subscriptions={dashboardData?.subscriptions}/>
                </Grid>
                <Grid item xs={3}>
                    <ConnectionGauge rate={dashboardData?.msgRateOut} maxRate={10000} label={"Msg Rate Out"}
                                     throughput={dashboardData?.msgThroughputOut}/>
                </Grid>
            </Grid>
        </Paper>
    )
}
