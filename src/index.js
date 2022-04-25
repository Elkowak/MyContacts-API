const express = require('express');
require('express-async-errors');

const routes = require('./routes');

const app = express();

app.use(express.json());
app.use(routes);
app.use((error, request, response, next) => {
  console.log(error);
  return response.status(500).json({ error: 'Internal server error' });
});

app.listen(3000, () => console.log('Server running on  http://localhost:3000'));
