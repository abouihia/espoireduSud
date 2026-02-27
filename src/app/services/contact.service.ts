import { Injectable } from '@angular/core';


import { Contact } from '../models/contact.model';
import { Email } from '../models/email.model';
import { Membre } from '../models/membre.model';

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';


@Injectable({
providedIn: 'root'
})
export class ContactService {


      private dbContact = '/contact';
      private  dbEmailAdresse = '/emails';
      private dbMembre ='/membre'  // to delete

      emailRef: AngularFirestoreCollection<Email>;
      contactsRef: AngularFirestoreCollection<Contact>;
      membreRef: AngularFirestoreCollection<Membre>; // to delete


      constructor(private db: AngularFirestore,
                  private db2: AngularFirestore, 
                  private db3:AngularFirestore) {

          this.contactsRef =  db.collection(this.dbContact);
          this.emailRef    = db2.collection(this.dbEmailAdresse);
          this.membreRef   = db3.collection(this.dbMembre);
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
