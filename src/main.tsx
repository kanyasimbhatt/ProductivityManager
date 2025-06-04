import { StrictMode } from 'react'
import { RouterProvider, createHashRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import './index.css'
import FocusModes from './Components/FocusModes.tsx'
import AddFocus from './Components/AddFocus.tsx'

const Routes = createHashRouter([
    {
        path: '/',
        element: <FocusModes />,
    },
    {
        path: '/add-focus',
        element: <AddFocus />,
    },
])

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <RouterProvider router={Routes} />
    </StrictMode>
)
