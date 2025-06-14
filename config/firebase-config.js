// Firebase Yapılandırma Dosyası
// Bu dosyayı güvenlik için environment variables ile değiştirmeyi düşünün

const firebaseConfig = {
    apiKey: "AIzaSyCw3K1GkADAuxZwEVTTCYDpFGfRz1Ou9TE",
    authDomain: "image-portfolio-f18ba.firebaseapp.com",
    projectId: "image-portfolio-f18ba",
    storageBucket: "image-portfolio-f18ba.firebasestorage.app",
    messagingSenderId: "439511756560",
    appId: "1:439511756560:web:3468c4d726d98ec306bf95",
    measurementId: "G-M6RZ95ECFP"
};

// Firebase başlatma
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Admin yapılandırması
const ADMIN_PASSWORD = "admin123"; // Güvenlik için değiştirin!

// Firebase nesnelerini global olarak dışa aktar
window.firebaseApp = firebase;
window.db = db;
window.ADMIN_PASSWORD = ADMIN_PASSWORD;