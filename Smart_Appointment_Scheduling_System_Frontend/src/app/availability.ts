export interface Availability {
  id: number;
  availableFrom: string; // or Date if you parse it as a Date
  availableTo: string; // or Date if you parse it as a Date
  providerId: number;
}
