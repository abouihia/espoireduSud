import { Injectable } from '@angular/core';


import { Contact } from '../models/contact.model';
import { Email } from '../models/email.model';
import { Membre } from '../models/membre.model';
import { Commercant } from '../models/commercant.model';

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';


@Injectable({
providedIn: 'root'
})
export class ContactService {


      emailRef: AngularFirestoreCollection<Email>;
      contactsRef: AngularFirestoreCollection<Contact>;
      commercantRef : AngularFirestoreCollection<Commercant>;
      membreRef: AngularFirestoreCollection<Membre>; // to delete


      constructor(private db: AngularFirestore) {
          this.contactsRef  = this.db.collection( '/contact');
          this.emailRef     = this.db.collection('/emails');
          this.membreRef    = this.db.collection('/membre');
          this.commercantRef= this.db.collection('/commercants');
      }

        /* recupérer les listes */
        getAllContact(): AngularFirestoreCollection<Contact> {
          return this.contactsRef;
        }
        getAllEmails(): AngularFirestoreCollection<Email> {
              return this.emailRef;
        }
        getAllMembre(): AngularFirestoreCollection<Membre> {
          return this.membreRef;
        }
        getAllCommercant():AngularFirestoreCollection<Commercant>{
            return  this.commercantRef;

        }

    

        /* créer les éléments */
        create(contact: Contact): any {
          return this.contactsRef.add({ ...contact });
        }

        addNewEmail(email: Email): any {
        return this.emailRef.add({ ...email });
        }

        // to delete
        createMembre(membre: Membre): any { 
          return this.membreRef.add({ ...membre });
        }

        /* mise à jour */
        update(id: string, data: any): Promise<void> {
            return this.contactsRef.doc(id).update(data);
          }

           /* Suppression de contacte */
          delete(id: string): Promise<void> {
            return this.contactsRef.doc(id).delete();
          }


}
