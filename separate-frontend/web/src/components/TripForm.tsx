import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Trip, TripInput } from '../api/generated/schemas';

type TTripFormProps = {
  initialData?: Trip;
  onSubmit: (data: TripInput) => void;
  isSubmitting: boolean;
  submitError?: Error | null;
};

const tripSchema = yup.object({
  title: yup.string().required('Title is required'),
  description: yup.string(),
  startDate: yup.string().required('Start date is required'),
  endDate: yup
    .string()
    .required('End date is required')
    .test(
      'is-after-start-date',
      'End date must be after start date',
      function (endDate) {
        const { startDate } = this.parent;
        if (!startDate || !endDate) return true;
        return new Date(endDate) >= new Date(startDate);
      }
    ),
  destination: yup.string(),
});

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
  } = useForm<TripInput>({
    resolver: yupResolver(tripSchema),
    defaultValues: initialData
      ? {
          title: initialData.title,
          description: initialData.description,
          startDate: initialData.startDate,
          endDate: initialData.endDate,
        }
      : undefined,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="trip-form">
      {submitError && (
        <div className="error-message">
          {submitError instanceof Error
            ? submitError.message
            : 'An error occurred'}
        </div>
      )}

      <div className="form-group">
        <label htmlFor="title">Trip Title*</label>
        <input id="title" type="text" {...register('title')} />
        {errors.title && <p className="error">{errors.title.message}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="destination">Destination</label>
        <input id="destination" type="text" {...register('destination')} />
        {errors.destination && (
          <p className="error">{errors.destination.message}</p>
        )}
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="startDate">Start Date*</label>
          <input id="startDate" type="date" {...register('startDate')} />
          {errors.startDate && (
            <p className="error">{errors.startDate.message}</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="endDate">End Date*</label>
          <input id="endDate" type="date" {...register('endDate')} />
          {errors.endDate && <p className="error">{errors.endDate.message}</p>}
        </div>
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
          {isSubmitting ? 'Saving...' : initialData ? 'Update Trip' : 'Create Trip'}
        </button>
      </div>
    </form>
  );
}; 