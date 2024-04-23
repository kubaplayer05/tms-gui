import {createContext, ReactNode, useState} from "react";
import {Tenant} from "../types/api";

interface ProviderProps {
    tenants: Tenant[],
    addTenant: (value: Tenant) => void,
    addTenants: (value: Tenant[]) => void,
    deleteTenants: (value: string[]) => void,
    isCreateTenantDialogOpen: boolean,
    openCreateTenantDialog: () => void,
    closeCreateTenantDialog: () => void,
}

export const TenantsContext = createContext<ProviderProps | null>(null)

export function TenantsProvider({children}: { children: ReactNode }) {

    const [tenants, setTenants] = useState<Tenant[]>([])
    const [isCreateTenantDialogOpen, setDialog] = useState(false)

    const addTenant = (tenant: Tenant) => {
        setTenants(prevState => {
            return [...prevState, tenant]
        })
    }

    const addTenants = (tenants: Tenant[]) => {
        setTenants(tenants)
    }

    const deleteTenants = (tenantsId: string[]) => {
        setTenants(prevState => {
            return prevState.filter((tenant) => !tenantsId.includes(tenant.id))
        })
    }

    const openCreateTenantDialog = () => {
        setDialog(true)
    }

    const closeCreateTenantDialog = () => {
        setDialog(false)
    }

    return (
        <TenantsContext.Provider value={{
            tenants,
            addTenant,
            addTenants,
            deleteTenants,
            isCreateTenantDialogOpen,
            openCreateTenantDialog,
            closeCreateTenantDialog
        }}>
            {children}
        </TenantsContext.Provider>
    )
}
