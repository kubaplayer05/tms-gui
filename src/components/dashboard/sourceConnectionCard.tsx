import {Paper, Box, Typography, Button, Stack} from "@mui/material"
import {Circle} from "@mui/icons-material";
import {useTheme} from "@mui/material/styles";

interface IConnectionCard {
    label: string,
    isConnected: boolean,
    onClick: () => void,
}

export default function SourceConnectionCard({label, isConnected, onClick}: IConnectionCard) {

    const {palette} = useTheme()
    const dominatingColor = isConnected ? "success" : "error"

    const bgColor = palette.background.default
    const contrastColor = palette.text.primary

    return (
        <Paper
            onClick={onClick}
            sx={{
                bgcolor: bgColor,
                color: contrastColor,
                padding: "1rem 1.4rem",
            }}>
            <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"} spacing={1}>
                <Typography variant={"subtitle1"}>{label}</Typography>
                <Box sx={{display: "flex", gap: "0.8rem", alignItems: "center", marginLeft: "100%"}}>
                    <Circle color={dominatingColor}/>
                    <Typography>{isConnected ? "online" : "offline"}</Typography>
                    <Button variant={"text"} size={"small"}>Test</Button>
                </Box>
            </Stack>
        </Paper>
    )
}
