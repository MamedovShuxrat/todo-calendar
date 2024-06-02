import { TaskProvider } from './contexts/TaskContext';
import { Calendar } from './components/Calendar/Calendar';
import { Toaster } from 'react-hot-toast';

const App = () => {
  return (
    <TaskProvider>
      <div className="container">
        <Toaster />
        <Calendar />
      </div>
    </TaskProvider>
  );
};

export default App;