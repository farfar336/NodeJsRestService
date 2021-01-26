import express from 'express';
import bodyParser from "body-parser";

import personsRoutes from './routes/persons.js';

const app = express ();
const PORT = 5000;

app.use(bodyParser.json());

app.use('/persons', personsRoutes);

// "Hello from homepage" is shown  when visiting http://localhost:5000/
app.get('/', (req,res) =>  res.send('Hello from homepage.'));

app.listen(PORT, () => console.log(`Server Running on port: http://localhost:${PORT}`));