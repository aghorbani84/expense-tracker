import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store/store';
import './index.css';
import App from './App.tsx';
import { ShowcaseThemeProvider } from './ThemeProvider';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <ShowcaseThemeProvider>
        <App />
      </ShowcaseThemeProvider>
    </Provider>
  </StrictMode>,
);
