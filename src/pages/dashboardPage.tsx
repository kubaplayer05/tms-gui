import Box from "@mui/material/Box";
import {useQuery} from "@tanstack/react-query";
import {getQueueStats} from "../lib/api/queue/getQueueStats.ts";
import useApiAuthContext from "../hooks/useApiAuthContext.ts";
import {Stack} from "@mui/material";
import ConnectionCard from "../components/dashboard/connectionCard.tsx";
import Paper from "@mui/material/Paper";
import {useState} from "react";

export default function DashboardPage() {

    const DUMMY_SOURCES = [{
        id: 1,
        label: "Elasticsearch",
        isConnected: true,
    }, {
        id: 2,
        label: "Queue",
        isConnected: false,
    }]

    const {apiPrefix, accessToken} = useApiAuthContext()
    const [selectedSource, setSelectedSource] = useState(DUMMY_SOURCES[0].id)

    const {data, status, error} = useQuery({
        queryKey: ["queueStats"], queryFn: () => {
            return getQueueStats({prefixUrl: apiPrefix, accessToken})
        }
    })

    if (status == "error") {
        console.log(error)
    }

    if (status == "success") {
        console.log(data?.data)
    }

    return (
        <Box sx={{m: 0, p: 2, width: "100%", height: "100%"}}>
            <Paper square={false}
                   sx={{maxWidth: "350px", height: "100%", padding: "1rem"}}>
                <Stack spacing={2}>
                    {DUMMY_SOURCES.map((source) => {
                        const isSelected = source.id == selectedSource

                        return <ConnectionCard key={source.id} label={source.label} isConnected={source.isConnected}
                                               isSelected={isSelected} onClick={() => {
                            setSelectedSource(source.id)
                        }}/>
                    })}
                </Stack>
            </Paper>
        </Box>
    )
}
