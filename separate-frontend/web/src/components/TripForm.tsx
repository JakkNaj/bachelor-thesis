import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Trip, TripInput } from '../api/generated/schemas';
import { Input } from './Input';
import { Button } from './Button';
import { 
  TTripFormData, 
  tripFormSchema, 
  transformFormDataToTripInput 
} from '../types/tripFormSchema';
import { formatDateForInput } from '../utils/dateUtils';

type TTripFormProps = {
  initialData?: Trip;
  onSubmit: (data: TripInput) => void;
  isSubmitting: boolean;
  submitError?: Error | null;
};

export const TripForm = ({
  initialData,
  onSubmit,
  isSubmitting,
  submitError,
}: TTripFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TTripFormData>({
    resolver: yupResolver(tripFormSchema),
    defaultValues: initialData
      ? {
          title: initialData.title,
          description: initialData.description,
          startDate: formatDateForInput(initialData.startDate),
          endDate: formatDateForInput(initialData.endDate),
        }
      : undefined,
  });

  const onSubmitForm = (data: TTripFormData) => {
    onSubmit(transformFormDataToTripInput(data));
  };

  return (
    <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-6">
      {submitError && (
        <div className="p-3 text-sm text-red-500 bg-red-50 rounded-lg">
          {submitError instanceof Error ? submitError.message : 'An error occurred'}
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-slate-700 mb-1">
            Trip Title*
          </label>
          <Input
            id="title"
            type="text"
            {...register('title')}
            error={errors.title?.message}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="startDate" className="block text-sm font-medium text-slate-700 mb-1">
              Start Date*
            </label>
            <input
              id="startDate"
              type="datetime-local"
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-200"
              {...register('startDate')}
            />
            {errors.startDate && (
              <p className="mt-1 text-sm text-red-500">{errors.startDate.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="endDate" className="block text-sm font-medium text-slate-700 mb-1">
              End Date*
            </label>
            <input
              id="endDate"
              type="datetime-local"
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-200"
              {...register('endDate')}
            />
            {errors.endDate && (
              <p className="mt-1 text-sm text-red-500">{errors.endDate.message}</p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-slate-700 mb-1">
            Description
          </label>
          <textarea
            id="description"
            rows={4}
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-200"
            {...register('description')}
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-500">{errors.description.message}</p>
          )}
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <Button
          type="submit"
          variant="primary"
          disabled={isSubmitting}
        >
          {isSubmitting
            ? 'Saving...'
            : initialData
            ? 'Update Trip'
            : 'Create Trip'}
        </Button>
      </div>
    </form>
  );
}; 