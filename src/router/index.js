
import { createBrowserRouter } from "react-router-dom";
import Home from '../pages/Home'
import Amuse from "../pages/Amuse";
import Study from "../pages/Study";


const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />
    },
    {
        path: '/2',
        element: <Amuse />
    },
    {
        path: '/3',
        element: <Study />
    }
])


export default router