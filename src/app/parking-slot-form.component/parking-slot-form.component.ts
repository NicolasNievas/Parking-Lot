import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { MiscellaneousService } from '../services/data/miscellaneous.service';
import { Brand, Vehicle, VehiculeType } from '../models/vehicle';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-parking-slot-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './parking-slot-form.component.html',
  styleUrl: './parking-slot-form.component.css',
})
export class ParkingSlotRequestComponent implements OnInit{
  @Output() closeForm = new EventEmitter<void>();
  @Output() vehicleRegistered = new EventEmitter<Vehicle>();

  private miscellanousService = inject(MiscellaneousService);
  brands: Brand[] = [];
  vehiculeTypes = [
    { id: VehiculeType.MOTORCYCLE, name: 'Motocicleta' },
    { id: VehiculeType.CAR, name: 'Auto' },
    { id: VehiculeType.TRUCK, name: 'Camioneta' }
  ];

  vehicle: Vehicle = {
    model: '',
    domain: '',
    checkInTime: this.getCurrentTime(),
    brand: { id: -1, name: '' },
    vehicleType: VehiculeType.CAR,
    isNewDomain: false
  };
  
  ngOnInit() {
    this.brands = this.miscellanousService.getBrands();
  }

  cancel(){
    this.closeForm.emit();
    console.log('Formulario cancelado', this.vehicle);
  }

  sendVehicle(vehicleForm: NgForm) {
    if (vehicleForm.valid && this.vehicle.brand.id !== -1 && this.vehicle.checkInTime) {
      console.log('Vehiculo registrado', this.vehicle);
      this.vehicleRegistered.emit(this.vehicle);
      alert('Vehiculo registrado');
    } else {
      console.log('Formulario invalido', this.vehicle);
      alert('Formulario invalido');
    }
  }

  getCurrentTime(): string {
    const now = new Date();
    return `${now.getHours()}:${now.getMinutes()}`;
  }

}
