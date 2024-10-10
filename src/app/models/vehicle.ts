export interface Brand {
    id: number;
    name: string;
  }
  
  export interface Vehicle {
    model: string;
    domain: string;
    checkInTime: string;
    brand: Brand;
    vehicleType: VehiculeType;
    isNewDomain: boolean;
  }
  
  export interface ParkingSlot {
    vehicules: VehiculeType[];
    availablePlaces: number;
    totalPlaces: number;
  }
  
  export enum VehiculeType {
    MOTORCYCLE = 1,
    CAR = 2,
    TRUCK = 3,
  }