import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ToastController } from '@ionic/angular';
import { Pet, PetsService } from '../services/pets.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class HomePage {
  pets: Pet[] = [];

  constructor(private petsService: PetsService) {}

  getStatusLabel(status: string): string {
    return this.petsService.getStatusLabel(status);
  }

  ngOnInit() {
    this.pets = this.petsService.getAll();
    console.log('====================================');
    console.log(this.pets);
    console.log('====================================');
  }
}
