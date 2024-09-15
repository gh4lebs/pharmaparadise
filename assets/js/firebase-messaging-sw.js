importScripts('https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.5/firebase-messaging.js');

const firebaseConfig = {
    apiKey: "AIzaSyCuuVrV0PTEr5X_zTmuQpe_IWpHTV_ekb0",
    authDomain: "pharmaparadise-16cd4.firebaseapp.com",
    projectId: "pharmaparadise-16cd4",
    storageBucket: "pharmaparadise-16cd4.appspot.com",
    messagingSenderId: "981211920419",
    appId: "1:981211920419:web:521c4246bb520ecc1c9996",
    measurementId: "G-0VXH155SJZ"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log('Received background message ', payload);
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: payload.notification.icon
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});