import { Component, OnInit, OnDestroy } from '@angular/core';

interface FaqItem {
  question: string;
  answer: string;
  isOpen: boolean;
}

@Component({
  selector: 'app-actualite',
  standalone: false,
  templateUrl: './actualite.component.html',
  styleUrl: './actualite.component.css',
})
export class ActualiteComponent implements OnInit, OnDestroy {
  targetDate: Date = new Date('2026-06-13T23:59:59');
  days: number = 0;
  hours: number = 0;
  minutes: number = 0;
  seconds: number = 0;
  private timerId: any;

  faqItems: FaqItem[] = [
    {
      question: 'Qui peut s\'inscrire sur les listes électorales ?',
      answer: 'Tout citoyen marocain, âgé de 18 ans révolus ou qui atteindra cet âge à la date d\'arrêt définitif des listes, et jouissant de ses droits civiques et politiques. Cela inclut tous les Marocains Résidant à l\'Étranger (MRE).',
      isOpen: false
    },
    {
      question: 'Quels documents sont requis pour s\'inscrire ?',
      answer: 'En ligne, vous avez uniquement besoin de votre Carte Nationale d\'Identité Électronique (CNIE). En personne, vous devrez présenter votre CNIE ou son duplicata auprès de votre ambassade, consulat, ou bureau administratif local.',
      isOpen: false
    },
    {
      question: 'Puis-je voter depuis mon pays de résidence ?',
      answer: 'Oui, pour les élections législatives, les MRE inscrits sur les listes électorales consulaires peuvent voter auprès des ambassades et consulats du Royaume du Maroc établis dans leur pays d\'accueil.',
      isOpen: false
    },
    {
      question: 'Comment vérifier si je suis déjà inscrit ?',
      answer: 'Vous pouvez vérifier votre statut instantanément sur le site officiel listeselectorales.ma en saisissant votre numéro de CNIE et votre date de naissance.',
      isOpen: false
    }
  ];

  ngOnInit(): void {
    this.startCountdown();
  }

  ngOnDestroy(): void {
    if (this.timerId) {
      clearInterval(this.timerId);
    }
  }

  private startCountdown(): void {
    this.calculateTime();
    this.timerId = setInterval(() => {
      this.calculateTime();
    }, 1000);
  }

  private calculateTime(): void {
    const now = new Date().getTime();
    const difference = this.targetDate.getTime() - now;

    if (difference <= 0) {
      this.days = 0;
      this.hours = 0;
      this.minutes = 0;
      this.seconds = 0;
      if (this.timerId) {
        clearInterval(this.timerId);
      }
      return;
    }

    this.days = Math.floor(difference / (1000 * 60 * 60 * 24));
    this.hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    this.minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    this.seconds = Math.floor((difference % (1000 * 60)) / 1000);
  }

  toggleFaq(index: number): void {
    if (this.faqItems[index]) {
      this.faqItems[index].isOpen = !this.faqItems[index].isOpen;
    }
  }
}
