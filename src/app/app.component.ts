import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';

export interface Page {
  title: string;
  url: string;
  icon: string;
}

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [IonicModule, RouterLink, CommonModule],
})
export class AppComponent {
  appPages: Page[] = [
    {
      title: 'Accueil',
      url: '/home',
      icon: 'home',
    },
    {
      title: 'Carte',
      url: '/map',
      icon: 'navigate-circle-outline',
    },
    {
      title: 'Compte',
      url: '/account',
      icon: 'people',
    },
  ];
  currentPage: string = ''; // Pour suivre la page active

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentPage = event.url; // Mettre à jour la page active
      }
    });
  }
}
