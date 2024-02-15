// This file handles the boot-up of the server 
const express = require("express");
const mongoose = require("mongoose");
require('dotenv').config();

const { databaseConnect } = require('./database');
const { app } = require('./server');

const PORT = process.env.PORT || 5001;

app.listen(PORT, async () => {
    await databaseConnect();
    console.log("Server running!");
});