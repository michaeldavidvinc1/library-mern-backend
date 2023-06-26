const mongoose = require("mongoose");
var colors = require("colors");

//! Import konfigurasi terkait MongoDB dari config/index.js
const { urlDb } = require("../config");

mongoose.connect(urlDb);

//! Simpan koneksi dalam constant
const db = mongoose.connection;

if (db) {
  console.log("Success to Connect Mongo DB".bgWhite.black);
} else {
  console.log("Failed to Connect Mongo DB".red);
}

module.exports = db;
