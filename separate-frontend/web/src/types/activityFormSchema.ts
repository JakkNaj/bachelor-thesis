import * as yup from 'yup';
import { ActivityInput, PostApiActivitiesTripTripIdBody } from '../api/generated/schemas';

export type TActivityFormData = {
  title: string;
  description?: string;
  startTime: string;
  endTime?: string;
  type: string;
};

export const createActivitySchema = (tripStartDate: string, tripEndDate: string) => {
  return yup.object({
    title: yup.string().required('Title is required'),
    description: yup.string(),
    startTime: yup
      .string()
      .required('Start time is required')
      .test('is-within-trip-dates', 'Activity must be within trip dates', (value) => {
        if (!value) return false;
        const activityStart = new Date(value);
        const tripStart = new Date(tripStartDate);
        const tripEnd = new Date(tripEndDate);
        return activityStart >= tripStart && activityStart <= tripEnd;
      }),
    endTime: yup
      .string()
      .test('is-after-start', 'End time must be after start time', function(value) {
        if (!value) return true;
        const startTime = this.parent.startTime;
        if (!startTime) return true;
        return new Date(value) > new Date(startTime);
      })
      .test('is-within-trip-dates', 'Activity must end within trip dates', function(value) {
        if (!value) return true;
        const activityEnd = new Date(value);
        const tripEnd = new Date(tripEndDate);
        return activityEnd <= tripEnd;
      }),
    type: yup.string().required('Activity type is required')
  }) as yup.ObjectSchema<TActivityFormData>;
};

export const transformFormDataToActivityInput = (data: TActivityFormData): PostApiActivitiesTripTripIdBody => {
  return {
    title: data.title,
    description: data.description,
    startTime: data.startTime,
    endTime: data.endTime,
    type: data.type
  };
};
