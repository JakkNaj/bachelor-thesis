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