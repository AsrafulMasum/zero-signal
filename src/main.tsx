import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import router from './routes/routes.tsx';
import { Provider } from 'react-redux';
import store from './redux/store.ts';
import { UserProvider } from './provider/User.tsx';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Provider store={store}>
            <UserProvider>
                <RouterProvider router={router} />
            </UserProvider>
        </Provider>
    </StrictMode>,
);
