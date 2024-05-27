import {CircularProgress} from "@mui/material";
import useApiAuthContext from "../hooks/useApiAuthContext.ts";
import {useQuery, useQueryClient} from "@tanstack/react-query";
import {getTenants} from "../lib/api/getTenants.ts";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {useEffect, useState} from "react";
import {DeleteFnParams, Tenant, ValidationError} from "../types/api";
import {AxiosResponse} from "axios";
import TenantsTable from "../components/tables/tenantsTable.tsx";
import TenantDetailsDialog from "../components/dialogs/tenantDetailsDialog.tsx";
import SnackbarWithAlert from "../components/snackbarWithAlert.tsx";
import {SnackbarData} from "../types/snackbar";
import Paper from "@mui/material/Paper";

export default function TenantsPage() {

    const {apiPrefix, accessToken} = useApiAuthContext()
    const queryClient = useQueryClient()

    const [tenants, setTenants] = useState<Tenant[]>([])
    const [currentTenant, setCurrentTenant] = useState<Tenant | null>(null)
    const [openDetails, setOpenDetails] = useState(false)
    const [openSnackbar, setOpenSnackbar] = useState(false)
    const [snackbarData, setSnackbarData] = useState<SnackbarData>({
        content: "",
        severity: "success"
    })

    const handleTenantDeletion = (_res: AxiosResponse<string, ValidationError>, variables: DeleteFnParams) => {
        const {id} = variables

        queryClient.setQueryData(["tenants"], (queryData: AxiosResponse<Tenant[], ValidationError>) => {
            const tenants = queryData.data
            const filteredTenants = tenants.filter(tenant => tenant.id !== id)

            return {
                ...queryData,
                data: filteredTenants
            }
        })


        setSnackbarData({
            content: "Successfully deleted tenant",
            severity: "success"
        })
        setOpenSnackbar(true)
    }

    const handleTenantDeletionError = () => {
        setSnackbarData({
            content: "Could not delete tenant/s",
            severity: "error"
        })
        setOpenSnackbar(true)
    }

    const handleOpenTenantDetails = () => {
        setCurrentTenant(null)
        setOpenDetails(true)
    }

    const handleTenantsUpdate = (res: AxiosResponse<Tenant, ValidationError>) => {
        setTenants(prevState => {

            const filteredTenants = prevState.filter(tenant => tenant.id !== res.data.id)

            return [...filteredTenants, res.data]
        })

        setOpenDetails(false)
        setSnackbarData({
            content: "Successfully created/updated tenant",
            severity: "success"
        })
        setOpenSnackbar(true)
    }

    const handleTenantsUpdateError = () => {
        setSnackbarData({
            content: "Could not create/update tenant",
            severity: "error"
        })
        setOpenSnackbar(true)
    }

    const handleRowClick = (tenant: Tenant) => {
        setCurrentTenant(tenant)
        setOpenDetails(true)
    }

    const {data, status, error,} = useQuery({
        queryKey: ["tenants"], queryFn: () => {
            return getTenants({prefixUrl: apiPrefix, accessToken: accessToken})
        },
    })

    useEffect(() => {
        if (data) {
            const tenantData = data.data
            setTenants(tenantData)
        }
    }, [data]);

    if (status === "pending") {
        return (<Box sx={{m: 0, p: 2, width: "100%", display: "flex", justifyContent: "center"}}>
            <CircularProgress/>
        </Box>)
    }

    if (status === "error") {
        const errorText = error.message

        return (<Box sx={{m: 0, p: 2, width: "100%", display: "flex", alignItems: "center", flexDirection: "column"}}>
            <Paper sx={{p: 3, textAlign: "center", display: "flex", gap: "0.8rem", flexDirection: "column"}}>
                <Typography component="h3" variant="h5">Something Went Wrong</Typography>
                <Typography component="p">Details: {errorText}</Typography>
            </Paper>
        </Box>)
    }

    return (
        <Box sx={{m: 0, p: 2, width: "100%"}}>
            <TenantsTable data={data?.data} onRowClick={handleRowClick} onCreateBtnClick={handleOpenTenantDetails}
                          onDeleteSuccess={handleTenantDeletion} onDeleteError={handleTenantDeletionError}/>
            <TenantDetailsDialog open={openDetails} onClose={() => setOpenDetails(false)} value={currentTenant}
                                 onSuccess={handleTenantsUpdate} onError={handleTenantsUpdateError}/>
            <SnackbarWithAlert open={openSnackbar} handleClose={() => {
                setOpenSnackbar(false)
            }} snackbarData={snackbarData} origin={{vertical: "bottom", horizontal: "right"}}/>
        </Box>
    )
}
