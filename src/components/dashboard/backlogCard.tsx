import Paper from "@mui/material/Paper";
import {ISubscription} from "../../types/api/queue";
import {Stack} from "@mui/material";
import Typography from "@mui/material/Typography";
import {abbreviateNumber} from "../../lib/converters.ts";
import {useTheme} from "@mui/material/styles";

interface IBacklogCard {
    subscriptions: {
        [key: string]: ISubscription
    }
}

export default function BacklogCard({subscriptions}: IBacklogCard) {

    const {palette} = useTheme()
    const bgColor = palette.background.default
    let msgCount: string | number = 0

    for (const key in subscriptions) {
        msgCount += subscriptions[key].msgBacklog
    }

    msgCount = abbreviateNumber(msgCount)

    return (
        <Paper sx={{bgcolor: bgColor, height: "100%", padding: "0.6rem 0"}}>
            <Typography variant={"subtitle1"} align={"center"}>Backlog</Typography>
            <Stack alignItems={"center"} justifyContent={"center"} sx={{height: "100%"}}>
                <Typography sx={{paddingBottom: "2.4rem"}} variant={"h3"}>{msgCount}</Typography>
            </Stack>
        </Paper>
    )
}
