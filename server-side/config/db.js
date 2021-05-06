const express = require("express");
const mysql = require("mysql");
const app = require('http').createServer().listen(8124);

const db = mysql.createConnection({
    user:"root",
    host :"localhost",
    password:"admin",
    database:"scrapeddata",
    insecureAuth : true,
});
let database = db.emit(false, '');
module.exports = db;