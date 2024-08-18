import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import ConnectionGauge from "../connectionGauge.tsx";
import {SelectChangeEvent} from "@mui/material";
import Typography from "@mui/material/Typography";
import BacklogCard from "./backlogCard.tsx";
import DashboardNavbar from "../dashboardNavbar.tsx";
import Divider from "@mui/material/Divider";
import SubscriptionsList from "./subscriptionsList.tsx";
import Box from "@mui/material/Box";
import {useQuery} from "@tanstack/react-query";
import {getQueueStats} from "../../../lib/api/queue/getQueueStats.ts";
import useApiAuthContext from "../../../hooks/useApiAuthContext.ts";
import useRefreshTime from "../../../hooks/useRefreshTime.ts";
import StatusWrapper from "../statusWrapper.tsx";

export default function QueueStatsPanel() {

    const {apiPrefix, accessToken} = useApiAuthContext()
    const {getRefreshTime, setRefreshTime} = useRefreshTime()

    const maxRate = 10_000
    const refreshData = {
        time: getRefreshTime(),
        onChange: (e: SelectChangeEvent<number>) => {
            setRefreshTime(e.target.value)
        },
    }

    const {
        data,
        status,
        fetchStatus
    } = useQuery({
        queryKey: ["queueStats"], queryFn: () => {
            return getQueueStats({prefixUrl: apiPrefix, accessToken})
        }, refetchInterval: refreshData.time
    })

    if (!data) {
        return <Paper sx={{width: "100%", height: "100%"}} square={false}>
            <Typography variant={"h2"}>Could not get data.</Typography>
        </Paper>
    }

    const statsData = data?.data

    return (
        <StatusWrapper status={status}>
            <Box>
                <DashboardNavbar refreshTime={refreshData.time} onRefreshTimeChange={refreshData.onChange}
                                 fetchStatus={fetchStatus}/>
                <Divider/>
            </Box>
            <Grid container spacing={2}>
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
            <SubscriptionsList subscriptions={statsData.subscriptions}/>
        </StatusWrapper>
    )
}
