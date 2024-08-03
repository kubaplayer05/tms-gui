import Box from "@mui/material/Box";
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";

export default function DashboardNavbar() {

    return (
        <Box sx={{padding: "0.6rem 1rem", width: "100%"}}>
            <FormControl sx={{m: 1, minWidth: 120}} size="small" variant="filled">
                <InputLabel id="refresh">Refresh</InputLabel>
                <Select defaultValue={10} autoWidth={true} labelId="refresh" label={"refresh"}>
                    <MenuItem value={5}>5 second</MenuItem>
                    <MenuItem value={10}>10 second</MenuItem>
                    <MenuItem value={30}>30 second</MenuItem>
                    <MenuItem value={60}>1 minute</MenuItem>
                </Select>
            </FormControl>
        </Box>
    )
}
