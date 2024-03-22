import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.routes.js';
import Consultas from './routes/consultas.routes.js';
import Usuarios from './routes/Usuarios.routes.js';
import Mascotas from './routes/mascotas.routes.js';
import cors from 'cors';

const app = express();

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use('/api', authRoutes);
app.use('/api/Consultas', Consultas);
app.use('/api/Usuarios', Usuarios);
app.use('/api/Mascotas', Mascotas);

export default app;
