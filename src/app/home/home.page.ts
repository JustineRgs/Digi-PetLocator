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

  constructor(public petsService: PetsService, private router: Router) {}

  getStatusLabel(status: string): string {
    return this.petsService.getStatusLabel(status);
  }

  showOnMap(pet: Pet) {
    this.router.navigate(['/map'], {
      queryParams: { lat: pet.latitude, lng: pet.longitude },
    });
  }

  showPetDetails(pet: Pet) {
    this.router.navigate(['/pet-details'], {
      queryParams: {
        id: pet.id,
      },
    });
  }

  ngOnInit() {
    this.pets = this.petsService.getAll();
  }
}
