import 'dotenv/config';  // Ensures environment variables are loaded
import { Ignitor } from '@adonisjs/core';
import { pathToFileURL } from 'url';

const port = process.env.PORT || 10000;
process.env.PORT = port.toString();

new Ignitor(pathToFileURL(__dirname))
  .httpServer()
  .start();
