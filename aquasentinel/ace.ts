// ace.ts
import 'reflect-metadata'
import { IgnitorFactory } from '@adonisjs/core/factories'

import { pathToFileURL } from 'url'

const appRoot = pathToFileURL(process.cwd())

await new IgnitorFactory()
  .withCoreProviders()
  .create(appRoot)
  .ace()
  .handle(process.argv.slice(2))
