import { Ignitor } from '@adonisjs/core'
import { pathToFileURL } from 'url';

process.env.PORT = process.env.PORT || '10000';

new Ignitor(pathToFileURL(__dirname))
  .httpServer()
  .start();
