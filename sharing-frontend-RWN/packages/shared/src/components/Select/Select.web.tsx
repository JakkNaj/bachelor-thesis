import { TSelectProps } from './Select.types';

export const Select = ({
	value,
	onValueChange,
	items,
	placeholder,
	error,
	closeOnSelect = true,
	id,
}: TSelectProps) => {
	return (
		<div>
			<select
				id={id}
				value={value}
				onChange={e => onValueChange(e.target.value)}
				style={{
					padding: '12px',
					borderRadius: '8px',
					border: error ? '1px solid red' : '1px solid #ccc',
					width: '100%',
					fontSize: '16px',
				}}
			>
				{placeholder && (
					<option value="" disabled>
						{placeholder}
					</option>
				)}
				{items.map(item => (
					<option key={item.value} value={item.value}>
						{item.label}
					</option>
				))}
			</select>
			{error && <div style={{ color: 'red', fontSize: '14px', marginTop: '4px' }}>{error}</div>}
		</div>
	);
};
