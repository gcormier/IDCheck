const AWS = require('aws-sdk');
const _ = require('lodash');

const cloudwatchlogs = new AWS.CloudWatchLogs();

const log = (logGroupName, logStreamName, message) => {
  const timestamp = new Date().getTime();
  cloudwatchlogs.describeLogStreams({ logGroupName, logStreamNamePrefix: logStreamName }).promise()
    .then((data) => {
      const sequenceToken = _.get(data, 'logStreams[0].uploadSequenceToken');
      const logEventParams = {
        logEvents: [
          {
            message: message,
            timestamp: timestamp,
          },
        ],
        logGroupName,
        logStreamName,
        sequenceToken,
      };
      cloudwatchlogs.putLogEvents(logEventParams).promise()
        .then(_.noop)
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
}

module.exports = {
  log
}
