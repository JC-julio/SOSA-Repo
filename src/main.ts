import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors'
mongoose.set('strictQuery', false);
import StudentsRoutes from './routes/StudentsRoutes/RoutesStudents';
import ManagerRoutes from './routes/ManagerRoutes/RoutesManager';
import RoutesExits from './routes/ExitsRoutes/RoutesExits';
import OrganizationRoutes from './routes/OrganizationRoutes/RoutesOrganization'
import { config } from 'dotenv';
config();
mongoose.connect(process.env.connectionString);
const app = express();
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(ManagerRoutes);
app.use(RoutesExits);
app.use(StudentsRoutes);
app.use(OrganizationRoutes);
app.listen(3000);
