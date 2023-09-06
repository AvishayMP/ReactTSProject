export interface Trip {
    id: string;
    name: string;
    destination: string;
    startDate: string;
    endDate: string;
    description: string;
    price: number;
    image: string;
    activities: string[];
  }

export const TripBaseAPI:string='http://localhost:3000/api/trips';