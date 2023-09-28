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
import { GoogleMap } from '@capacitor/google-maps';
import { environment } from 'src/environments/environment';
import { LatLng, LatLngBounds, LatLngBoundsLiteral } from 'leaflet';
import { MapBoundsArgs } from '@capacitor/google-maps/dist/typings/implementation';

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

  constructor() {}

  ionViewDidEnter() {
    this.createMap();
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
  }

  async activateLocation() {
    try {
      const position = await Geolocation.getCurrentPosition();

      const lat = position.coords.latitude;
      const lng = position.coords.longitude;

      await this.map.setCamera({
        coordinate: { lat, lng },
        zoom: 15,
      });
    } catch (error) {
      console.error("Erreur lors de l'obtention de la position", error);
    }
  }
}
