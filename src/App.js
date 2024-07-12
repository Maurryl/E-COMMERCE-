
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './components/Login';
import ProductList from './components/ProductList';
import ProtectedRoute from './components/ProtectedRoute';

import NavBar from './components/NavBar';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import AddProductPage from './pages/AddProductPage';
import CreateOrderPage from './pages/CreateOrderPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <NavBar />
          <Route path="/login" component={Login} />
          <ProtectedRoute path="/products" component={ProductList} />
          <Route exact path="/" component={HomePage} />
          <Route path="/products" component={ProductsPage} />
          <Route path="/add-product" component={AddProductPage} />
          <Route path="/create-order" component={CreateOrderPage} />
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;
