import { Component } from '@angular/core';
import { CountDownComponent } from '../count-down/count-down.component';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { RouterModule } from '@angular/router';

export interface EventItem {
  id: string;
  title: string;
  description: string;
  date: string;
  badge: string;
  badgeBg: string;
  badgeColor: string;
  category: 'madrassa' | 'evenements' | 'alertes' | 'mre';
  image: string;
  link?: string;
  externalLink?: string;
  hasModal?: boolean;
  modalTarget?: string;
  location?: string;
  time?: string;
  isFeatured?: boolean;
  hasCountdown?: boolean;
}

@Component({
    selector: 'app-events',
    imports: [CountDownComponent, RouterModule, CommonModule],
    templateUrl: './events.component.html',
    styleUrl: '../../../assets/css/style.css'
})
export class EventsComponent {

  message = '';
  imageUrl0 = 'assets/img/blog/election.png';
  imageUrl1 = 'assets/img/blog/Waada.jpg';
  imageUrl2 = 'assets/img/blog/bg_1.jpg';
  imageUrl3 = 'assets/img/mre/Journee_MRE1.jpg';
  imageUrl4 = 'assets/img/voitureCase.jpeg';
  imageUrl5 = 'assets/img/madrassa/Madrassa3.jpeg';
  imageUrl6 = 'assets/img/madrassa/invitation_madrassa_2026.jpg';

  // Progress Gallery Items (Avancement du projet Madrassa)
  activeProgressIndex: number = 0;
  progressGallery = [
    {
      id: 1,
      phase: 'Phase 1 : Concertation & Plans',
      badgeBg: 'rgba(59, 130, 246, 0.15)',
      badgeColor: '#1d4ed8',
      title: 'Présentation des plans par les responsables',
      description: 'Échanges et explications des schémas d\'extension et d\'aménagement avec les habitants et membres du bureau.',
      image: 'assets/img/madrassa/madrassa_avancement_1.jpg'
    },
    {
      id: 2,
      phase: 'Phase 2 : Maquettes & Rendus 3D',
      badgeBg: 'rgba(168, 85, 247, 0.15)',
      badgeColor: '#7e22ce',
      title: 'Panneau d\'exposition des rendus 3D',
      description: 'Vue d\'ensemble des maquettes architecturales du complexe scientifique Doudrar (amphithéâtre, salles et bloc sanitaire).',
      image: 'assets/img/madrassa/madrassa_avancement_2.jpg'
    },
    {
      id: 3,
      phase: 'Phase 3 : Entrée & Architecture',
      badgeBg: 'rgba(245, 158, 11, 0.15)',
      badgeColor: '#b45309',
      title: 'Arcade marocaine traditionnelle',
      description: 'Alliance entre l\'architecture arabo-andalouse séculaire et la modernité des nouvelles infrastructures.',
      image: 'assets/img/madrassa/madrassa_avancement_3.jpg'
    },
    {
      id: 4,
      phase: 'Phase 4 : Salles & Espace d\'Apprentissage',
      badgeBg: 'rgba(34, 197, 94, 0.15)',
      badgeColor: '#15803d',
      title: 'Salle de lecture et de prière en activité',
      description: 'Aménagement intérieur finalisé avec boiseries, moquette et arcades sculptées accueillant les fidèles et étudiants.',
      image: 'assets/img/madrassa/madrassa_avancement_4.jpg'
    },
    {
      id: 5,
      phase: 'Phase 5 : Façade Extérieure & Minaret',
      badgeBg: 'rgba(14, 165, 233, 0.15)',
      badgeColor: '#0369a1',
      title: 'Édifice principal et minaret emblématique',
      description: 'Vue extérieure globale du complexe Madrassa Atika finalisé au centre d\'Arbaa Rasmouka.',
      image: 'assets/img/madrassa/madrassa_avancement_5.jpg'
    }
  ];

  selectProgressPhoto(index: number): void {
    if (index >= 0 && index < this.progressGallery.length) {
      this.activeProgressIndex = index;
    }
  }

  nextProgressPhoto(): void {
    this.activeProgressIndex = (this.activeProgressIndex + 1) % this.progressGallery.length;
  }

  prevProgressPhoto(): void {
    this.activeProgressIndex = (this.activeProgressIndex - 1 + this.progressGallery.length) % this.progressGallery.length;
  }

  // Hero Featured Event
  featuredEvent: EventItem = {
    id: 'madrassa-2026-invitation',
    title: 'Rencontre Annuelle & الموسم الديني السنوي de Madrassa Atika',
    description: 'L\'Association de la Madrassa Scientifique Atika (تتشرف جمعية المدرسة العلمية العتيقة) a le plaisir de vous inviter à assister à la rencontre et au moussem religieux annuel au centre de la commune d\'Arbaa Rasmouka.',
    date: '09 Août 2026 (25 Safar 1448 H)',
    badge: 'Événement Annuel Majeur',
    badgeBg: 'rgba(34, 197, 94, 0.15)',
    badgeColor: '#15803d',
    category: 'madrassa',
    image: 'assets/img/madrassa/invitation_madrassa_2026.jpg',
    hasModal: true,
    modalTarget: '#invitationModal',
    location: 'Jamä Arbaa Rasmouka',
    time: '09:00 du matin',
    isFeatured: true
  };

  // Selected Category Filter
  selectedCategory: string = 'all';

  categories = [
    { id: 'all', label: 'Tous les événements' },
    { id: 'madrassa', label: 'Madrassa & Éducation' },
    { id: 'evenements', label: 'Événements & Waadas' },
    { id: 'alertes', label: 'Alertes & Infrastructures' },
    { id: 'mre', label: 'MRE & Culture' }
  ];

