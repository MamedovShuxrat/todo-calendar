import { useState } from 'react';
import { format } from 'date-fns';
import { useTaskContext } from '../../contexts/TaskContext';
import toast from 'react-hot-toast';
import styles from './Modal.module.scss';

interface ModalProps {
    date: Date;
    tasks: Task[];
    onClose: () => void;
}

interface Task {
    id: number;
    text: string;
    completed: boolean;
}

export const Modal = ({ date, onClose }: ModalProps) => {
    const { tasks, addTask, removeTask, toggleTask } = useTaskContext();
    const [taskText, setTaskText] = useState('');
    const dayString = format(date, 'yyyy-MM-dd');
    const [hoveredTaskId, setHoveredTaskId] = useState<number | null>(null);

    const handleAddTask = () => {
        if (!taskText.trim()) {
            toast.error('Task cannot be empty');
            return;
        }
        addTask(dayString, { id: Date.now(), text: taskText, completed: false });
        toast.success('Task was successfully added');
        setTaskText('');
    };

    return (
        <div className={styles.modal}>
            <div className={styles.modalContent}>
                <div className={styles.modalTitleWrapper}>
                    <h2>Tasks for <span className={styles.modalAccentDate}>{format(date, 'd MMMM')}</span></h2>
                    <button className={styles.modalBtnClose} onClick={onClose}>X</button>
                </div>
                <ul className={styles.tasks}>
                    {(tasks[dayString] || []).map(task => (
                        <li key={task.id} className={styles.tasksItem}>
                            <span
                                onClick={() => toggleTask(dayString, task.id)}
                                className={`${styles.tasksLink} ${task.completed || hoveredTaskId === task.id ? styles.lineThrough : ''}`}
                            >
                                {task.text}
                            </span>
                            <button
                                className={styles.tasksDeleteBtn}
                                onClick={() => removeTask(dayString, task.id)}
                                onMouseEnter={() => setHoveredTaskId(task.id)}
                                onMouseLeave={() => setHoveredTaskId(null)}
                            >
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
                <div className={styles.tasksAddWrapper}>
                    <input
                        className={styles.tasksAddInput}
                        placeholder='Write a task'
                        type="text"
                        value={taskText}
                        onChange={(e) => setTaskText(e.target.value)}
                    />
                    <button
                        className={styles.tasksAddBtn}
                        onClick={handleAddTask}
                    >
                        Add Task
                    </button>
                </div>
            </div>
        </div>
    );
};
