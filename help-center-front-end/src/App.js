
import './App.css';
import Navbar from './Components/Navbar';
import Search from './Components/Search';
import Card from './Components/Card';
import Footer from './Components/Footer';
import { ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Search/>
      <Card/>
      <Footer/>
      <ToastContainer />
    </div>
  );
}

export default App;
