import express from 'express';
import path from 'path';
import ClassRoutes from './routes/StudentsRoutes/RoutesClass';
import StudentsRoutes from './routes/StudentsRoutes/RoutesStudents';
import ManagerRoutes from './routes/ManagerRoutes/RoutesManager';
import RoutesExits from './routes/ExitsRoutes/RoutesExits';
import mongoose from 'mongoose';
import { config } from 'dotenv';
config();
mongoose.connect(process.env.connectionString);
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(ClassRoutes);
app.use(ManagerRoutes);
app.use(RoutesExits);
app.use(StudentsRoutes);
app.listen(3000);
