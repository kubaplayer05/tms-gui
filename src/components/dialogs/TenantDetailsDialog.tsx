import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";
import {Tenant} from "../../types/api";

interface TenantDetailsDialogProps {
    value: Tenant,
    open: boolean,
    onClose: () => void
}

export default function TenantDetailsDialog({value, open, onClose} : TenantDetailsDialogProps) {

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Tenant Details</DialogTitle>
            <DialogContent sx={{display: "flex", flexDirection: "column", gap: 2, minWidth: "600px"}}>
                <TextField id="id" value={value.id} fullWidth required label="Tenant id"/>
                <TextField id="name" value={value.name} fullWidth required label="Tenant name"/>
                <TextField id="install_token" value={value.install_token} fullWidth required label="Install token" />
                <TextField id="email" value={value.email} fullWidth required type="email" label="Tenant email" />
                <TextField id="expire" value={value.expire} fullWidth required type="datetime-local" />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Close</Button>
            </DialogActions>
        </Dialog>
    )
}
