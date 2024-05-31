import { useState } from 'react';
import { Day } from './Day';
import { Modal } from '../Modal/Modal';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, addMonths, subMonths } from 'date-fns';
import styles from './Calendar.module.scss';

export const Calendar = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDay, setSelectedDay] = useState<number | null>(null);

    const start = startOfMonth(currentDate);
    const end = endOfMonth(currentDate);
    const days = eachDayOfInterval({ start, end });

    const handlePrevMonth = () => {
        setCurrentDate(subMonths(currentDate, 1));
    };

    const handleNextMonth = () => {
        setCurrentDate(addMonths(currentDate, 1));
    };

    return (
        <div className={styles.calendarContainer}>
            <h1>Wellcome to todo-Calendar</h1>

            <header className={styles.header}>
                <button onClick={handlePrevMonth}>Previous</button>
                <h2>{format(currentDate, 'MMMM yyyy')}</h2>
                <button onClick={handleNextMonth}>Next</button>
            </header>
            <div className={styles.calendar}>
                {days.map(day => (
                    <Day key={day.toString()} day={day.getDate()} onClick={() => setSelectedDay(day.getDate())} />
                ))}
            </div>
            {selectedDay && <Modal day={selectedDay} onClose={() => setSelectedDay(null)} />}
        </div>
    );
};
