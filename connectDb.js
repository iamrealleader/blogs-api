const mongoose = require('mongoose');

const connect = mongoose.connect(process.env.LOCAL_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Error connecting to MongoDB', err);
});

module.exports = connect;