import express, { Request, Response, urlencoded } from 'express';
import { sequelize } from './db/sequalize';
import cors from 'cors';
import userRouter from './routes/userRoute';
import { partyRouter } from './routes/partyRoute';

const port = process.env.PORT || 7072;
const app = express();
app.use(cors())
app.use(express.json());
app.use(urlencoded({ extended: true }));

app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
  });

  app.get('/', (req: Request, res: Response) => {
    res.json({ message: 'Hello, TypeScript Express with PostgreSQL!' });
  });

  app.use('/user',userRouter)
  app.use('/party',partyRouter)
  app.listen(port, async () => {
    try {
      // Check the database connection
      await sequelize.authenticate();
      console.log('Connected to the database');
  
      // Sync the Sequelize models with the database
      await sequelize.sync({ force: false });
      console.log('Sequelize models synchronized with the database');
  
      console.log(`Server is running on port ${port}`);
    } catch (error) {
      console.error('Error connecting to the database:', error);
    }
  });
