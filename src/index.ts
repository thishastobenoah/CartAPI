import express from 'express';

import cors from 'cors';

import cartItemsRouter from './routes/cartItems';

const app = express();

app.use(cors());

app.use(express.json());

app.use('/', cartItemsRouter);

const port = 3000;

app.listen(port, () => console.log(`Listening on port: ${port}`))