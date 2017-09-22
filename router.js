import express, {Router} from 'express';

import {movieIndex} from './controllers/movies';

const router = Router();

router.route('/movies.json')
  .get(movieIndex);
  
export default router;
