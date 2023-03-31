import { Router } from 'express';
import usersRouter from './users/route';

export default (): Router => {
  const app = Router();
  app.use('/test', (req, res) => {
    res.send("Hello World")
  })
  app.use('/user', usersRouter)
  return app;
};
