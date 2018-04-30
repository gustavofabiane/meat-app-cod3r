import { Express } from 'express';
import { handleAuthentication } from './auth';
import { handleAuthorization } from './authz';

import * as jsonServer from 'json-server';
import * as fs from 'fs';
import * as https from 'https';

const server: Express = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares)
server.use(jsonServer.bodyParser)

server.post('/login', handleAuthentication)
server.use('/orders', handleAuthorization)

// Use default router
server.use(router)

const options = {
  cert: fs.readFileSync('./backend/keys/cert.pem'),
  key: fs.readFileSync('./backend/keys/key.pem')
}

server.listen(3001, () => {
  console.log('Listening...');
})

// https.createServer(options, server).listen(3001, () => {
//   console.log('JSON Server is running on https://localhost:3001')
// })