const mongoose = require('mongoose');
const readLine = require('readline');

const dbURI = 'mongodb://localhost/Loc8r';

mongoose.connect(dbURI);


// Monitoring the Mongoose connection events

if(process.platform === 'win32') {
  let rl = readLine.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  rl.on("SIGINT", () => {
    process.emit("SIGINT");
  });
  rl.on("SIGUSR2", () => {
    process.emit("SIGUSR2");
  });
  rl.on('SIGTERM', () => {
    process.emit('SIGTERM');
  });
}

const gracefulShutdown = (msg, callback) => {
  mongoose.connection.close(() => {
    console.log('Mongoose disconnected through ' + msg);
    callback();
  });
};

mongoose.connection.on('connected', () => {
  console.log('Mongoose connected to ' + dbURI);
});

mongoose.connection.on('error', err => {
  console.log('Mongoose connected error ' + err);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected');
});

process.once('SIGUSR2', () => {
  gracefulShutdown('nodemon restart', () => {
    process.kill(process.id, 'SIGUSR2');
  });
});

process.on('SIGINT', () => {
  gracefulShutdown('app termination', () => {
    process.exit(0);
  });
});

process.on('SIGTERM', () => {
  gracefulShutdown('Heroku app shutdown', () => {
    process.exit(0);
  });
});
