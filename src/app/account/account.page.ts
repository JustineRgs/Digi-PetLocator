import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { PetsService, Pet } from '../services/pets.service';
import { FormsModule } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { Geolocation } from '@capacitor/geolocation';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class AccountPage implements OnInit {
  newPet: Pet;
  alerts: Pet[] = [];
  addOrCancelText: string = 'Ajouter une annonce';
  showForm: boolean = false;

  constructor(
    private petService: PetsService,
    private toastController: ToastController
  ) {
    this.newPet = {
      id: this.petService.getMaxId(),
      name: '',
      date: new Date(),
      type: 'Chien',
      latitude: '',
      longitude: '',
      status: 'lost',
      sexe: 'Mâle',
      race: '',
      phoneNumber: '',
      informations: '',
      photoUrl: '',
    };
  }

  ngOnInit() {
    this.newPet = {
      id: this.petService.getMaxId(),
      name: '',
      date: new Date(),
      type: 'Chien',
      latitude: '',
      longitude: '',
      status: 'lost',
      sexe: 'Mâle',
      race: '',
      phoneNumber: '',
      photoUrl: '',
      informations: '',
    };
    this.alerts;
  }

  async presentAlert(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'top',
    });
    await toast.present();
  }

  async activateLocation() {
    const coordinates = await Geolocation.getCurrentPosition();
    this.newPet.latitude = coordinates.coords.latitude.toString();
    this.newPet.longitude = coordinates.coords.longitude.toString();
  }

  async handleCreate() {
    if (!this.newPet.name || !this.newPet.latitude || !this.newPet.longitude) {
      this.presentAlert('Veuillez remplir tous les champs obligatoires.');
    } else {
      this.newPet.date = new Date(this.newPet.date);
      this.petService.create(this.newPet);
      this.alerts.push(this.newPet);
      this.presentAlert('Alerte créée avec succès.');
      this.newPet = {
        id: this.petService.getMaxId(),
        name: '',
        date: new Date(),
        type: 'Chien',
        latitude: '',
        longitude: '',
        status: 'lost',
        sexe: 'Mâle',
        race: '',
        phoneNumber: '',
        informations: '',
        photoUrl: '',
      };
      this.showForm = false;
      this.addOrCancelText = this.showForm ? 'Annuler' : 'Ajouter une annonce';
    }
  }

  async handleForm() {
    this.showForm = !this.showForm;
    this.addOrCancelText = this.showForm ? 'Annuler' : 'Ajouter une annonce';
  }
}
