export const generateColor = (name: string): string => {
	let hash = 0;
	for (let i = 0; i < name.length; i++) {
		hash = name.charCodeAt(i) + ((hash << 5) - hash);
	}
	const hue = Math.abs(hash % 360);
	return `hsl(${hue}, 70%, 80%)`;
};

export const getInitials = (name: string): string => {
	return name
		.split(' ')
		.map(n => n[0])
		.join('')
		.toUpperCase()
		.slice(0, 2);
};