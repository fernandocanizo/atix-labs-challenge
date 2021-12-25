import app from './app.mjs';

const port = 3000;

app.listen(
  port,
  () => console.log(`App listening on http://${port}`)
);
