import { Injectable } from '@angular/core';

export interface Pet {
  id: string;
  name: string;
  location: string;
  date: string;
  type: string;
  status: 'lost' | 'find' | 'deceased' | 'hurt' | 'safe';
  sexe?: string;
  race?: string;
  phoneNumber?: string;
  photoUrl?: string;
  informations?: string;
}

@Injectable({
  providedIn: 'root',
})
export class PetsService {
  private pets: Pet[] = [
    {
      id: '1',
      name: 'Choupi',
      status: 'lost',
      location: 'Paris',
      type: 'Chat',
      date: '27/09/2023',
      photoUrl: '../../assets/images/1.jpg',
    },
    {
      id: '2',
      name: 'Twister',
      status: 'find',
      location: 'Montpellier',
      type: 'Chien',
      date: '24/01/2023',
      photoUrl: '../../assets/images/3.jpg',
    },
    {
      id: '3',
      name: 'Poupouille',
      status: 'safe',
      location: 'Béziers',
      type: 'Chien',
      date: '26/07/2023',
      photoUrl: '../../assets/images/2.jpg',
    },
    {
      id: '4',
      name: 'Petit Papa',
      status: 'deceased',
      location: 'Montpellier',
      type: 'Autres',
      date: '31/09/2022',
      photoUrl: '../../assets/images/4.jpg',
    },
  ];

  getAll() {
    return this.pets;
  }

  getStatusLabel(status: string): string {
    switch (status) {
      case 'lost':
        return 'Perdu';
      case 'find':
        return 'Trouvé';
      case 'deceased':
        return 'Trouvé décédé';
      case 'hurt':
        return 'Trouvé blessé';
      case 'safe':
        return 'A retrouvé sa famille ❤';
      default:
        return 'Aucun status';
    }
  }
}
