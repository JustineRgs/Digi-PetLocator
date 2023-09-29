import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertController, IonicModule } from '@ionic/angular';
import { PetsService, Pet } from '../services/pets.service';
import { FormsModule } from '@angular/forms';
import { ToastController, ActionSheetController } from '@ionic/angular';
import { Geolocation } from '@capacitor/geolocation';
import { Camera, CameraResultType } from '@capacitor/camera';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class AccountPage implements OnInit {
  private actionSheetController: ActionSheetController = inject(
    ActionSheetController
  );
  private alertController: AlertController = inject(AlertController);
  pets!: Pet[];
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
      idUnique: 0,
      phoneNumber: '',
      photoUrl: '',
      informations: '',
    };
    this.alerts;
    this.pets = this.petService.getAll();
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
        idUnique: 0,
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

  async handlePhoto() {
    const image = await Camera.getPhoto({
      quality: 90,
      resultType: CameraResultType.Uri,
    });

    this.newPet.photoUrl = image.webPath;
    console.log(image.webPath);
  }

  async presentActionSheet(pet: Pet) {
    const actionSheet = await this.actionSheetController.create({
      header: `${pet.name}`,
      buttons: [
        {
          text: 'Supprimer',
          icon: 'trash',
          role: 'destructive',
          handler: () => {
            this.presentDeleteAlert(pet);
          },
        },

        {
          text: 'Annuler',
          icon: 'close',
          role: 'cancel',
          handler: () => {},
        },
      ],
    });
    actionSheet.present();
  }
  async presentDeleteAlert(pet: Pet) {
    const alert = await this.alertController.create({
      header: 'Supprimer cet annonce ?',
      subHeader: `${pet.name}`,
      message: 'Cette opération ne pourra être annulée.',
      buttons: [
        {
          text: 'Supprimer',
          handler: () => this.deletePet(pet),
        },
        {
          text: 'Finalement, non!',
          role: 'cancel',
        },
      ],
    });
    alert.present();
  }
  async presentToast(pet: Pet) {
    const toast = await this.toastController.create({
      message: `${pet.name} a été supprimé.`,
      position: 'top',
      duration: 3000,
    });
    toast.present();
  }

  deletePet(pet: Pet) {
    this.alerts = this.alerts.filter((s) => s.id !== pet.id);
    console.log(pet.id);
    this.presentToast(pet);
  }
}
