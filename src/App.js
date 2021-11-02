import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Routes from './Routes';
import 'react-toastify/dist/ReactToastify.css';
import UserProvider from './Context/content.js';

function App() {
  return (
    <BrowserRouter>
      <ToastContainer autoClose={3000} theme="colored" />
      <UserProvider>
        <Routes />
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
