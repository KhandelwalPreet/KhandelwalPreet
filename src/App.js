
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Search from './pages/Search';
import Pricing from './pages/paymentPage';
import SignUp from './pages/SignUp';
import "./Row.css";
import SignIn from './pages/Signin';
import About from './pages/About';
import AccountsPage from './pages/AccountsPage';

function App() {
 
  return (
    <BrowserRouter>
      <Routes>
         <Route index element={<Home />} />
         <Route path='search' element={<Search />} />
         <Route path='pay' element={<Pricing />} />
         <Route path='signup' element={<SignUp />} />
         <Route path='signin' element={<SignIn />} />
         <Route path='about' element={<About />} />
         <Route path='account' element={<AccountsPage />} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
