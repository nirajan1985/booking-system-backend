// This file is used for debugging

const db = require('./models');

// Create a sample user
db.User.create({
  name: 'Sample User',
  email: 'sample.user@email.com'
})
.then(user => {
  console.log(`User created with ID: ${user.id}`);
})
.catch(err => {
  console.log('Error creating user:', err);
});

// Create a sample room
db.Room.create({
  name: 'Sample Room',
  capacity: 10
})
.then(room => {
  console.log(`Room created with ID: ${room.id}`);
})
.catch(err => {
  console.log('Error creating room:', err);
});