import { Injectable } from '@angular/core';

export interface Pet {
  id: number;
  name: string;
  latitude: string;
  longitude: string;
  date: Date;
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
      id: 1,
      name: 'Choupi',
      status: 'lost',
      latitude: '48.8566',
      longitude: '2.3522',
      type: 'Chat',
      date: new Date(2023, 8, 27),
      photoUrl: '../../assets/images/1.jpg',
    },
    {
      id: 2,
      name: 'Twister',
      status: 'find',
      latitude: '43.7102',
      longitude: '7.2620',
      type: 'Chien',
      date: new Date(2023, 8, 27),
      photoUrl: '../../assets/images/3.jpg',
    },
    {
      id: 3,
      name: 'Poupouille',
      status: 'safe',
      latitude: '45.75',
      longitude: '4.85',
      type: 'Chien',
      date: new Date(2023, 8, 27),
      photoUrl: '../../assets/images/2.jpg',
    },
    {
      id: 4,
      name: 'Petit Papa',
      status: 'deceased',
      latitude: '43.2965',
      longitude: '5.3698',
      type: 'Autres',
      date: new Date(2023, 8, 27),
      photoUrl: '../../assets/images/4.jpg',
    },
  ];

  private maxId: number | undefined;

  constructor() {}

  getAll() {
    return this.pets;
  }

  getMaxId() {
    if (this.pets.length === 0) {
      this.maxId = 1;
    } else {
      this.maxId = Math.max(...this.pets.map((idNumber) => idNumber.id));
    }

    return this.maxId + 1;
  }
  create(newPet: Pet) {
    this.pets.push(newPet);
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

  addPet(newPet: Pet) {
    const newId = this.pets.length + 1;

    newPet.id = newId;

    this.pets.push(newPet);
  }
}
