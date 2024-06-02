import styles from './Day.module.scss';

interface DayProps {
    day: number;
    isWeekend: boolean;
    hasTasks: boolean;
    isToday: Boolean;
    onClick: () => void;
}

export const Day = ({ day, isWeekend, hasTasks, isToday, onClick }: DayProps) => {
    const dayClasses = [styles.day];

    if (isWeekend) dayClasses.push(styles.weekend);
    if (isToday) dayClasses.push(styles.today);
    if (hasTasks) dayClasses.push(styles.hasTasks);

    return (
        <div className={dayClasses.join(' ')} onClick={onClick}>
            {day}
        </div>
    );
};
