// import webpush from 'web-push';
// import express from 'express';
// import bodyParser from 'body-parser';
// import { fileURLToPath } from 'url';
// import path, { dirname } from 'path';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// const app = express();
// app.use(express.static('public'));




// app.use(bodyParser.json());

// // Replace the values with your own VAPID keys
// const publicKey = 'BLAqVpe7-k80zU93eQhm7LwDmZ-Usm1Xu4bCDtqYCeu3xw1g1c9gc_1xLhXpgrxjd3Cmf5VYxIKV_kHCQoW6kZU';
// const privateKey = 'sFO7tNvzVb3gP9om1LlXA_AAtTHadJtCKa_YKbZFoOg';
// webpush.setVapidDetails('mailto:your-email@example.com', publicKey, privateKey);

// // Handle subscription requests
// app.post('/subscribe', (req, res) => {
//   const subscription = req.body;

//   //send 201 - resource created 
//   res.status(201).json({});

//   // Payload for the notification
//   const payload = JSON.stringify({
//     title: 'New Notification',
//     // body: 'This is a notification with a payload.',
//     // data: {
//     //   exampleData: 'Some additional data',
//     // },
//   });

//   // Send the notification
//   webpush.sendNotification(subscription, payload).catch(err => console.error(err));
//     // .then(() => res.status(200).json({ message: 'Notification sent successfully.' }))
//     // .catch((error) => res.status(500).json({ error: 'Failed to send notification.', details: error }));
// });

// // Start the server
// const port = 5173;
// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });

import webpush from 'web-push';
import express from 'express';
import bodyParser from 'body-parser';

const app = express();
app.use(express.static('src'));
app.use(bodyParser.json());

// Enable CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Replace the values with your own VAPID keys
const publicKey = 'BLAqVpe7-k80zU93eQhm7LwDmZ-Usm1Xu4bCDtqYCeu3xw1g1c9gc_1xLhXpgrxjd3Cmf5VYxIKV_kHCQoW6kZU';
const privateKey = 'sFO7tNvzVb3gP9om1LlXA_AAtTHadJtCKa_YKbZFoOg';
webpush.setVapidDetails('mailto:your-email@example.com', publicKey, privateKey);

// Handle subscription requests
app.post('/subscribe', (req, res) => {
  const subscription = req.body;

  // Send the notification
  const payload = JSON.stringify({
    title: 'New Notification',
  });

  webpush.sendNotification(subscription, payload)
    .then(() => {
      console.log('Notification sent successfully');
      res.sendStatus(200);
    })
    .catch((error) => {
      console.error('Failed to send notification:', error);
      res.sendStatus(500);
    });
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
