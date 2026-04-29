# AppFirebase

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 20.3.16

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build --configuration production` to build the project. The build artifacts will be stored in the `dist/` directory.


## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

#pour créer une classe  pojo:
ng g class models/contact --type=model

#pour créer une service:
ng g s services/contact

/*
une fois que vous avez crée votre projet sur firebase  de google
il faut ajouter une base de données chercher sur le net pour le faire

*/

#pour deployer votre application tapez ces commande à la racine de votre projet:
before all to this commande if not yet:npm install -g firebase-tools(if not yet done)
1- firebase login
2- firebase init hosting
3- firebase deploy

# to delete node_modules

rm -rf node_modules/

# to reconstruct the directory

npm install --force

# to know your app anglaur version

ng --version

# mettre une application en production

ng build --configuration=production  /*  mode developement et par defaut production mode */

# se connecter à la base de données:

https://console.firebase.google.com/
