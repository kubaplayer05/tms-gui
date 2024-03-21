import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {useState} from "react";
import {QueryClient, QueryClientProvider} from "react-query";
import {CssBaseline, ThemeProvider} from "@mui/material";
import MainLayout from "./layout/mainLayout.tsx";
import ApiSelectorPage from "./pages/apiSelectorPage.tsx";
import {theme} from "./lib/theme.ts";

export default function App() {

    const queryClient = new QueryClient()
    const [isApiUrlSelected, setIsApiUrlSelected] = useState(false)

    const router = createBrowserRouter([
        {
            path: "/",
            element: isApiUrlSelected ? <MainLayout/> : <ApiSelectorPage/>,
            children: [
                {
                    path: "/",
                    element: <div>Home Page</div>
                }
            ]
        }
    ])

    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <RouterProvider router={router}/>
            </ThemeProvider>
        </QueryClientProvider>

    )
}
