import AuthPage from './pages/AuthPage'
import CreatePage from './pages/CreatePage'
import DetailPage from './pages/DetailPage'
import LinksPage from './pages/LinksPage'


export const authRoutes = [
    {
        path: '/create',
        Component: CreatePage
    },
    {
        path: '/links',
        Component: LinksPage
    },
    {
        path: '/detail/:id',
        Component: DetailPage
    },
    {
        path: '*',
        Component: CreatePage
    }
]

export const publicRoutes = [
    {
        path: '/',
        Component: AuthPage
    },
    {
        path: '*',
        Component: AuthPage
    }
]