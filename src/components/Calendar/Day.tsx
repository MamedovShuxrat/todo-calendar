import styles from './Day.module.scss';

interface DayProps {
    day: number;
    onClick: () => void;
}

export const Day = ({ day, onClick }: DayProps) => {
    return (
        <div className={styles.day} onClick={onClick}>
            {day}
        </div>
    );
};