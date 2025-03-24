export const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
};

export const formatTime = (time: string) => {
    return new Date(time).toLocaleString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: false
    });
};

export const formatDateForInput = (date: string) => {
    return new Date(date).toISOString().slice(0, 16); 
};
