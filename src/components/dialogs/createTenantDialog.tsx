import {Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";
import useTenantsContext from "../../hooks/useTenantsContext.ts";
import {ChangeEvent, FormEvent, useState} from "react";
import {CreateTenantBody} from "../../types/api";
import {useMutation} from "react-query";
import {createTenant} from "../../lib/api/createTenant.ts";
import useApiAuthContext from "../../hooks/useApiAuthContext.ts";


export default function CreateTenantDialog() {

    const {apiPrefix, accessToken} = useApiAuthContext()
    const {addTenant} = useTenantsContext()
    const {isCreateTenantDialogOpen, closeCreateTenantDialog} = useTenantsContext()
    const [tenantFormData, setTenantFormData] = useState<CreateTenantBody>({
        "id": "",
        "name": "",
        "install_token": "",
        "email": "",
        "expire": ""
    })

    const mutation = useMutation({
        mutationFn: createTenant, onSuccess: (res) => {
            addTenant(res.data)
            closeCreateTenantDialog()
        }
    })

    const submitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        mutation.reset()
        mutation.mutate({prefixUrl: apiPrefix, accessToken, body: tenantFormData})
    }

    const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {

        const propertyName = e.target.id as keyof CreateTenantBody
        const newTenantFormData = {...tenantFormData}

        newTenantFormData[propertyName] = e.target.value
        setTenantFormData(newTenantFormData)
    }

    return (
        <Dialog open={isCreateTenantDialogOpen} onClose={closeCreateTenantDialog} PaperProps={{
            component: "form",
            onSubmit: submitHandler
        }}>
            <DialogTitle>Create Tenant</DialogTitle>
            <DialogContent sx={{display: "flex", flexDirection: "column", gap: 2, minWidth: "600px"}}>
                <TextField id="id" fullWidth required label="Tenant id" onChange={changeHandler}/>
                <TextField id="name" fullWidth required label="Tenant name" onChange={changeHandler}/>
                <TextField id="install_token" fullWidth required label="Install token" onChange={changeHandler}/>
                <TextField id="email" fullWidth required type="email" label="Tenant email" onChange={changeHandler}/>
                <TextField id="expire" fullWidth required type="datetime-local" onChange={changeHandler}/>
            </DialogContent>
            <DialogActions>
                <Button onClick={closeCreateTenantDialog}>Cancel</Button>
                {!mutation.isLoading && <Button type="submit">Submit</Button>}
                {mutation.isLoading && <CircularProgress/>}
            </DialogActions>
        </Dialog>
    )
}
