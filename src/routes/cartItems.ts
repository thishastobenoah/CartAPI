import express from 'express';
import { CartItem } from '../models/Cart-Item';

const routes = express.Router();

var  cartItems: CartItem[] = [
    { id: 1, product: 'Item1', price: 10, quantity: 2 },
    { id: 2, product: 'Item2', price: 20, quantity: 1 },
];

routes.get('/cart-items', (req, res) => {
    const { maxPrice, prefix, pageSize } = req.query;
  
    let filteredItems = [...cartItems];
  
    if (maxPrice) {
      filteredItems = filteredItems.filter((item) => item.price <= parseInt(maxPrice as string, 10));
    }
  
    if (prefix) {
      filteredItems = filteredItems.filter((item) => item.product.startsWith(prefix as string));
    }
  
    if (pageSize) {
      const limit = parseInt(pageSize as string, 10);
      filteredItems = filteredItems.slice(0, limit);
    }
  
    res.json(filteredItems);
  });

  routes.get('/cart-items/:id', (req, res) => {
    const itemId = parseInt(req.params.id);
    const item = cartItems.find((item) => item.id === itemId);
  
    if (item) {
      res.json(item);
    } else {
      res.status(404).send('ID Not Found');
    }
  });


  routes.post('/cart-items', (req, res) => {
    const newItem: CartItem = req.body;
    newItem.id = cartItems.length + 1;
    cartItems.push(newItem);
  
    res.status(201).json(newItem);
  });
  
  routes.put('/cart-items/:id', (req, res) => {
    const itemId = parseInt(req.params.id);
    const updatedItem: CartItem = req.body;
  
    const index = cartItems.findIndex((item) => item.id === itemId);
  
    if (index !== -1) {
      cartItems[index] = { ...cartItems[index], ...updatedItem };
      res.json(cartItems[index]);
    } else {
      res.status(404).send('ID Not Found');
    }
  });

  routes.delete('/cart-items/:id', (req, res) => {
    const itemId = parseInt(req.params.id);
    cartItems = cartItems.filter((item) => item.id !== itemId);
  
    res.status(204).end();
  });

export default routes;