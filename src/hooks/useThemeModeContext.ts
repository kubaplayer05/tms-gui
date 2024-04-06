import {useContext} from "react";
import {ThemeModeContext} from "../context/themeModeContext.tsx";

export default function useThemeModeContext() {

    const ctx = useContext(ThemeModeContext)

    if (!ctx) throw new Error("You must use ThemeModeContext inside provider component")

    return ctx
}
