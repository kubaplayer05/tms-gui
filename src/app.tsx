import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {QueryClient, QueryClientProvider} from "react-query";
import {CssBaseline, ThemeProvider} from "@mui/material";
import MainLayout from "./layout/mainLayout.tsx";
import ApiSelectorPage from "./pages/apiSelectorPage.tsx";
import {darkTheme, lightTheme} from "./lib/theme.ts";
import useApiAuthContext from "./hooks/useApiAuthContext.ts";
import useThemeModeContext from "./hooks/useThemeModeContext.ts";
import TenantsPage from "./pages/tenantsPage.tsx";

export default function App() {

    const queryClient = new QueryClient()
    const ctx = useApiAuthContext()
    const {themeMode} = useThemeModeContext()

    const router = createBrowserRouter([
        {
            path: "/",
            element: ctx.accessToken ? <MainLayout/> : <ApiSelectorPage/>,
            children: [
                {
                    path: "/",
                    element: <div>Home Page</div>
                },
                {
                    path: "/tenants",
                    element: <TenantsPage/>
                }
            ]
        }
    ])

    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={themeMode === "light" ? lightTheme : darkTheme}>
                <CssBaseline/>
                <RouterProvider router={router}/>
            </ThemeProvider>
        </QueryClientProvider>

    )
}
