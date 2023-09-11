
// // Check for service worker support and request permission for push notifications
// if ('serviceWorker' in navigator && 'PushManager' in window) {
//     // Register service worker
//     navigator.serviceWorker.register('/service-worker.js')
//       .then(function(registration) {
//         console.log('Service Worker registered with scope:', registration.scope);
  
//         // Check for permission and subscribe for push notifications
//         Notification.requestPermission().then(function(permission) {
//           if (permission === 'granted') {
//             registration.pushManager.subscribe({
//               userVisibleOnly: true,
//               applicationServerKey: urlBase64ToUint8Array('BLAqVpe7-k80zU93eQhm7LwDmZ-Usm1Xu4bCDtqYCeu3xw1g1c9gc_1xLhXpgrxjd3Cmf5VYxIKV_kHCQoW6kZU')
//             })
//               .then(function(subscription) {
//                 console.log('Subscribed to push notifications:', subscription);
//                 // Send the subscription to the server
//                 fetch('/subscribe', {
//                   method: 'POST',
//                   headers: {
//                     'Content-Type': 'application/json'
//                   },
//                   body: JSON.stringify(subscription)
//                 });
//               })
//               .catch(function(error) {
//                 console.error('Failed to subscribe to push notifications:', error);
//               });
//           }
//         });
//       })
//       .catch(function(error) {
//         console.error('Service Worker registration failed:', error);
//       });
//   }
  
//   function urlBase64ToUint8Array(base64String) {
//     const padding = '='.repeat((4 - base64String.length % 4) % 4);
//     const base64 = (base64String + padding)
//       .replace(/-/g, '+')
//       .replace(/_/g, '/');
//     const rawData = window.atob(base64);
//     const outputArray = new Uint8Array(rawData.length);
//     for (let i = 0; i < rawData.length; ++i) {
//       outputArray[i] = rawData.charCodeAt(i);
//     }
//     return outputArray;
//   }
  
  
const publicKey = 'BLAqVpe7-k80zU93eQhm7LwDmZ-Usm1Xu4bCDtqYCeu3xw1g1c9gc_1xLhXpgrxjd3Cmf5VYxIKV_kHCQoW6kZU';

// Check for service worker support
if ('serviceWorker' in navigator && 'PushManager' in window) {
  // Register the service worker
  navigator.serviceWorker.register('/service-worker.js')
    .then((registration) => {
      console.log('Service Worker registered');

      // Check for existing subscription
      registration.pushManager.getSubscription()
        .then((subscription) => {
          if (subscription) {
            console.log('Existing subscription found');
            unsubscribeUser(subscription);
          }

          // Subscribe the user
          subscribeUser(registration);
        })
        .catch((error) => {
          console.error('Error checking subscription:', error);
        });
    })
    .catch((error) => {
      console.error('Service Worker registration failed:', error);
    });
}

function subscribeUser(registration) {
  registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(publicKey),
  })
    .then((subscription) => {
      console.log('Subscribed to push notifications:', subscription);
      sendSubscriptionToServer(subscription);
    })
    .catch((error) => {
      console.error('Failed to subscribe to push notifications:', error);
    });
}

function unsubscribeUser(subscription) {
  subscription.unsubscribe()
    .then(() => {
      console.log('Unsubscribed from push notifications');
    })
    .catch((error) => {
      console.error('Failed to unsubscribe from push notifications:', error);
    });
}

function sendSubscriptionToServer(subscription) {
    fetch('http://localhost:3000/subscribe', {
    method: 'POST',
    body: JSON.stringify(subscription),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      if (response.ok) {
        console.log('Subscription sent to server');
      } else {
        console.error('Failed to send subscription to server');
      }
    })
    .catch((error) => {
      console.error('Error sending subscription to server:', error);
    });
}

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }

  return outputArray;
}
