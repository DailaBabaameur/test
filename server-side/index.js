const express = require("express");
const db = require("./config/db");
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 3006;
const httpServer = require("http").createServer(app);

// const app2 = require('http').createServer().listen(8124);

const io = require("socket.io")(httpServer, {
   cors: {
     origin: "http://localhost:3007",
     methods: ["GET", "POST"],
     credentials: true
   }
 });



// app.use(cors()); 
// var corsOptions = {
//    origin: 'http://localhost:3007/startups',
//    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
//  }

 
db.connect(function (err) {
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


//"/api/AllStartups"
app.get("/api/all", (req, res) => {
   
   db.query(
      'select startup.name,startup.taille, startup.lieu,startup.lieu,startup.website, startup.secteur,startup.linkedin,source.namesource from startup inner join source on sourceID = idsource',
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
      if(req.query.source!=0) var q="select startup.name,startup.website,startup.taille, startup.lieu,startup.secteur,startup.found_info,startup.linkedin,source.namesource from startup,source  where sourceID=idsource and sourceID="+source ;
      
     
   db.query(
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
//  const scheduler = socket => {
//    const response = "bonjour de la 2eme";
   
//    socket.emit("FromAPI", response);
//  };
io.on("connection", (socket) => {
  console.log("New client connected");

//   if (interval) {
//     clearInterval(interval);
//   }
//   interval = setInterval(() => scheduler(socket), 1000);

   const notif = "200 nouvelles Startups";
   socket.emit("FromSERV", notif);

   //Deconnection
  socket.on("disconnect", () => {
    console.log("Client disconnected");
   //  clearInterval(interval);
  });
});



app.listen(3003, () => {
   console.log('server runninggg');
})
httpServer.listen(port, () => console.log(`Listening on port ${port}`));
