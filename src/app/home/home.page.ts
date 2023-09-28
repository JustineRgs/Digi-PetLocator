import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ToastController } from '@ionic/angular';
import { Pet, PetsService } from '../services/pets.service';
import { Geolocation } from '@capacitor/geolocation';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class HomePage {
  pets: Pet[] = [];

  constructor(private petsService: PetsService) {}

  getStatusLabel(status: string): string {
    return this.petsService.getStatusLabel(status);
  }

  async activateLocation() {
    const coordinates = await Geolocation.getCurrentPosition();
    console.log('Latitude', coordinates.coords.latitude);
    console.log('Longitude', coordinates.coords.longitude);
  }

  ngOnInit() {
    this.pets = this.petsService.getAll();
  }
}
