import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { PetsService, Pet } from '../services/pets.service';
import { FormsModule } from '@angular/forms';
import { format } from 'date-fns';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class AccountPage implements OnInit {
  newPet: Pet;

  constructor(private petService: PetsService) {
    const currentDate = new Date();
    this.newPet = {
      id: this.petService.getMaxId(),
      name: '',
      date: new Date(),
      type: '',
      latitude: '',
      longitude: '',
      status: 'lost',
      sexe: '',
      race: '',
      phoneNumber: '',
      photoUrl: '',
      informations: '',
    };
  }

  ngOnInit() {
    // Vous pouvez supprimer cette ligne car la création est déjà faite dans le constructeur
    this.newPet = {
      id: this.petService.getMaxId(),
      name: '',
      date: new Date(),
      type: '',
      latitude: '',
      longitude: '',
      status: 'lost',
      sexe: '',
      race: '',
      phoneNumber: '',
      photoUrl: '',
      informations: '',
    };
  }

  handleCreate() {
    this.petService.create(this.newPet);
  }
}
