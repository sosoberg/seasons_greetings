const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const passport = require('passport');
const app = express();
const PORT = process.env.PORT || 3001;

//chat stuff
const http = require('http');

const server = http.createServer(app);
const socketIO = require("socket.io");
//const io = new Server(server);

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// Set up Handlebars.js engine with custom helpers
const hbs = exphbs.create();

const sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));

// Inform Express.js on which template engine to use
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

// middleware for Auth

//const bodyParser = require("body-parser");


app.use(session({ secret: "Super secret secret" }));
//app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());

//chat room
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});


(async () =>{

  await sequelize.sync({ force: false })
    const server = app.listen(PORT, () => console.log(`Now listening on ${PORT}`));
    const io = socketIO(server);

    io.on('connection', (socket) => {
      console.log('a user connected');
      socket.on('chat message', (msg) => {
          io.emit('chat message', msg);
        });
    });
 
})();

