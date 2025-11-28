import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// global css
import './global.css';

// Redux setup
import { Provider } from 'react-redux';
import { store } from './store/store.js';

// Router setup
import { RouterProvider } from '@tanstack/react-router';
import { router } from './router.js';

const rootElement = document.getElementById('root');
if (!rootElement.innerHTML) {
  const root = createRoot(rootElement);

  root.render(
    <StrictMode>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </StrictMode>,
  );
}
