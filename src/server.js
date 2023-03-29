const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.header('Access-Control-Allow-Methods', 'POST, PUT, GET, OPTIONS, DELETE');
  next();
});

require('./db/initDb');

const priceFeedRouter = require('./router/priceFeedRouter');
app.use('/api', priceFeedRouter);

const PORT = process.env.PORT || 5555;

app.use((err, req, res, next) => {
  console.log('error--------', res);
  res.status(err.statusCode || 500);
  res.send({
    error: {
      statusCode: err.statusCode || 500,
      message: err.message || 'Error',
    },
  });
});


app.listen(PORT, () =>
  console.log(`Node app serving on process ${process.pid} on port: ${PORT}`)
);

