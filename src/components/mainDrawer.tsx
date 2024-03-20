import {Drawer} from "@mui/material";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import {MdChevronLeft, MdChevronRight, MdPeople} from "react-icons/md";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import {useTheme} from "@mui/material/styles";
import {closedMixin, openedMixin} from "../lib/mixins.ts";

interface MainDrawerProps {
    open: boolean,
    handleDrawerClose: () => void,
    drawerWidth: number,
}

export default function MainDrawer({open, handleDrawerClose, drawerWidth}: MainDrawerProps) {

    const theme = useTheme()
    const navOptions = [{name: "tenants", icon: <MdPeople/>}]

    const drawerSX = {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme, drawerWidth),
            '& .MuiDrawer-paper': openedMixin(theme, drawerWidth),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }

    const drawerHeaderSX = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
    }

    return (
        <Drawer variant="permanent" open={open} sx={drawerSX}>
            <Box sx={drawerHeaderSX}>
                <IconButton onClick={handleDrawerClose}>
                    {theme.direction === 'rtl' ? <MdChevronRight/> : <MdChevronLeft/>}
                </IconButton>
            </Box>
            <Divider/>
            <List>
                {navOptions.map((navOption) => (
                    <ListItem key={navOption.name} disablePadding sx={{display: 'block'}}>
                        <ListItemButton sx={{
                            minHeight: 48,
                            justifyContent: open ? 'initial' : 'center',
                            px: 2.5,
                        }}>
                            <ListItemIcon sx={{
                                minWidth: 0,
                                mr: open ? 3 : 'auto',
                                justifyContent: 'center',
                            }}>
                                {navOption.icon}
                            </ListItemIcon>
                            <ListItemText primary={navOption.name}
                                          sx={{textTransform: "capitalize", opacity: open ? 1 : 0}}/>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Drawer>
    )
}
