importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyBEl9WDAytaCyfadgOiSQdyOSWUdmcVK9M",
  authDomain: "bulk-c417d.firebaseapp.com",
  projectId: "bulk-c417d",
  storageBucket: "bulk-c417d.firebasestorage.app",
  messagingSenderId: "776376948123",
  appId: "1:776376948123:web:e4dcd79918e716e215bd3e"
});

const messaging = firebase.messaging();

// Handle notifications when app is in background or closed
messaging.onBackgroundMessage(payload => {
  const { title = 'BulkUp', body = 'Stay consistent! 💪' } = payload.notification || {};
  self.registration.showNotification(title, {
    body,
    icon: '/icon-192.png',
    badge: '/icon-192.png',
    vibrate: [200, 100, 200],
    data: payload.data || {}
  });
});
