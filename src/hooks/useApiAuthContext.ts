import {useContext} from "react";
import {ApiAuthContext} from "../context/apiAuthContext.tsx";

export default function useApiAuthContext() {

    const ctx = useContext(ApiAuthContext)

    if (!ctx) throw new Error("You must use ApiAuthContext inside provider component")

    return ctx
}
