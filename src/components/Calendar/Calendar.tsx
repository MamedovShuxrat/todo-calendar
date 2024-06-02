import { useState } from 'react';
import { Day } from './Day';
import { Modal } from '../Modal/Modal';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, addMonths, subMonths, getDay, isWeekend } from 'date-fns';
import { useTaskContext } from '../../contexts/TaskContext';
import styles from './Calendar.module.scss';

const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export const Calendar = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const { tasks } = useTaskContext();

    const start = startOfMonth(currentDate);
    const end = endOfMonth(currentDate);
    const days = eachDayOfInterval({ start, end });

    const firstDayOfWeek = getDay(start);
    const emptyDays = Array.from({ length: firstDayOfWeek }, (_, i) => i);

    const handlePrevMonth = () => {
        setCurrentDate(subMonths(currentDate, 1));
    };

    const handleNextMonth = () => {
        setCurrentDate(addMonths(currentDate, 1));
    };

    const hasTasksForDate = (day: Date) => {
        const dayString = format(day, 'yyyy-MM-dd');
        return !!tasks[dayString]?.length;
    };

    const getTasksForDate = (day: Date) => {
        const dayString = format(day, 'yyyy-MM-dd');
        return tasks[dayString] || [];
    };

    return (
        <div className={styles.calendarContainer}>
            <h1 className={styles.calendarTitle}>Welcome to ToDo-Calendar</h1>

            <header className={styles.header}>
                <button className={styles.headerBtn} onClick={handlePrevMonth}>
                    <img src="./arrow-left.svg" alt="arrow-left" />
                </button>
                <h2>{format(currentDate, 'MMMM yyyy')}</h2>
                <button className={styles.headerBtn} onClick={handleNextMonth}>
                    <img style={{ transform: 'rotate(180deg)' }} src="./arrow-left.svg" alt="arrow-right" />
                </button>
            </header>
            <div className={styles.weekDays}>
                {weekDays.map((day) => (
                    <div key={day}
                        className={`${styles.weekDay} ${day === 'Sun' || day === 'Sat' ? styles.weekendDay : ''}`}>
                        {day}
                    </div>
                ))}
            </div>
            <div className={styles.calendar}>
                {emptyDays.map((_, index) => (
                    <div key={index} className={styles.emptyDay}></div>
                ))}
                {days.map(day => (
                    <Day
                        key={day.toString()}
                        day={day.getDate()}
                        isWeekend={isWeekend(day)}
                        hasTasks={hasTasksForDate(day)}
                        onClick={() => setSelectedDate(day)}
                    />
                ))}
            </div>
            {selectedDate && (
                <Modal
                    date={selectedDate}
                    onClose={() => setSelectedDate(null)}
                    tasks={getTasksForDate(selectedDate)}
                />
            )}
        </div>
    );
};

