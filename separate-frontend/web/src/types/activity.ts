export enum EActivityTypes {
  ACCOMMODATION = 'ACCOMMODATION',
  TRANSPORTATION = 'TRANSPORTATION',
  FOOD = 'FOOD',
  ATTRACTION = 'ATTRACTION',
  OTHER = 'OTHER'
}

export const ACTIVITY_TYPE_LABELS: Record<EActivityTypes, string> = {
  [EActivityTypes.ACCOMMODATION]: 'Accommodation',
  [EActivityTypes.TRANSPORTATION]: 'Transportation', 
  [EActivityTypes.FOOD]: 'Food & Dining',
  [EActivityTypes.ATTRACTION]: 'Attraction',
  [EActivityTypes.OTHER]: 'Other'
};