import { useState, useEffect } from 'react';
import { SplitDateTimePicker } from './SplitDateTimePicker';

export type TDateTimePickerProps = {
    value?: string;
    onChange?: (value: string) => void;
    error?: {
        date?: string;
        time?: string;
    };
    placeholder?: {
        date: string;
        time: string;
    };
};

export const DateTimePicker = ({
    value,
    onChange,
    error,
    placeholder = { date: 'Select date', time: 'Select time' },
}: TDateTimePickerProps) => {
    const [date, setDate] = useState<string>('');
    const [time, setTime] = useState<string>('');

    useEffect(() => {
        if (value) {
            const [datePart, timePart] = value.split('T');
            setDate(datePart);
            setTime(timePart);
        }
    }, [value]);

    const handleDateChange = (newDate: string) => {
        setDate(newDate);
        if (time) {
            onChange?.(`${newDate}T${time}`);
        }
    };

    const handleTimeChange = (newTime: string) => {
        setTime(newTime);
        if (date) {
            onChange?.(`${date}T${newTime}`);
        }
    };

    return (
        <SplitDateTimePicker
            date={date}
            time={time}
            onDateChange={handleDateChange}
            onTimeChange={handleTimeChange}
            error={error}
            placeholder={placeholder}
        />
    );
};
