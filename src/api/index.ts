import { Router } from 'express';
import locationRouter from './location/route';
import loginRouter from './login/route';
import offersRouter from './offers/route';
import usersRouter from './users/route';

export default (): Router => {
  const app = Router();
  app.use('/test', (req, res) => {
    res.send("Hello World")
  })
  app.use('/login', loginRouter)
  app.use('/user', usersRouter)
  app.use('/location', locationRouter)
  app.use('/offers', offersRouter)
  return app;
};
