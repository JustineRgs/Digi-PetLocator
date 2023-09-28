import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ToastController } from '@ionic/angular';
import { Pet, PetsService } from '../services/pets.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class HomePage {
  pets: Pet[] = [];

  constructor(private petsService: PetsService, private router: Router) {}

  getStatusLabel(status: string): string {
    return this.petsService.getStatusLabel(status);
  }

  formatDateString(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }
  showOnMap(pet: Pet) {
    // Utilisez le Router pour naviguer vers la page /map avec les coordonnées de l'animal
    this.router.navigate(['/map'], {
      queryParams: { lat: pet.latitude, lng: pet.longitude },
    });
  }
  ngOnInit() {
    this.pets = this.petsService.getAll();
    console.log(this.pets);
  }
}
