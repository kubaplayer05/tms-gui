import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {useState} from "react";
import {QueryClient, QueryClientProvider} from "react-query";
import {CssBaseline} from "@mui/material";
import MainLayout from "./layout/mainLayout.tsx";

export default function App() {

    const queryClient = new QueryClient()
    const [isApiUrlSelected, setIsApiUrlSelected] = useState(true)

    const router = createBrowserRouter([
        {
            path: "/",
            element: isApiUrlSelected ? <MainLayout/> : <div>Form to Sign in</div>,
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
            <CssBaseline/>
            <RouterProvider router={router}/>
        </QueryClientProvider>

    )
}
