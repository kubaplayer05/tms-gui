import Box from "@mui/material/Box";
import {Stack} from "@mui/material";
import SourceConnectionCard from "../components/dashboard/sourceConnectionCard.tsx";
import Paper from "@mui/material/Paper";
import {useState} from "react";
import ConnectionPanel from "../components/dashboard/connectionPanel.tsx";

export default function DashboardPage() {

    const [sources,] = useState([
        {id: 1, label: "Elasticsearch", isConnected: false}, {id: 2, label: "Queue", isConnected: false}
    ])

    return (
        <Box sx={{m: 0, p: 2, width: "100%", height: "100%", display: "flex", gap: "2rem"}}>
            <Paper square={false} sx={{minWidth: "360px", height: "100%", padding: "1rem"}}>
                <Stack spacing={2}>
                    {sources.map((source) => {
                        return <SourceConnectionCard key={source.id} label={source.label}
                                                     isConnected={source.isConnected}
                                                     onClick={() => {
                                                     }}/>
                    })}
                </Stack>
            </Paper>
            <ConnectionPanel/>
        </Box>
    )
}
