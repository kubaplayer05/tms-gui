import {useContext} from "react";
import {TenantsContext} from "../context/tenantsContext.tsx";

export default function useTenantsContext() {

    const ctx = useContext(TenantsContext)

    if(!ctx) throw new Error("You must use tenantsContext inside provider")

    return ctx
}
