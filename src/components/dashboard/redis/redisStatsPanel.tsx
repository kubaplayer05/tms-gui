import useApiAuthContext from "../../../hooks/useApiAuthContext.ts";
import useRefreshTime from "../../../hooks/useRefreshTime.ts";
import {SelectChangeEvent} from "@mui/material";
import {useQuery} from "@tanstack/react-query";
import {getRedisInfo} from "../../../lib/api/connection/getRedisInfo.ts";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import StatusWrapper from "../statusWrapper.tsx";
import DashboardNavbar from "../dashboardNavbar.tsx";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import DashboardList from "../dashboardList.tsx";

export default function RedisStatsPanel() {

    const {apiPrefix, accessToken} = useApiAuthContext()
    const {getRefreshTime, setRefreshTime} = useRefreshTime()

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
        queryKey: ["redisStats"], queryFn: () => {
            return getRedisInfo({prefixUrl: apiPrefix, accessToken})
        }, refetchInterval: refreshData.time
    })

    if (!data) {
        return <Paper sx={{width: "100%", height: "100%"}} square={false}>
            <Typography variant={"h2"}>Could not get data.</Typography>
        </Paper>
    }

    return (
        <StatusWrapper status={status}>
            <Box>
                <DashboardNavbar refreshTime={refreshData.time} onRefreshTimeChange={refreshData.onChange}
                                 fetchStatus={fetchStatus}/>
                <Divider/>
            </Box>
            <DashboardList sx={{
                width: "100%",
                flex: "1 0 0",
                padding: "1rem 2rem",
                overflow: "scroll"
            }} data={data.data} title="Redis info"/>
        </StatusWrapper>
    )
}
