import {Collapse, Paper} from "@mui/material";
import {ISubscription} from "../../types/api/queue";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import {useTheme} from "@mui/material/styles";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import {useState} from "react";
import {ExpandLess, ExpandMore} from "@mui/icons-material";

interface ISubscriptionsList {
    subscriptions: {
        [key: string]: ISubscription
    }
}

export default function SubscriptionsList({subscriptions}: ISubscriptionsList) {

    const {palette} = useTheme()
    const bgColor = palette.background.default

    const [open, setOpen] = useState(false)
    const [subscriptionName, setSubscriptionName] = useState("")

    const listItems = []

    for (const [name, subscription] of Object.entries(subscriptions)) {
        const clickHandler = () => {
            setSubscriptionName(name)
            setOpen(prevState => !prevState)
        }

        console.log(subscription.isDurable)

        const item = (<>
            <ListItemButton onClick={clickHandler}>
                <ListItemText primary={name}/>
                <ListItemText primary={subscription.msgBacklog}/>
                {(open && subscriptionName === name) ? <ExpandLess/> : <ExpandMore/>}
            </ListItemButton>
            <Collapse in={open && subscriptionName === name} timeout="auto" unmountOnExit>
                <List sx={{bgcolor: palette.background.paper}} component="div" disablePadding>
                    <ListItem sx={{pl: 4}}>
                        <ListItemText primary="Backlog size"/>
                        <ListItemText sx={{textAlign: "right"}} primary={subscription.backlogSize}/>
                    </ListItem>
                    <ListItem sx={{pl: 4}}>
                        <ListItemText primary="Delayed messages in backlog"/>
                        <ListItemText sx={{textAlign: "right"}} primary={subscription.msgDelayed}/>
                    </ListItem>
                    <ListItem sx={{pl: 4}}>
                        <ListItemText primary="Unack messages"/>
                        <ListItemText sx={{textAlign: "right"}} primary={subscription.unackedMessages}/>
                    </ListItem>
                    <ListItem sx={{pl: 4}}>
                        <ListItemText primary="Subscribtion type"/>
                        <ListItemText sx={{textAlign: "right"}} primary={subscription.type}/>
                    </ListItem>
                    <ListItem sx={{pl: 4}}>
                        <ListItemText primary="Consumers"/>
                        <ListItemText sx={{textAlign: "right"}} primary={subscription.consumers.length}/>
                    </ListItem>
                    <ListItem sx={{pl: 4}}>
                        <ListItemText primary="Durable"/>
                        <ListItemText sx={{textAlign: "right"}} primary={`${subscription.isDurable}`}/>
                    </ListItem>
                    <ListItem sx={{pl: 4}}>
                        <ListItemText primary="Replicated"/>
                        <ListItemText sx={{textAlign: "right"}} primary={`${subscription.isReplicated}`}/>
                    </ListItem>
                </List>
            </Collapse>
        </>)
        listItems.push(item)
    }

    return (
        <Paper sx={{
            width: "100%",
            height: "100%",
            maxHeight: "355px",
            padding: "1rem 2rem",
            bgcolor: bgColor,
            overflow: "scroll"
        }}
               square={false}>
            <List>
                {listItems.map(item => item)}
            </List>
        </Paper>
    )
}
