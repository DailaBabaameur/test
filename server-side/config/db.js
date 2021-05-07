const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://Dalilababaameur:do9ua0lW3YFqRmSv@wtf-cluster.n4ue7.mongodb.net/startups?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });
async function run() {
  try {
    await client.connect();

    const database = client.db('sample_mflix');
    const movies = database.collection('startups');

    // Query for a movie that has the title 'Back to the Future'
    const query = { title: 'Back to the Future' };
    const movie = await movies.findOne(query);

    console.log(movie);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
module.exports = client;
