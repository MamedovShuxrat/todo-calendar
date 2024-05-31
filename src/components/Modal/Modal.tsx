import { useState } from 'react';
import { useTaskContext } from '../../contexts/TaskContext';
import styles from './Modal.module.scss';

interface ModalProps {
    day: number;
    onClose: () => void;
}

export const Modal = ({ day, onClose }: ModalProps) => {
    const { tasks, addTask, removeTask, toggleTask } = useTaskContext();
    const [taskText, setTaskText] = useState('');
    const dayString = day.toString();

    const handleAddTask = () => {
        addTask(dayString, { id: Date.now(), text: taskText, completed: false });
        setTaskText('');
    };

    return (
        <div className={styles.modal}>
            <div className={styles.modalContent}>
                <h2>Tasks for {day}</h2>
                <button onClick={onClose}>Close</button>
                <ul>
                    {(tasks[dayString] || []).map(task => (
                        <li key={task.id}>
                            <span
                                style={{ textDecoration: task.completed ? 'line-through' : 'none' }}
                                onClick={() => toggleTask(dayString, task.id)}
                            >
                                {task.text}
                            </span>
                            <button onClick={() => removeTask(dayString, task.id)}>Delete</button>
                        </li>
                    ))}
                </ul>
                <input
                    type="text"
                    value={taskText}
                    onChange={(e) => setTaskText(e.target.value)}
                />
                <button onClick={handleAddTask}>Add Task</button>
            </div>
        </div>
    );
};