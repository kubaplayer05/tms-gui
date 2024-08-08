import Paper, {PaperProps} from "@mui/material/Paper";
import {useTheme} from "@mui/material/styles";

export default function DashboardPaperCard({sx, children, square = false}: PaperProps) {
    const {palette} = useTheme()

    return (
        <Paper sx={{bgcolor: palette.background.default, ...sx}} square={square}>
            {children}
        </Paper>
    )
}
