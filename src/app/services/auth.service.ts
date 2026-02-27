import { Injectable, NgZone, inject, EnvironmentInjector, runInInjectionContext } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
///import { collection, doc, addDoc, updateDoc, deleteDoc, Firestore } from 'firebase/firestore'
import { Router } from '@angular/router';
import { Membre } from '../models/membre.model';
import { FirebaseError } from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private injector = inject(EnvironmentInjector);

  userData: any; // Save logged in user data
  isUnknowUser = false;
  isknowUser = false;
  userRef: AngularFirestoreDocument<any>;


  private dbMembre = '/membre'
  membreRef: AngularFirestoreCollection<Membre>;

  constructor(
    private db3: AngularFirestore,
    public afs: AngularFirestore, // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone // NgZone service to remove outside scope warning

  ) {
    this.membreRef = db3.collection(this.dbMembre);
    /* Saving user data in localstorage when  logged in and setting up null when logged out */
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    });


  }//fin du constructeur

  // Sign in with email/password (Connexion)
  SignIn(membre: Membre) {
    return this.afAuth.signInWithEmailAndPassword(membre.email!, membre.password!)
      .then((result) => {
        runInInjectionContext(this.injector, () => {
          this.SetUserData(result.user);
        });
        this.afAuth.authState.subscribe((user) => {
          console.log(user);
          if (user) {
            this.router.navigate(['Event']);
          }
        });
      })
      .catch((error) => {
        console.log(error);
        this.isUnknowUser = true;
      });
  }


  // Sign up with email/password (s'enregistrer)
  SignUp(membre: Membre) {
    return this.afAuth
      .createUserWithEmailAndPassword(membre.email!, membre.password!)
      .then((result) => {
        /* Call the SendVerificaitonMail() function when new user sign
        up and returns promise */
        console.log(result);
        this.SendVerificationMail();
        runInInjectionContext(this.injector, () => {
          this.SetUserData(result.user);
        });
        this.createMembre(membre);
      })
      .catch((error) => {
        console.log(error);
        this.isknowUser = true;
      });
  }



  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null && user.emailVerified !== false ? true : false;
  }

  // Sign out
  SignOut() {
    console.log("je passe pour la déconnexion");
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.userData = null;
      this.router.navigate(['Connexion']);

    });
  }


  /* Setting up user data when sign in with username/password,
  sign up with username/password and sign in with social auth
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  SetUserData(user: any) {

    const userID = user.uid;
    console.log(user);
    if (this.afs != null) {
      this.userRef = this.afs.doc(`users/${user.uid}`);
    }

    console.log(user);
    const userData: Membre = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      emailVerified: user.emailVerified,
    };

    return this.userRef.set(userData, { merge: true, });
  }

  // Reset Forggot password
  ForgotPassword(passwordResetEmail: string) {
    console.log(passwordResetEmail);
    return this.afAuth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {

        window.alert('Password reset email sent, check your inbox.');
        this.router.navigate(['Connexion']);
      })
      .catch((error) => {
        console.log(" utiliseur non connue")
        window.alert(error);
      });
  }

  // Send email verfificaiton when new user sign up
  SendVerificationMail() {
    return this.afAuth.currentUser
      .then((u: any) => u.sendEmailVerification())
      .then(() => {
        this.router.navigate(['verify-email-address']);
      });
  }

  createMembre(membre: Membre): any {
    return this.membreRef.add({ ...membre });
  }



}
