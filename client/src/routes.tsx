import { HOME_ROUT, LOGIN_ROUT, REGISTER_ROUT, NEWS_ROUT } from "./utils/consts_rout"

import Auth from "./pages/Auth"
import Home from "./pages/Home"
import News from "./pages/News"

export const authRoutes = [
    {
        path: HOME_ROUT,
        Component: Home
    },
    {
        path: NEWS_ROUT,
        Component: News
    }
]

export const publicRoutes = [
    {
        path: HOME_ROUT,
        Component: Home
    },
    {
        path: LOGIN_ROUT,
        Component: Auth
    },    
    {
        path: REGISTER_ROUT,
        Component: Auth
    },
    {
        path: NEWS_ROUT,
        Component: News
    }
]