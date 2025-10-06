const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const http = require('http');
const { Server } = require('socket.io');

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

app.use(cors());
app.use(express.json());

const userRoutes = require('./routes/userRoutes');
const playerRoutes = require('./routes/playerRoutes');

app.use('/api/users', userRoutes);
app.use('/api/players', playerRoutes);
const teamRoutes = require('./routes/teamRoutes');
app.use('/api/teams', teamRoutes);
const tournamentRoutes = require('./routes/tournamentRoutes');
app.use('/api/tournaments', tournamentRoutes);

app.get('/', (req, res) => {
  res.send('Auction API is running');
});

const tournamentSocket = require('./socket/tournamentSocket');

io.on('connection', (socket) => {
  console.log('a user connected');
  tournamentSocket(io, socket);
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});