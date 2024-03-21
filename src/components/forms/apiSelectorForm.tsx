import Grid from "@mui/material/Grid";
import AutoCompleteInput from "../inputs/autoComplete.tsx";
import {Button, TextField} from "@mui/material";

export default function ApiSelectorForm() {

    return (
        <form style={{width: "100%"}}>
            <Grid container display="flex" justifyContent="center">
                <Grid item xs={8}
                      style={{display: "flex", justifyContent: "right", flexDirection: "column", gap: "1.4rem"}}>
                    <AutoCompleteInput label="API ENDPOINT URL"/>
                    <TextField label="API SECRET KEY"/>
                    <Button variant="contained">Sign In</Button>
                </Grid>
            </Grid>
        </form>
    )
}
