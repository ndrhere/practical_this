
import './App.css';
import ProductList from './components/ProductList';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
function App() {
  return (
    <div className="App">
      <h3>Hello There !</h3>
      <Router>

        <Routes>

          <Route exact path='/' element={<ProductList />}></Route>


        </Routes>


      </Router>
    </div>
  );
}

export default App;
