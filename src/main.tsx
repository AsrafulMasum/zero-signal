import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import router from './routes/routes.tsx';
import { Provider } from 'react-redux';
import store from './redux/store.ts';
import { UserProvider } from './provider/User.tsx';
import { Toaster } from 'react-hot-toast';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Provider store={store}>
            <UserProvider>
                <RouterProvider router={router} />
                <Toaster position="top-center" reverseOrder={false} />
            </UserProvider>
        </Provider>
    </StrictMode>,
);
