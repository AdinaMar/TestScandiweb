import React from 'react';
import CardComponent from './components/ProductsComponent';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Footer from './components/footer/Footer';
import AddItem from './AddItem';
import './App.css'

class App extends React.Component {
  render() {
    return (
      <>
      <div className="container">
      <Router>
         
        <Routes>
     
        
      
            <Route exact path="/" element={<CardComponent />} />
            <Route path="/add-product" element={<AddItem />} />
          
      
      </Routes>
      </Router>
      </div>
      
      <Footer />
      </>
    );
  }
}

export default App;