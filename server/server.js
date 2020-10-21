const fs = require('fs');
const http = require('http');
const { ApolloServer, gql } = require('apollo-server-express');
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('./config');
const mongoose = require('mongoose');
const express = require('express');
const expressJwt = require('express-jwt');
const jwt = require('jsonwebtoken');
const db = require('./db');

try {
  const port = 8000;
  const jwtSecret = Buffer.from('Zn8Q5tyZ/G1MHltc4F/gTkVJMlrbKiZt', 'base64');

  mongoose.connect(config.db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const mydb = mongoose.connection;
  mydb.on('error', console.error.bind(console, 'connection error:'));
  mydb.once('open', function () {
    console.log('Connected with MongoDB!');
  });

  const app = express();
  app.use(
    cors(),
    bodyParser.json(),
    expressJwt({
      secret: jwtSecret,
      credentialsRequired: false,
    })
  );

  const typeDefs = gql(
    fs.readFileSync('./schema.graphql', { encoding: 'utf8' })
  );
  const resolvers = require('./resolvers');

  const context = ({ req, connection }) => {
    if (req && req.user) {
      return { user: db.users.get(req.user.sub) };
    }
    if (connection && connection.context && connection.context.accessToken) {
      const decodedUser = jwt.verify(connection.context.accessToken, jwtSecret);
      return { user: decodedUser };
    }
    return {};
  };

  const apolloServer = new ApolloServer({ typeDefs, resolvers, context });
  apolloServer.applyMiddleware({ app, path: '/graphql' });

  app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const user = db.users.list().find(user => user.email === email);
    if (!(user && user.password === password)) {
      res.sendStatus(401);
      return;
    }
    const token = jwt.sign({ sub: user.id, name: user.name }, jwtSecret);
    res.send({ token });
  });

  const httpServer = http.createServer(app);
  apolloServer.installSubscriptionHandlers(httpServer);
  httpServer.listen(port, () => console.info(`Server started on port ${port}`));
} catch (err) {
  console.error(err);
}
