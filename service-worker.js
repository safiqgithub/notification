

self.addEventListener('push', e => {
    const data = e.data.json();
    console.log('push received');
    self.registration.showNotification(data.title,{
        body: "notified by safi",
        icon: "./src/assets/among_us.png"
        

    });
    
});

// self.addEventListener('push', e => {
//     const data = e.data.json();
//     console.log('Push notification received:', data);
  
//     const options = {
//       body: 'This is a web push notification',
//       icon: ''
//     };
  
//     e.waitUntil(
//       self.registration.showNotification(data.title, options)
//     );
//   });
  

