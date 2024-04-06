import {Drawer} from "@mui/material";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import {MdAreaChart, MdChevronLeft, MdChevronRight, MdExitToApp, MdPeople} from "react-icons/md";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import {useTheme} from "@mui/material/styles";
import {closedMixin, openedMixin} from "../../lib/mixins.ts";
import useApiAuthContext from "../../hooks/useApiAuthContext.ts";
import {Link} from "react-router-dom";

interface MainDrawerProps {
    open: boolean,
    handleDrawerClose: () => void,
    drawerWidth: number,
}

export default function MenuDrawer({open, handleDrawerClose, drawerWidth}: MainDrawerProps) {

    const {removeAccess} = useApiAuthContext()
    const theme = useTheme()
    const navOptions = [{name: "dashboard", icon: <MdAreaChart/>, route: "/"}, {
        name: "tenants",
        icon: <MdPeople/>,
        route: "/tenants"
    }]

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

    const onLogoutClick = () => {
        removeAccess()
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
                    <Link to={navOption.route}>
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
                    </Link>
                ))}
                <ListItem onClick={onLogoutClick} disablePadding sx={{display: 'block'}}>
                    <ListItemButton sx={{
                        minHeight: 48,
                        display: "flex",
                        justifyContent: open ? 'initial' : 'center',
                        alignItems: "center",
                        px: 2.5,
                    }}>
                        <ListItemIcon sx={{
                            minWidth: 0,
                            mr: open ? 3 : 'auto',
                            justifyContent: 'center',
                        }}>
                            <MdExitToApp/>
                        </ListItemIcon>
                        <ListItemText primary="logout"
                                      sx={{
                                          textTransform: "capitalize",
                                          opacity: open ? 1 : 0,
                                          verticalAlign: "middle",
                                      }}/>
                    </ListItemButton>
                </ListItem>
            </List>
        </Drawer>
    )
}
