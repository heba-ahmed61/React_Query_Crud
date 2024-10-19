import logo from './logo.svg';
import './App.css';
import TodosList from './components/Todos';
import InfinitiScroll from './components/infintiScroll';

function App() {
  return (
    <div className="App">
    {/* <TodosList/> */}
    <InfinitiScroll/>
    </div>
  );
}

export default App;
