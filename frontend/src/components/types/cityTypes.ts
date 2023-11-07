export type City = {
    id: number;
    cityName: string;
    count: string;
  };
  
export type CityData = {
    cities: [City];
    currentPage: number;
    totalItems: number;
    totalPages: number;
  };

export type CityState = {
    loading: boolean;
    cities: City[]; 
    error: string | null;
  }
  