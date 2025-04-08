export type TSelectItem = {
	label: string;
	value: string;
};

export type TSelectProps = {
	value: string;
	onValueChange: (value: string) => void;
	items: Array<TSelectItem>;
	placeholder?: string;
	error?: string;
	closeOnSelect?: boolean;
	id?: string;
};
