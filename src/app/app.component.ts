import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ParkingSlotRequestComponent } from "./parking-slot-form.component/parking-slot-form.component";
import { ParkingLotComponent } from './parking-lot/parking-lot.component';
import { Vehicle } from './models/vehicle';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ParkingSlotRequestComponent, ParkingLotComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'parking-lot';
  vehicles: Vehicle[] = [];
  viewForm = false;

  onVehicleRegistered(vehicle: Vehicle) {
    console.log('Vehículo recibido en AppComponent:', vehicle);
    this.vehicles.push(vehicle); 
    this.viewForm = false;
  }

  showForm() {
    this.viewForm = true; 
  }

  hideForm(){
    this.viewForm = false;
  }
}
