import * as React from "react";
import {CircularProgress} from "@mui/material";
import useApiAuthContext from "../hooks/useApiAuthContext.ts";
import {useQuery} from "react-query";
import {getTenants} from "../lib/api/getTenants.ts";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TenantsTable from "../components/tables/tenantsTable.tsx";
import CreateTenantDialog from "../components/dialogs/createTenantDialog.tsx";
import useTenantsContext from "../hooks/useTenantsContext.ts";
import {useState} from "react";
import TenantDetailsDialog from "../components/dialogs/TenantDetailsDialog";

export default function TenantsPage() {

    const {apiPrefix, accessToken} = useApiAuthContext()
    const {addTenants} = useTenantsContext()
    const [currentTenant, setCurrentTenant] = useState(null)
    const [openDetails, setOpenDetails] = useState(false)

    const handleRowClick = (tenant) => {
        setCurrentTenant(tenant)
        setOpenDetails(true)
    }

    const {status} = useQuery({
        queryKey: ["tenants"], queryFn: () => {
            return getTenants({prefixUrl: apiPrefix, accessToken: accessToken})
        }, onSuccess: res => {
            addTenants(res.data)
        }
    })

    if (status === "loading") {
        return (<Box sx={{m: 0, p: 2, width: "100%", display: "flex", justifyContent: "center"}}>
            <CircularProgress/>
        </Box>)
    }

    if (status === "error") {
        return (<Box sx={{m: 0, p: 2, width: "100%", display: "flex", alignItems: "center", flexDirection: "column"}}>
            <Typography component="h3" variant="h5">Something Went Wrong</Typography>
            <Typography component="p">Try again</Typography>
        </Box>)
    }

    return (
        <Box sx={{m: 0, p: 2, width: "100%"}}>
            <TenantsTable onRowClick={handleRowClick}/>
            <CreateTenantDialog/>
            {currentTenant && <TenantDetailsDialog open={openDetails} onClose={() => setOpenDetails(false)} value={currentTenant}/>}
        </Box>
    )
}
