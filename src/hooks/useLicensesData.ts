import useApiAuthContext from "./useApiAuthContext.ts";
import useDialogOptions from "./useDialogOptions.ts";
import {useState} from "react";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {deleteTenant} from "../lib/api/tenant/deleteTenant.ts";
import {ILicense} from "../types/api/license";
import {getLicenses} from "../lib/api/license/getLicenses.ts";
import {createLicense} from "../lib/api/license/createLicense.ts";

export default function useLicensesData() {

    const {accessToken, apiPrefix} = useApiAuthContext()

    const {dialogOptions, closeDialog, openDialog} = useDialogOptions()
    const [selectedIds, setSelectedIds] = useState<string[]>([])
    const [selectedLicense, setSelectedLicense] = useState<ILicense | null>(null)

    const queryClient = useQueryClient()
    const {data, status, error} = useQuery({
        queryKey: ["licenses"], queryFn: () => {
            return getLicenses({prefixUrl: apiPrefix, accessToken: accessToken})
        },
    })

    const createLicenseMutation = useMutation({
        mutationFn: createLicense,
        onSuccess: (_res, variables) => {
            const prevLicenses = data!.data.filter(license => license.id !== variables.body.id)

            const licenses = [...prevLicenses, variables.body]
            const updater = {...data, data: licenses}

            queryClient.setQueryData(["licenses"], updater)
            closeDialog()
        }
    })

    const deleteLicenseMutation = useMutation({
        mutationFn: deleteTenant,
        onSuccess: (_res, variables) => {
            const licenses = data!.data.filter(license => license.id !== variables.id)
            const updater = {...data, data: licenses}

            queryClient.setQueryData(["licenses"], updater)
            closeDialog()
        }
    })

    const createLicenseHandler = (tenant: ILicense) => {
        createLicenseMutation.mutate({
            accessToken,
            prefixUrl: apiPrefix,
            body: tenant
        })
    }

    const deleteLicenseHandler = () => {
        selectedIds.forEach(id => {
            deleteLicenseMutation.mutate({
                id,
                accessToken,
                prefixUrl: apiPrefix
            })
        })
        setSelectedIds([])
    }

    return {
        data,
        status,
        error,
        selectedIds,
        selectedLicense,
        setSelectedIds,
        setSelectedLicense,
        createLicenseHandler,
        deleteLicenseHandler,
        createMutation: {
            ...createLicenseMutation
        },
        deleteMutation: {
            ...deleteLicenseMutation
        },
        dialogOptions,
        openDialog,
        closeDialog
    }

}
