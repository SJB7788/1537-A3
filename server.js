const app = require('./app');
const mongoose = require('mongoose');

main().catch((err) => console.log(err));

async function main() {
  // await mongoose.connect("mongodb://127.0.0.1:27017/test");
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
  await mongoose.connect(
    'mongodb+srv://user1:5DmaMIzrFT77rCLT@cluster0.0c1wpzp.mongodb.net/?retryWrites=true&w=majority'
  );

  app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });
}
