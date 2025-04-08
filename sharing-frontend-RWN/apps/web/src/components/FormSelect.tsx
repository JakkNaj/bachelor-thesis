import { Select } from '@monorepo/shared/src/components/Select/Select';
import { TSelectItem } from '@monorepo/shared/src/components/Select/Select.types';
import { useState } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

type TFormSelectProps = {
	id?: string;
	items: TSelectItem[];
	error?: string;
	register: UseFormRegisterReturn;
};

export const FormSelect = ({ id, items, error, register }: TFormSelectProps) => {
	const [value, setValue] = useState('');

	// Handle the onChange event from react-hook-form
	const handleChange = (newValue: string) => {
		setValue(newValue);
		// Create a synthetic event object that react-hook-form expects
		register.onChange({
			target: { value: newValue, name: register.name },
		});
	};

	return <Select id={id} value={value} onValueChange={handleChange} items={items} error={error} />;
};
