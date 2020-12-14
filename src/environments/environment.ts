// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import * as firebase from 'firebase';

export const environment = {
  production: false,
   firebase : {
    apiKey: "AIzaSyC0axlehX1PhOzp-5N9X6qJtu_rVK_FaoQ",
    authDomain: "girlandcar-ba183.firebaseapp.com",
    databaseURL: "https://girlandcar-ba183.firebaseio.com",
    projectId: "girlandcar-ba183",
    storageBucket: "girlandcar-ba183.appspot.com",
    messagingSenderId: "80771101864",
    appId: "1:80771101864:web:35ccc29c1472483b597e9d",
    measurementId: "G-0WEV6507ZP"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
