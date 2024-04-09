import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import {MdExitToApp} from "react-icons/md";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import {useState} from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import useApiAuthContext from "../../hooks/useApiAuthContext.ts";

interface MenuLogoutProps {
    isDrawerOpen: boolean
}

export default function MenuLogout({isDrawerOpen}: MenuLogoutProps) {

    const {removeAccess} = useApiAuthContext()
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    const openDialog = () => {
        setIsDialogOpen(true)
    }

    const closeDialog = () => {
        setIsDialogOpen(false)
    }

    const logoutHandler = () => {
        removeAccess()
    }

    return (
        <>
            <ListItem onClick={openDialog} disablePadding sx={{display: 'block'}}>
                <ListItemButton sx={{
                    minHeight: 48,
                    display: "flex",
                    justifyContent: isDrawerOpen ? 'initial' : 'center',
                    alignItems: "center",
                    px: 2.5,
                }}>
                    <ListItemIcon sx={{
                        minWidth: 0,
                        mr: isDrawerOpen ? 3 : 'auto',
                        justifyContent: 'center',
                    }}>
                        <MdExitToApp/>
                    </ListItemIcon>
                    <ListItemText primary="logout"
                                  sx={{
                                      textTransform: "capitalize",
                                      opacity: isDrawerOpen ? 1 : 0,
                                      verticalAlign: "middle",
                                  }}/>
                </ListItemButton>
            </ListItem>
            <Dialog open={isDialogOpen} onClose={closeDialog}>
                <DialogTitle>Logout from TMS GUI ?</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        State and local storage with access token and api prefix will be removed.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeDialog}>Cancel</Button>
                    <Button onClick={logoutHandler} autoFocus>Logout</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
