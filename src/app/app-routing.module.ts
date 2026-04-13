import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';



import { AccueilComponent } from './components/accueil/accueil.component';
import { AboutComponent } from './components/about/about.component';
import { ServicesComponent } from './components/nos_services/services.component';
import { PhotosComponent } from './components/photos/photos.component';
import { TeamComponent } from './components/team/team.component';
import { EventsComponent } from './components/events/events.component';
import { ContactComponent } from './components/contact/contact.component';
import { ConnexionComponent } from './components/connexion/connexion.component';
import { MembreComponent } from './components/membre/membre.component';
import { VerifiyEmailComponent } from './components/verifiy-email/verifiy-email.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { AccesDroitsComponent } from './components/acces-droits/acces-droits.component';
import { DemocratiesComponent } from './components/democraties/democraties.component';
import { EventReadMoreComponent } from './components/event-read-more/event-read-more.component';
import { HistoireComponent } from './components/histoire/histoire.component';
import { IfqirnComponent } from './components/ifqirn/ifqirn.component';
TeamComponent
export const routes: Routes = [
{ path: 'Histoire',component:HistoireComponent},
{ path: 'Contact',component:ContactComponent},
{ path: 'Event',component:EventsComponent},
{ path: 'Team',component:TeamComponent},
{ path: 'Photos', component:PhotosComponent},
{ path: 'Services', component: ServicesComponent },
{ path: 'About', component: AboutComponent },
{ path: 'Accueil', component: AccueilComponent },
{ path: 'Connexion', component: ConnexionComponent },
{ path: 'Membre', component: MembreComponent },
{ path: 'verify-email-address', component: VerifiyEmailComponent },
{ path: 'forgot-password', component: ForgotPasswordComponent },
{ path: 'AccesDroits', component: AccesDroitsComponent },
{ path: 'Democraties', component: DemocratiesComponent },
{ path: 'EventReadMore', component: EventReadMoreComponent },
{ path: 'Ifqirn', component: IfqirnComponent },
{ path: '', redirectTo: '/Event', pathMatch: 'full'}
];




@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
