import {
  Component,
  ViewChild,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Geolocation } from '@capacitor/geolocation';
import { GoogleMap, Marker } from '@capacitor/google-maps';
import { environment } from 'src/environments/environment';
import { Pet, PetsService } from '../services/pets.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [IonicModule, CommonModule, FormsModule],
})
export class MapPage {
  @ViewChild('map') mapRef!: ElementRef;
  map!: GoogleMap;
  viewMode: 'list' | 'map' = 'map';
  pets: Pet[] = [];

  constructor(
    private petsService: PetsService,
    private route: ActivatedRoute
  ) {}

  ionViewDidEnter() {
    this.createMap().then(() => {
      const queryParams = this.route.snapshot.queryParams;
      const lat = parseFloat(queryParams['lat']);
      const lng = parseFloat(queryParams['lng']);

      if (!isNaN(lat) && !isNaN(lng)) {
        this.zoomToLocation(lat, lng);
      }
    });
  }

  ngOnInit() {
    this.pets = this.petsService.getAll();
  }
  async createMap() {
    const mapOptions = {
      config: {
        center: {
          lat: 46.232193,
          lng: 2.209667,
        },
        zoom: 5,
      },
    };

    this.map = await GoogleMap.create({
      id: 'map',
      apiKey: environment.mapsKey,
      element: this.mapRef.nativeElement,
      forceCreate: true,
      ...mapOptions,
    });

    this.pets.forEach(async (pet) => {
      const marker: Marker = {
        coordinate: {
          lat: parseFloat(pet.latitude),
          lng: parseFloat(pet.longitude),
        },
        title: pet.name,
      };
      // Personnalisez les marqueurs en fonction du statut de l'animal
      if (pet.status === 'lost') {
        marker.iconUrl = '../../assets/markers/lost.png';
      } else if (pet.status === 'find') {
        marker.iconUrl = '../../assets/markers/find.png';
      } else if (pet.status === 'safe') {
        marker.iconUrl = '../../assets/markers/safe.png';
      } else if (pet.status === 'deceased') {
        marker.iconUrl = '../../assets/markers/deceased.png';
      } else if (pet.status === 'hurt') {
        marker.iconUrl = '../../assets/markers/hurt.png';
      }
      marker.iconAnchor = { x: 13, y: 32 };

      await this.map.addMarker(marker);
      return Promise.resolve();
    });
  }

  async activateLocation() {
    try {
      const position = await Geolocation.getCurrentPosition();

      const lat = position.coords.latitude;
      const lng = position.coords.longitude;

      await this.map.setCamera({
        coordinate: { lat, lng },
        zoom: 8,
      });
    } catch (error) {
      console.error("Erreur lors de l'obtention de la position", error);
    }
  }

  zoomToLocation(lat: number, lng: number) {
    this.map.setCamera({
      coordinate: { lat, lng },
      zoom: 15,
    });
  }
}
