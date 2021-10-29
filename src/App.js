import './App.css';
import Calendar from './Calendar';

const now = new Date();

function App() {
  return (
    <Calendar date={now} />
  );
}

export default App;
