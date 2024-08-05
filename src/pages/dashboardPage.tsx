import Box from "@mui/material/Box";
import {useEffect, useState} from "react";
import StatsPanel from "../components/dashboard/statsPanel.tsx";
import useConnection from "../lib/api/connection/useConnection.ts";
import {getQueueStats} from "../lib/api/queue/getQueueStats.ts";
import {useQuery} from "@tanstack/react-query";
import useApiAuthContext from "../hooks/useApiAuthContext.ts";
import SourcesPanel from "../components/dashboard/sourcesPanel.tsx";
import {SelectChangeEvent} from "@mui/material";

export interface ISources {
    id: number,
    label: string,
    connectionStatus: "success" | "pending" | "idle" | "error",
    testConnection: () => void
}

export default function DashboardPage() {

    const {apiPrefix, accessToken} = useApiAuthContext()
    const [refetchInterval, setRefetchInterval] = useState(10000)
    const refreshData = {
        time: refetchInterval,
        onChange: (e: SelectChangeEvent<number>) => {
            setRefetchInterval(e.target.value as number)
        }
    }


    const {status: queueStatus, testConnection: testQueue} = useConnection({mutationFn: getQueueStats})
    const {data: statsPanelResponse, status: statsPanelStatus, fetchStatus: statsPanelFetchStatus} = useQuery({
        queryKey: ["queueStats"], queryFn: () => {
            console.log("fetching queue stats!")
            return getQueueStats({prefixUrl: apiPrefix, accessToken})
        }, refetchInterval: refetchInterval
    })

    const [sources, setSources] = useState<ISources[]>([
        {id: 1, label: "Elasticsearch", connectionStatus: queueStatus, testConnection: testQueue}, {
            id: 2,
            label: "Queue",
            connectionStatus: queueStatus,
            testConnection: testQueue
        }
    ])

    useEffect(() => {
        setSources(prevState => {
            const updatedSources: ISources[] = []
            for (const source of prevState) {
                source.connectionStatus = queueStatus
                updatedSources.push(source)
            }

            return updatedSources
        })
    }, [queueStatus])

    return (
        <Box sx={{m: 0, p: 2, width: "100%", height: "100%", display: "flex", gap: "2rem"}}>
            <SourcesPanel sources={sources}/>
            <StatsPanel status={statsPanelStatus} data={statsPanelResponse} maxRate={10000} refreshData={refreshData}
                        fetchStatus={statsPanelFetchStatus}/>
        </Box>
    )
}
