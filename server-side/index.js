const express = require("express");
// const db = require("./config/db");
const conn = require("./config/db2")
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 3006;
const got = require('got');
const httpServer = require("http").createServer(app);

// const app2 = require('http').createServer().listen(8124);



// app.use(cors()); 
// var corsOptions = {
//    origin: 'http://localhost:3007/startups',
//    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
//  }

const schedule = require('node-schedule');

const job = schedule.scheduleJob('* * * * *', function(){
//   updateDbFromApi('welcomeToTheJungle')
});

const sources = [
   { name: 'welcomeToTheJungle', value: 1},
   { name: 'frenchTech', value: 2},
]


const updateDbFromApi = async (collection) => {
   const { newCompanies }= await getNewCompanies('http://192.168.1.40', 3000)
   console.log('New companies', newCompanies)
   if(newCompanies.length){
      updateMysqlDb(newCompanies)
   }
}

const getNewCompanies = async (host, port, endpoint= '/') => {
   console.log("hello")
   const { body } = await got(`${host}:${port}${endpoint}`, { json: true })
   return body
} 

const updateMysqlDb = (companies, collection) => {
   const sql = "INSERT INTO startup (name, website, linkedin, sourceID) VALUES ?";
   const values = companies.map(company => [company.Name, company.Website, company.Linkedin, sources[collection]])
   console.log('executing query...')
   conn.query(sql, [values], function(err) {
      if (err) throw err;
      conn.end();
   });
   console.log('query executed')
}

conn.connect(function (err) {
   if (err) { throw err }
   else { console.log("connected!"); }



})


app.use((req, res, next) => {
   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Headers", "Origin,X-Requested-With, Content-Type, Accept, Authorization");
   if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'POST,GET,PUT,PATCH,DELETE');
      return res.status(200).json({});
   }
   next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/old", () => {
   
   conn.query(
      "UPDATE startup SET status = 0 ",
      
   )

})
//"/api/AllStartups"
app.get("/api/all", (req, res) => {
   

   conn.query(
      'select startup.name,startup.taille, startup.lieu,startup.lieu,startup.website, startup.secteur,startup.linkedin,source.namesource, startup.status from startup inner join source on sourceID = idsource',
      function (err, result) {
         if (err) {
            console.log("error", err)
         } else {
            res.json(result);
         }
      }
   )
})

app.get("/api/startups", (req, res) => {
   if (req.query.tech!='') tech=req.query.tech
   source=req.query.source
      // if(req.query.source!=0) var q="select name,website,linkedin from startup where sourceID="+source;
      if(req.query.source!=0) var q="select startup.name,startup.website,startup.taille, startup.lieu,startup.secteur,startup.linkedin,source.namesource, startup.status from startup,source  where sourceID=idsource and sourceID="+source ;
      
     
   conn.query(
      q,
      function (err, result) {
         if (err) {
            console.log("error", err)
         } else {
            res.json(result);
         }
      }
   );
});
// var j = schedule.scheduleJob('* * * * *', async function(){
//    console.log('This will run once a minute.');
//    const result = await http.get('/getCompanyInfo');
//    console.log("here la")
//    console.log(result);
// });



 let interval;
//  const reauetteAPI = https.get('https://', (resp) => {
//    let data = '';
 
//    // A chunk of data has been received.
//    resp.on('data', (chunk) => {
//      data += chunk;
//    });
 
//    // The whole response has been received. Print out the result.
//    resp.on('end', () => {
//      console.log(JSON.parse(data).explanation);
//    });
 
//  }).on("error", (err) => {
//    console.log("Error: " + err.message);
//  });


app.listen(3003, () => {
   console.log('server runninggg');
})
httpServer.listen(port, () => console.log(`Listening on port ${port}`));
