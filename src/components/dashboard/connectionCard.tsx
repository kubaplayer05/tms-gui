import {Paper, Box, Typography} from "@mui/material"
import {Circle} from "@mui/icons-material";
import {useTheme} from "@mui/material/styles";

interface IConnectionCard {
    label: string,
    isConnected: boolean,
    isSelected: boolean,
    onClick: () => void,
}

export default function ConnectionCard({label, isConnected, isSelected, onClick}: IConnectionCard) {

    const {palette} = useTheme()
    const dominatingColor = isConnected ? "success" : "error"

    const bgColor = isSelected ? palette.secondary.dark : palette.background.default
    const contrastColor = isSelected ? palette.secondary.contrastText : palette.text.primary

    return (
        <Paper
            onClick={onClick}
            sx={{
                cursor: "pointer",
                display: "flex",
                bgcolor: bgColor,
                color: contrastColor,
                padding: "1rem 1.4rem",
                alignItems: "center",
                justifyContent: "space-between"
            }}>
            <h3>{label}</h3>
            <Box sx={{display: "flex", gap: "0.6rem", alignItems: "center"}}>
                <Circle color={dominatingColor}/>
                <Typography>{isConnected ? "online" : "offline"}</Typography>
            </Box>
        </Paper>
    )
}
