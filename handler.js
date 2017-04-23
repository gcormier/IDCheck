'use strict';

const _ = require('lodash');
const dbConnection = require('./config/db');
const log = require('./aws/cloudWatchLogs').log;

module.exports.foo = (event, context, callback) => {
  const basdb = dbConnection('basdb');
  basdb.connect((err) => {
    if (err) console.log(err);
  });
  basdb.query('select MAX_ID from bas_idgen;', (error, response) => {
    const MAX_ID = _.get(response, '[0].MAX_ID');
    log('IDLogs', 'BASID', MAX_ID && `MAX_ID: ${MAX_ID}` || 'No MAX_ID found.');
    basdb.end((err) => {
      if (err) console.log(err);
    });
  });

  const development = dbConnection('development');
  development.connect((err) => {
    if (err) console.log(err);
  });
  development.query('select NextID from nextphpid;', (error, response) => {
    const NextID = _.get(response, '[0].NextID');
    log('IDLogs', 'PHPID', NextID && `NextID: ${NextID}` || 'No NextID found.');
    development.end((err) => {
      if (err) console.log(err);
    });
  });
};
