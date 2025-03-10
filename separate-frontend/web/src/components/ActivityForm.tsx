import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Activity, ActivityInput } from '../api/generated/schemas';

type TActivityFormProps = {
  initialData?: Activity;
  onSubmit: (data: ActivityInput) => void;
  isSubmitting: boolean;
  submitError?: Error | null;
  tripStartDate?: string;
  tripEndDate?: string;
};

const createActivitySchema = (startDate?: string, endDate?: string) => {
  return yup.object({
    title: yup.string().required('Title is required'),
    description: yup.string(),
    date: yup
      .string()
      .required('Date is required')
      .test('is-within-trip-dates', 'Date must be within trip dates', function (date) {
        if (!startDate || !endDate || !date) return true;
        const activityDate = new Date(date);
        const tripStartDate = new Date(startDate);
        const tripEndDate = new Date(endDate);
        return activityDate >= tripStartDate && activityDate <= tripEndDate;
      }),
    time: yup.string(),
    location: yup.string(),
    cost: yup
      .number()
      .transform((value) => (isNaN(value) ? undefined : value))
      .optional(),
  });
};

export const ActivityForm = ({
  initialData,
  onSubmit,
  isSubmitting,
  submitError,
  tripStartDate,
  tripEndDate,
}: TActivityFormProps) => {
  const activitySchema = createActivitySchema(tripStartDate, tripEndDate);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ActivityInput>({
    resolver: yupResolver(activitySchema),
    defaultValues: initialData
      ? {
          title: initialData.title,
          description: initialData.description,
          date: initialData.date,
          location: initialData.location,
        }
      : undefined,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="activity-form">
      {submitError && (
        <div className="error-message">
          {submitError instanceof Error
            ? submitError.message
            : 'An error occurred'}
        </div>
      )}

      <div className="form-group">
        <label htmlFor="title">Activity Title*</label>
        <input id="title" type="text" {...register('title')} />
        {errors.title && <p className="error">{errors.title.message}</p>}
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="date">Date*</label>
          <input id="date" type="date" {...register('date')} />
          {errors.date && <p className="error">{errors.date.message}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="time">Time</label>
          <input id="time" type="time" {...register('time')} />
          {errors.time && <p className="error">{errors.time.message}</p>}
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="location">Location</label>
        <input id="location" type="text" {...register('location')} />
        {errors.location && <p className="error">{errors.location.message}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="cost">Cost</label>
        <input
          id="cost"
          type="number"
          step="0.01"
          {...register('cost')}
        />
        {errors.cost && <p className="error">{errors.cost.message}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          rows={4}
          {...register('description')}
        ></textarea>
        {errors.description && (
          <p className="error">{errors.description.message}</p>
        )}
      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
          {isSubmitting
            ? 'Saving...'
            : initialData
            ? 'Update Activity'
            : 'Add Activity'}
        </button>
      </div>
    </form>
  );
}; 