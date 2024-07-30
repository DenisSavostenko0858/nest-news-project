import { useContext } from 'react';
import { Routes, Route, Navigate} from 'react-router-dom';
import { authRoutes, publicRoutes } from '../routes';
import { HOME_ROUT } from '../utils/consts_rout.tsx';
import {Context} from '../main';

const AppRouter = () => {
    const context = useContext(Context);
    
    return (
        <Routes>
            {context?.user.isAuth && authRoutes.map(({ path, Component }) =>
                <Route key={path} path={path} element={<Component />} />
            )}
            {publicRoutes.map(({ path, Component }) =>
                <Route key={path} path={path} element={<Component />} />
            )}
            <Route path="*" element={<Navigate to={HOME_ROUT} />} />
        </Routes>
    );
};

export default AppRouter;