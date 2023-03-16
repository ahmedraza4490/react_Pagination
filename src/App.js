import './App.css';
import { Navbar } from './components/navbar1';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from './pages/home';
import Reports from './pages/reports1';
import Products from './pages/products';

export default function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/products" component={Products} />
          <Route path="/reports" component={Reports} />
        </Switch>
      </Router>
    </div>
  );
}
