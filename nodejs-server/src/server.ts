import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

const client = require('prom-client');
const register = new client.Registry();
client.collectDefaultMetrics({ register });

// see at line 93

const app = express();
const port = 5000;

// Middleware
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

// Sample jokes
const jokes = [
  "Why don't scientists trust atoms? Because they make up everything!",
  "Did you hear about the mathematician who's afraid of negative numbers? He'll stop at nothing to avoid them!",
  "Why was the math book sad? It had too many problems.",
  "What do you call a fake noodle? An impasta!",
  "Why did the scarecrow win an award? Because he was outstanding in his field!"
];

// Sample facts
const facts = [
  "A day on Venus is longer than a year on Venus.",
  "The shortest war in history was between Britain and Zanzibar in 1896. It lasted only 38 minutes.",
  "Octopuses have three hearts.",
  "Honey never spoils. Archaeologists have found pots of honey in ancient Egyptian tombs that are over 3,000 years old and still perfectly good.",
  "The fingerprints of a koala are so indistinguishable from humans that they have on occasion been confused at a crime scene."
];

// Root endpoint - list available endpoints
app.get('/', (req, res) => {
  res.json({
    message: "Welcome to the Simple API",
    available_endpoints: [
      {
        path: "/random-joke",
        description: "Returns a random joke in text format"
      },
      {
        path: "/random-fact",
        description: "Returns a random dumb fact in text format"
      },
      {
        path: "/random-meme",
        description: "Redirects to a meme image"
      }
    ]
  });
});

// Random joke endpoint
app.get('/random-joke', (req, res) => {
  const randomIndex = Math.floor(Math.random() * jokes.length);
  res.send(jokes[randomIndex]);
});

// Random fact endpoint
app.get('/random-fact', (req, res) => {
  const randomIndex = Math.floor(Math.random() * facts.length);
  res.send(facts[randomIndex]);
});

// Random meme endpoint
app.get('/random-meme', (req, res) => {
  res.redirect(301, 'https://miro.medium.com/v2/resize:fit:720/format:webp/1*oms6YDdriv3QO2vomZaInA.jpeg');
});

// 404 handler for undefined routes
app.use((req, res) => {
  res.status(404).json({
    error: "Not Found",
    message: "The requested endpoint does not exist."
  });
});

// Error handler
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    error: "Internal Server Error",
    message: "Something went wrong on the server."
  });
});


// Prometheus metrics endpoint
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});



// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
