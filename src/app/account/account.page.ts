import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertController, IonicModule } from '@ionic/angular';
import { PetsService, Pet } from '../services/pets.service';
import { FormsModule } from '@angular/forms';
import { ToastController, ActionSheetController } from '@ionic/angular';
import { Geolocation } from '@capacitor/geolocation';
import { Camera, CameraResultType } from '@capacitor/camera';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';

interface GeocodeResponse {
  status: string;
  results: {
    formatted_address: string;
  }[];
}

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
  showForm: boolean = false;
  locationAddress: string = '';
  imageUrl: string | undefined = undefined;
  addOrCancelText: string = 'Ajouter une annonce';

  constructor(
    private petService: PetsService,
    private toastController: ToastController,
    private http: HttpClient
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
      sexe: '',
      race: '',
      idUnique: undefined,
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

  // Prise de photo ou upload
  async handlePhoto() {
    const image = await Camera.getPhoto({
      quality: 90,
      resultType: CameraResultType.Uri,
    });

    this.newPet.photoUrl = image.webPath;
    this.imageUrl = image.webPath;
  }

  // Activation de la localisation
  async activateLocation() {
    const coordinates = await Geolocation.getCurrentPosition();
    this.newPet.latitude = coordinates.coords.latitude.toString();
    this.newPet.longitude = coordinates.coords.longitude.toString();

    // Récupération de l'adresse complète
    this.getAddressFromCoordinates(
      this.newPet.latitude,
      this.newPet.longitude
    ).subscribe((address: string) => {
      this.newPet.adress = address;
      this.locationAddress = address;
    });
  }

  // Récupération de l'adresse complète
  getAddressFromCoordinates(
    latitude: string,
    longitude: string
  ): Observable<string> {
    const apiKey = 'AIzaSyDFLOS5QXRRor92xNwgqy5-aayAmWpno9Q';
    const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;

    return this.http.get<GeocodeResponse>(apiUrl).pipe(
      map((response) => {
        if (response.status === 'OK' && response.results.length > 0) {
          return response.results[0].formatted_address;
        }
        return 'Adresse introuvable';
      }),
      catchError((error) => {
        console.error("Erreur lors de la récupération de l'adresse :", error);
        return "Erreur lors de la récupération de l'adresse";
      })
    );
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

  async presentToast(pet: Pet) {
    const toast = await this.toastController.create({
      message: `${pet.name} a été supprimé.`,
      position: 'top',
      duration: 3000,
    });
    toast.present();
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

  deletePet(pet: Pet) {
    this.alerts = this.alerts.filter((s) => s.id !== pet.id);
    this.presentToast(pet);
  }
}
