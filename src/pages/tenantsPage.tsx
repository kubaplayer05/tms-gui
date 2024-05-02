import {CircularProgress} from "@mui/material";
import useApiAuthContext from "../hooks/useApiAuthContext.ts";
import {useQuery} from "react-query";
import {getTenants} from "../lib/api/getTenants.ts";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {useState} from "react";
import TenantDetailsDialog from "../components/dialogs/TenantDetailsDialog";
import {Tenant} from "../types/api";
import DataTable from "../components/tables/dataTable.tsx";
import {deleteTenant} from "../lib/api/deleteTenant.ts";
import {HeadCell} from "../types/table";

export default function TenantsPage() {

    const {apiPrefix, accessToken} = useApiAuthContext()
    const [tenants, setTenants] = useState<Tenant[]>([])
    const [currentTenant, setCurrentTenant] = useState<Tenant | null>(null)
    const [openDetails, setOpenDetails] = useState(false)

    const headCells: HeadCell<Tenant>[] = [
        {
            id: "id",
            numeric: false,
            label: "id",
            disablePadding: false,
        },
        {
            id: "name",
            numeric: false,
            label: "name",
            disablePadding: false,
        },
        {
            id: "email",
            numeric: false,
            label: "email",
            disablePadding: false,
        },
        {
            id: "created",
            numeric: false,
            label: "created at",
            disablePadding: false,
        },
        {
            id: "expire",
            numeric: false,
            label: "expire at",
            disablePadding: false,
        },
    ]

    const handleTenantDeletion = (id: string) => {
        console.log(id)
    }

    const handleOpenTenantDetails = () => {
        console.log("open")
    }

    const handleRowClick = (tenant: Tenant) => {
        setCurrentTenant(tenant)
        setOpenDetails(true)
    }

    const {status} = useQuery({
        queryKey: ["tenants"], queryFn: () => {
            return getTenants({prefixUrl: apiPrefix, accessToken: accessToken})
        }, onSuccess: res => {
            setTenants(res.data)
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
            <DataTable onRowClick={handleRowClick} data={tenants} title="Tenants Table" deleteFn={deleteTenant}
                       onDeleteSuccess={handleTenantDeletion} headCells={headCells} onCreateBtnClick={handleOpenTenantDetails}/>
            {currentTenant &&
                <TenantDetailsDialog open={openDetails} onClose={() => setOpenDetails(false)} value={currentTenant}/>}
        </Box>
    )
}
