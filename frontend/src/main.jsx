
import { createRoot } from 'react-dom/client'
import './index.css'
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'; // Import CSS here
import App from './App.jsx'
import {BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './Store/index.js'
createRoot(document.getElementById('root')).render(
  <Router>
    <Provider store={store}>
    <App />
    </Provider>
  
  </Router>
)
