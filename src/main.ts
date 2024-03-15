import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors'
mongoose.set('strictQuery', false);
import StudentsRoutes from './routes/StudentsRoutes/RoutesStudents';
import ManagerRoutes from './routes/ManagerRoutes/RoutesManager';
import RoutesMessage from './routes/MessageRoutes/RoutesMessage';
import RoutesExits from './routes/ExitsRoutes/RoutesExits';
import OrganizationRoutes from './routes/OrganizationRoutes/RoutesOrganization'
import { config } from 'dotenv';
config();
mongoose.connect(process.env.connectionString);
const app = express();
const corsOptions = {
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
  }
app.use(cors(corsOptions))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(ManagerRoutes);
app.use(RoutesMessage)
app.use(RoutesExits);
app.use(StudentsRoutes);
app.use(OrganizationRoutes);
app.listen(3000);
