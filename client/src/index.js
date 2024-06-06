import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './bootstrap.min.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './store';
import {positions,transitions,Provider as AlertProvider} from 'react-alert';
import TemplateProvider from 'react-alert-template-basic';
const option={
  timeout:5000,
  position:positions.BOTTOM_CENTER,
  transition:transitions.SCALE
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
<AlertProvider template={TemplateProvider} {...option}>
<Provider store={store}>
   <App />
</Provider>
</AlertProvider>
 
);
