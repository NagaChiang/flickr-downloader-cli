#!/usr/bin/env node

require('dotenv').config();
require = require('esm')(module);
module.exports = require('./index.js');

const cli = require('./src/controllers/Cli').default;
cli.command(process.argv);