import { Router } from 'express';

export default (): Router => {
  const app = Router();
  app.use('/test', (req, res) => {
    res.send("Hello World")
  })
  return app;
};
