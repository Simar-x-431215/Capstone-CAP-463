export const environment = {
  production: false,
  firebase: {
    apiKey: "your-api-key",
    authDomain: "your-project-id.firebaseapp.com",
    projectId: "your-project-id",
    storageBucket: "your-project-id.appspot.com",
    messagingSenderId: "your-messaging-sender-id",
    appId: "your-app-id",
    measurementId: "your-measurement-id"
  }
};

// IMPORTANT: Replace the placeholder values above with your actual Firebase project configuration
// You can get these values from the Firebase console: https://console.firebase.google.com/
// Go to Project settings > General > Your apps > Firebase SDK snippet > Config

/* Steps to set up Firebase:

1. Create a Firebase project at https://console.firebase.google.com/
2. Enable Firebase Storage and Firestore Database from the Firebase console
3. Set up Storage rules in Firebase console to allow read/write access
4. In Authentication section, set up the authentication methods you want to use
5. Copy your Firebase configuration from Project settings > General > Your apps > Firebase SDK snippet > Config
6. Replace the placeholder values in this file with your actual Firebase configuration

Storage Rules Example (in Firebase Console):
```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read, write: if true;  // For development only, restrict in production
    }
  }
}
```

Firestore Rules Example (in Firebase Console):
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;  // For development only, restrict in production
    }
  }
}
```
*/ 