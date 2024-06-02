import { createContext, useState, ReactNode, useContext, useEffect } from 'react';

interface Task {
    id: number;
    text: string;
    completed: boolean;
}

interface TaskContextType {
    tasks: Record<string, Task[]>;
    addTask: (date: string, task: Task) => void;
    removeTask: (date: string, taskId: number) => void;
    toggleTask: (date: string, taskId: number) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider = ({ children }: { children: ReactNode }) => {
    const [tasks, setTasks] = useState<Record<string, Task[]>>(() => {
        const storedTasks = localStorage.getItem('tasks');
        return storedTasks ? JSON.parse(storedTasks) : {};
    });

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    const addTask = (date: string, task: Task) => {
        setTasks((prev) => {
            const newTasks = { ...prev };
            if (!newTasks[date]) {
                newTasks[date] = [];
            }
            newTasks[date].push(task);
            return newTasks;
        });
    };

    const removeTask = (date: string, taskId: number) => {
        setTasks((prev) => {
            const newTasks = { ...prev };
            newTasks[date] = newTasks[date].filter(task => task.id !== taskId);
            return newTasks;
        });
    };

    const toggleTask = (date: string, taskId: number) => {
        setTasks((prev) => {
            const newTasks = { ...prev };
            newTasks[date] = newTasks[date].map(task =>
                task.id === taskId ? { ...task, completed: !task.completed } : task
            );
            return newTasks;
        });
    };

    return (
        <TaskContext.Provider value={{ tasks, addTask, removeTask, toggleTask }}>
            {children}
        </TaskContext.Provider>
    );
};

export const useTaskContext = () => {
    const context = useContext(TaskContext);
    if (!context) {
        throw new Error("useTaskContext must be used within a TaskProvider");
    }
    return context;
};