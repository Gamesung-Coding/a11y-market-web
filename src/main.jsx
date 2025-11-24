import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';

// global css
import './global.css';

// Redux setup
import { Provider } from 'react-redux';
import { store } from './store/store.js';

// Router setup
import { router } from './router.js';
import { RouterProvider } from '@tanstack/react-router';

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
