export type TDateTimePickerProps = {
    date?: string;
    time?: string;
    onDateChange?: (date: string) => void;
    onTimeChange?: (time: string) => void;
    error?: {
        date?: string;
        time?: string;
    };
    placeholder?: {
        date?: string;
        time?: string;
    };
};