export const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-GB', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
};

export const formatTime = (time: string) => {
    return new Date(time).toLocaleString('en-GB', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: false
    });
};

export const formatDateForInput = (date: string) => {
    const d = new Date(date);
    const localDate = new Date(d.getTime() - (d.getTimezoneOffset() * 60000));
    return localDate.toISOString().slice(0, 16);
};
