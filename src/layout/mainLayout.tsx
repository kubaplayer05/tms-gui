import Box from '@mui/material/Box';
import {Outlet} from "react-router-dom";
import {useState} from "react";
import MainDrawer from "../components/mainDrawer.tsx";
import MainAppBar from "../components/mainAppBar.tsx";

export default function MainLayout() {

    const drawerWidth = 240;
    const [open, setOpen] = useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };


    return (
        <Box sx={{display: 'flex'}}>
            <MainAppBar open={open} handleDrawerOpen={handleDrawerOpen} drawerWidth={drawerWidth}/>
            <MainDrawer open={open} handleDrawerClose={handleDrawerClose} drawerWidth={drawerWidth}/>
            <Box component="main" sx={{flexGrow: 1, p: 3}}>
                <Outlet/>
            </Box>
        </Box>
    );
}
