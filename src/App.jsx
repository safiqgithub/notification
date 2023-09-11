// const publicKey = 'BCULnb7FaMpsv3OoL8iL81wZIx0G0iw7GomyS-22GvHS-HDeW4T4RJYcNqfz3zvnsMbOxMNb7AggxQTXQvmPSys';

// //check for service worker
// if('serviceWorker' in navigator) {
//   send().catch(err => console.error(err));
// }

// //register sw,register push, send push
// async function send() {
//   // register service worker
//   console.log('register service worker');
//   const register =await navigator.serviceWorker.register('/service-worker.js',{
//     scope: '/'
//   });
//   console.log('service worker registered');

//   //register push
//   console.log('registering push');
//   const subscription = await register.pushManager.subscribe({
//     userVisibleOnly: true,
//     applicationServerKey: urlBase64ToUint8Array(publicKey)
//   });
//   console.log('push registered');

//   //send push notification
//   console.log('sending push');
//   await fetch('/subscribe',{
//     method:'POST',
//     body: JSON.stringify(subscription),
//     headers: {
//       'content-type': 'application/json'
//     }
//   });
//   console.log('push sent');

// }

// function urlBase64ToUint8Array(base64String) {

//   const padding = '='. repeat ((4 - base64String. length % 4) & 4);
//   const base64 = (base64String + padding)

//   .replace(/\-/g, '+')
//   .replace(/_/g, '/');
  
//   const rawData = window.atob(base64);
//   const outputArray = new Uint8Array(rawData.length);
  
//   for (let i = 0; i < rawData.length; ++i) {
//      outputArray[i] = rawData.charCodeAt(1);
//   }
//   return outputArray;
// }




// // Request permission for notifications
// if ('Notification' in window) {
//   Notification.requestPermission().then((permission) => {
//     if (permission === 'granted') {
//       // Get the service worker registration
//       navigator.serviceWorker.register('service-worker.js')
//         .then((registration) => {
//           // Subscribe for push notifications
//           registration.pushManager.subscribe({ userVisibleOnly: true })
//             .then((subscription) => {
//               // Send the subscription object to your server
//               fetch('http://localhost:3000/subscribe', {
//                 method: 'POST',
//                 body: JSON.stringify(subscription),
//                 headers: {
//                   'Content-Type': 'application/json',
//                 },
//               });
//             });
//         });
//     }
//   });
// }

