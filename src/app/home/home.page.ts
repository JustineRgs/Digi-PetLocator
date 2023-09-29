import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
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

  // Mise en forme du statut
  getStatusLabel(status: string): string {
    return this.petsService.getStatusLabel(status);
  }

  // Affichage de l'animal sur la map
  showOnMap(pet: Pet) {
    this.router.navigate(['/map'], {
      queryParams: { lat: pet.latitude, lng: pet.longitude },
    });
  }

  // Redirection de la fiche de l'animal
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
