import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { Pet, PetsService } from '../services/pets.service';

@Component({
  selector: 'app-pet-details',
  templateUrl: './pet-details.page.html',
  styleUrls: ['./pet-details.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class PetDetailsPage implements OnInit {
  pet: Pet | undefined;

  constructor(
    private activatedRoute: ActivatedRoute,
    public petsService: PetsService,
    private router: Router
  ) {}

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params) => {
      const idString = params['id']; // Récupère l'ID sous forme de chaîne
      const id = Number(idString);
      this.pet = this.petsService.getPetById(id);
      console.log(this.pet);
    });
  }

  showOnMap(pet: Pet) {
    this.router.navigate(['/map'], {
      queryParams: { lat: pet.latitude, lng: pet.longitude, view: 'map' },
    });
  }
}
