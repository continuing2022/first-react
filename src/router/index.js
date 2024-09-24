
import { createBrowserRouter } from "react-router-dom";
import Home from '../pages/Home'
import Sport from "../pages/Sport";
import Study from "../pages/Study";


const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />
    },
    {
        path: '/2',
        element: <Sport />
    },
    {
        path: '/3',
        element: <Study />
    }
])


export default router