  eventsList: EventItem[] = [
    {
      id: 'madrassa-avancement-gallery',
      title: 'Suivi des Travaux : Galerie de l\'avancement du projet Madrassa Atika',
      description: 'Découvrez en 5 phases clés l\'évolution du chantier, des maquettes d\'architecte 3D à l\'aménagement finalisé des espaces d\'apprentissage.',
      date: 'Août 2026',
      badge: 'Avancement du Projet',
      badgeBg: 'rgba(34, 197, 94, 0.15)',
      badgeColor: '#15803d',
      category: 'madrassa',
      image: 'assets/img/madrassa/madrassa_avancement_1.jpg',
      hasModal: true,
      modalTarget: '#progressGalleryModal'
    },
    {
      id: 'concretisation-route-115',
      title: 'Infrastructure à Irsmouken : La concrétisation tant attendue du projet de la Route Régionale 115 (ex-RP 1007)',
      description: 'L\'avis d\'appel d\'offres international N° 22/2026 pour les travaux de réhabilitation de la RR 115 (tronçon de 26,97 km) a été officiellement lancé. Une grande victoire collective pour notre commune.',
      date: '09 Août 2026',
      badge: 'Infrastructures & Route',
      badgeBg: 'rgba(34, 197, 94, 0.1)',
      badgeColor: '#15803d',
      category: 'alertes',
      image: 'assets/img/voitureCase2.jpeg',
      hasModal: true,
      modalTarget: '#articleRoute115Modal'
    },
    {
      id: 'madrassa-rehabilitation',
      title: 'Présentation du projet de réhabilitation de Madrassa Atika',
      description: 'Découverte des nouvelles infrastructures éducatives, administratives et sanitaires ainsi que du budget prévisionnel.',
      date: '14 Juin 2026',
      badge: 'Madrassa Atika',
      badgeBg: 'rgba(34, 197, 94, 0.1)',
      badgeColor: '#166534',
      category: 'madrassa',
      image: 'assets/img/madrassa/Madrassa3.jpeg',
      link: '/madrassa'
    },
    {
      id: 'degradation-route-115',
      title: 'Centre d\'Arbaa Rasmouka : Dégradation de la route régionale 115',
      description: 'Effondrement des protections sur l\'axe reliant Ait Baha à Tiznit, nécessitant la vigilance des usagers.',
      date: '11 Juin 2026',
      badge: 'Alerte Route',
      badgeBg: 'rgba(239, 68, 68, 0.1)',
      badgeColor: '#dc2626',
      category: 'alertes',
      image: 'assets/img/voitureCase.jpeg',
      link: '/degradation-route'
    },
    {
      id: 'elections-2026',
      title: 'Élections 2026 au Maroc : S\'informer, participer et décider',
      description: 'Les échéances électorales du 23 septembre 2026 représentent un moment charnière pour le Royaume et les MRE.',
      date: '23 Septembre 2026',
      badge: 'Élection Législative',
      badgeBg: 'rgba(59, 130, 246, 0.1)',
      badgeColor: '#1d4ed8',
      category: 'evenements',
      image: 'assets/img/blog/election.png',
      link: '/actualite'
    },
    {
      id: 'waada-premier-mai',
      title: 'Waada du 1er Mai - Bilan et perspectives annuelles',
      description: 'Réunion annuelle bilan des projets réalisés durant l\'année écoulée et préparation des projets d\'avenir.',
      date: '01 Mai',
      badge: 'Événement Annuel',
      badgeBg: 'rgba(245, 158, 11, 0.1)',
      badgeColor: '#b45309',
      category: 'evenements',
      image: 'assets/img/blog/Waada.jpg',
      link: '/EventReadMore',
      hasCountdown: true
    },
    {
      id: 'soiree-irsmouken',
      title: 'La soirée annuelle d\'Irsmouken',
      description: 'Rassemblement culturel annuel d\'Irsmouken. Une soirée riche en partage, traditions et fraternité.',
      date: 'Événement Annuel',
      badge: 'Soirée Culturelle',
      badgeBg: 'rgba(168, 85, 247, 0.1)',
      badgeColor: '#7e22ce',
      category: 'mre',
      image: 'assets/img/blog/bg_1.jpg',
      link: '/Soiree'
    },
    {
      id: 'journee-mre-2024',
      title: 'Journée nationale des MRE Irsmouken',
      description: 'Célébration du rôle essentiel de la communauté résidant à l\'étranger dans le développement local.',
      date: '10 Août 2024',
      badge: 'MRE & Développement',
      badgeBg: 'rgba(14, 165, 233, 0.1)',
      badgeColor: '#0369a1',
      category: 'mre',
      image: 'assets/img/mre/Journee_MRE1.jpg',
      externalLink: 'https://agadirtoday.com/fr/la-journee-national-du-migrant-tiznit-reaffirme-les-liens-diaspora-et-developpement/'
    }
  ];

  filterCategory(category: string): void {
    this.selectedCategory = category;
  }

  get filteredEvents(): EventItem[] {
    if (this.selectedCategory === 'all') {
      return this.eventsList;
    }
    return this.eventsList.filter(event => event.category === this.selectedCategory);
  }

  getDataWada(): number {
    let dateWada = new Date(Date.UTC(new Date().getUTCFullYear(), 4, 1));
    let currentDate = new Date();
    if (currentDate.getMonth() >= dateWada.getMonth() && currentDate.getDate() > dateWada.getDate()) {
      return currentDate.getUTCFullYear() + 1;
    }
    return currentDate.getUTCFullYear();
  }

  constructor(public authService: AuthService) { }
}
