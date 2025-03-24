import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Activity, ActivityInput, PostApiActivitiesTripTripIdBody } from '../api/generated/schemas';
import { Input } from './Input';
import { Button } from './Button';
import { createActivitySchema, TActivityFormData, transformFormDataToActivityInput } from '../types/activityFormSchema';
import { SelectInputNative } from './SelectInputNative';
import { ACTIVITY_TYPE_LABELS } from '../types/activity';
import { EActivityTypes } from '../types/activity';
import { formatDate, formatDateForInput } from '../utils/dateUtils';

type TActivityFormProps = {
  initialData?: Activity;
  onSubmit: (data: PostApiActivitiesTripTripIdBody) => void;
  isSubmitting: boolean;
  submitError?: Error | null;
  tripStartDate: string;
  tripEndDate: string;
};

export const ActivityForm = ({
  initialData,
  onSubmit,
  isSubmitting,
  submitError,
  tripStartDate,
  tripEndDate,
}: TActivityFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TActivityFormData>({
    resolver: yupResolver(createActivitySchema(tripStartDate, tripEndDate)),
    defaultValues: initialData
      ? {
          title: initialData.title,
          description: initialData.description,
          startTime: formatDateForInput(initialData.startTime),
          endTime: initialData.endTime ? formatDateForInput(initialData.endTime) : undefined,
          type: initialData.type
        }
      : {
          startTime: formatDateForInput(tripStartDate)
        },
  });

  const onSubmitForm = (data: TActivityFormData) => {
    onSubmit(transformFormDataToActivityInput(data));
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
            Activity Title*
          </label>
          <Input
            id="title"
            type="text"
            {...register('title')}
            error={errors.title?.message}
          />
        </div>

        <div>
          <label htmlFor="type" className="block text-sm font-medium text-slate-700 mb-1">
            Activity Type*
          </label>
          <SelectInputNative
            id="type"
            {...register('type')}
            error={errors.type?.message}
          >
            <option value="">Select a type</option>
            {Object.values(EActivityTypes).map((type) => (
              <option key={type} value={type}>
                {ACTIVITY_TYPE_LABELS[type]}
              </option>
            ))}
          </SelectInputNative>
        </div>

        <div className="text-xs text-slate-500 mb-1">
              Trip dates: {formatDate(tripStartDate)} - {formatDate(tripEndDate)}
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="startTime" className="block text-sm font-medium text-slate-700 mb-1">
              Start Time*
            </label>
            <input
              id="startTime"
              type="datetime-local"
              min={tripStartDate}
              max={tripEndDate}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-200"
              {...register('startTime')}
            />
            {errors.startTime && (
              <p className="mt-1 text-sm text-red-500">{errors.startTime.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="endTime" className="block text-sm font-medium text-slate-700 mb-1">
              End Time (Optional)
            </label>
            <input
              id="endTime"
              type="datetime-local"
              min={tripStartDate}
              max={tripEndDate}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-200"
              {...register('endTime')}
            />
            {errors.endTime && (
              <p className="mt-1 text-sm text-red-500">{errors.endTime.message}</p>
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
            ? 'Update Activity'
            : 'Add Activity'}
        </Button>
      </div>
    </form>
  );
}; 