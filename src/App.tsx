import { TaskProvider } from './contexts/TaskContext';
import { Calendar } from './components/Calendar/Calendar';

const App = () => {
  return (
    <TaskProvider>
      <div className="container">
        <Calendar />
      </div>
    </TaskProvider>
  );
};

export default App;