
import { useState } from 'react';
import Login from './pages/Login';
import ListGroup from "./components/ListGroup"; 

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  if (!isAuthenticated) {
    return <Login />;
  }

  return <div><ListGroup /></div>;
}

export default App;