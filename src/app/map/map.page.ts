import {
  Component,
  ViewChild,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  OnDestroy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Geolocation } from '@capacitor/geolocation';
import { GoogleMap, Marker } from '@capacitor/google-maps';
import { Pet, PetsService } from '../services/pets.service';
import { ActivatedRoute, Router } from '@angular/router';

const mapsKey = 'AIzaSyDFLOS5QXRRor92xNwgqy5-aayAmWpno9Q';
@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [IonicModule, CommonModule, FormsModule],
})
export class MapPage implements OnDestroy {
  @ViewChild('map') mapRef!: ElementRef;
  map!: GoogleMap;
  viewMode: 'list' | 'map' = 'map';
  pets: Pet[] = [];

  constructor(
    public petsService: PetsService,
    private route: ActivatedRoute,
    private router: Router
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

  ionViewWillLeave() {
    if (this.map) {
      this.map.destroy();
    }
  }

  ngOnDestroy() {
    if (this.map) {
      this.map.destroy();
    }
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
      apiKey: mapsKey,
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

      this.map.setOnMarkerClickListener();

      await this.map.addMarker(marker);
      return Promise.resolve();
    });
  }

  async activateLocation() {
    try {
      await Geolocation.checkPermissions();
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
}
