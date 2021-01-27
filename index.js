import express from 'express';
import bodyParser from "body-parser";

import personsRoutes from './routes/persons.js';

const app = express();
const PORT = 5000;

/** bodyParser.urlencoded(options)
 * Parses the text as URL encoded data (which is how browsers tend to send form data from regular forms set to POST)
 * and exposes the resulting object (containing the keys and values) on req.body
 */
app.use(bodyParser.urlencoded({
  extended: true
}));

/**bodyParser.json(options)
* Parses the text as JSON and exposes the resulting object on req.body.
*/
app.use(bodyParser.json());

app.use('/persons', personsRoutes);

// "Hello from homepage" is shown  when visiting http://localhost:5000/
app.get('/', (req, res) => res.send('Hello from homepage.'));

app.listen(PORT, () => console.log(`Server Running on port: http://localhost:${PORT}`));