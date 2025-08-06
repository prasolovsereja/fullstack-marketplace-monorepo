import 'bootstrap/dist/css/bootstrap.min.css';
import { createRoot } from 'react-dom/client';
import App from './App';
import { StrictMode } from 'react';
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {store} from "./slices";


const rootElement = document.getElementById('root') as HTMLElement;
createRoot(rootElement).render(
  <StrictMode>
      <BrowserRouter>
          <Provider store={store}>
              <App />
          </Provider>
      </BrowserRouter>
  </StrictMode>,
);