import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app.tsx'
import './index.css'
import {ApiAuthProvider} from "./context/apiAuthContext.tsx";
import {ThemeModeProvider} from "./context/themeModeContext.tsx";
import {TenantsProvider} from "./context/tenantsContext.tsx";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ApiAuthProvider>
            <TenantsProvider>
                <ThemeModeProvider>
                    <App/>
                </ThemeModeProvider>
            </TenantsProvider>
        </ApiAuthProvider>
    </React.StrictMode>,
)
