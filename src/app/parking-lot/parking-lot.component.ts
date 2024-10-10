import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Vehicle, VehiculeType } from '../models/vehicle';
import { PARKING_LOT } from '../services/data/mock-parking.data';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-parking-lot',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './parking-lot.component.html',
  styleUrl: './parking-lot.component.css'
})
export class ParkingLotComponent implements OnChanges{
  @Input() vehicles: Vehicle[] = [];
  @Output() showForm = new EventEmitter<void>();
  parkingLot = PARKING_LOT;

  ngOnChanges() {
    if (this.vehicles.length > 0) {
      this.assignVehicleToLot(this.vehicles[this.vehicles.length - 1]);
    }
  }  

  getRequiredLots(vehicleType: VehiculeType): number {
    switch (vehicleType) {
      case VehiculeType.MOTORCYCLE:
        return 1;
      case VehiculeType.CAR:
        return 4;
      case VehiculeType.TRUCK:
        return 8;
      default:
        return 0;
    }
  }

  assignVehicleToLot(vehicle: Vehicle) {
    const requiredLots = this.getRequiredLots(vehicle.vehicleType);
    for (let lot of this.parkingLot) {
      if (lot.availablePlaces >= requiredLots) {
        lot.vehicules.push(vehicle.vehicleType); 
        lot.availablePlaces -= requiredLots; 
        return; 
      }
    }
    console.log('No hay espacio suficiente para el vehículo');
    alert('No hay espacio suficiente para el vehículo');
  }
  

  getVehicleIcon(vehicle: VehiculeType): string {
    switch (vehicle) {
      case VehiculeType.MOTORCYCLE:
        return 'bi bi-bicycle';
      case VehiculeType.CAR:
        return 'bi bi-car-front';
      case VehiculeType.TRUCK:
        return 'bi bi-truck-front';
      default:
        return 'bi-question';
    }
  }

  getEmptySpaces(lot: any): number[] {
    return Array(lot.availablePlaces).fill(0);
  }

  newVehicle(){
    this.showForm.emit();
  }
}
