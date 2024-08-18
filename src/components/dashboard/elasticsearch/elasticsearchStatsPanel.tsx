import {CircularProgress, Paper, SelectChangeEvent} from "@mui/material";
import DashboardNavbar from "../dashboardNavbar.tsx";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import ElasticsearchClusterList from "./elasticsearchClusterList.tsx";
import {useQuery} from "@tanstack/react-query";
import {getElasticsearchInfo} from "../../../lib/api/connection/getElasticsearchInfo.ts";
import useApiAuthContext from "../../../hooks/useApiAuthContext.ts";
import useRefreshTime from "../../../hooks/useRefreshTime.ts";
import StatusWrapper from "../statusWrapper.tsx";

export default function ElasticsearchStatsPanel() {

    const {apiPrefix, accessToken} = useApiAuthContext()
    const {getRefreshTime, setRefreshTime} = useRefreshTime()

    const refreshData = {
        time: getRefreshTime(),
        onChange: (e: SelectChangeEvent<number>) => {
            setRefreshTime(e.target.value)
        }
    }

    const {
        data,
        status,
        fetchStatus
    } = useQuery({
        queryKey: ["elasticsearchStats"], queryFn: () => {
            return getElasticsearchInfo({prefixUrl: apiPrefix, accessToken})
        }, refetchInterval: refreshData.time
    })

    if (!data) {
        return <Paper
            sx={{width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center"}}
            square={false}>
            <CircularProgress/>
        </Paper>
    }

    return (
        <StatusWrapper status={status}>
            <Box>
                <DashboardNavbar refreshTime={refreshData.time} onRefreshTimeChange={refreshData.onChange}
                                 fetchStatus={fetchStatus}/>
                <Divider/>
            </Box>
            <ElasticsearchClusterList data={data.data}/>
        </StatusWrapper>
    )
}
