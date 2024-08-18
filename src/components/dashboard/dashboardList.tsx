import List from "@mui/material/List";
import DashboardPaperCard from "../ui/dashboardPaperCard.tsx";
import {SxProps, Theme} from "@mui/system";
import {ListSubheader} from "@mui/material";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

type Data = {
    [key: string]: string | number | boolean
}

interface IDashboardList {
    data: Data,
    sx?: SxProps<Theme>,
    title: string,
}

export default function DashboardList({data, title, sx}: IDashboardList) {

    const listItems = []

    for (const key in data) {
        const keyData = data[key].toString()

        const item = <>
            <Divider/>
            <ListItem>
                <ListItemText primary={key.replace(/_/gi, " ")}/>
                <ListItemText sx={{textAlign: "right"}} primary={keyData}/>
            </ListItem>
        </>

        listItems.push(item)
    }

    return (
        <DashboardPaperCard sx={sx}>
            <List subheader={
                <ListSubheader disableSticky={true}>{title}</ListSubheader>}>
                {listItems.map(item => item)}
            </List>
        </DashboardPaperCard>
    )
}
