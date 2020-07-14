var AWS = require('aws-sdk');

const config = {
  endpoint: 'http://dynamodb:8000',
  region: 'local',
  accessKeyId: 'fakeMyKeyId',
  secretAccessKey: 'fakeSecretAccessKey'
}

AWS.config.update(config)

const dynamodb = new AWS.DynamoDB()
const docClient = new AWS.DynamoDB.DocumentClient()

const params = {
    TableName : "vote",
    KeySchema: [
        { AttributeName: "vote_item", KeyType: "HASH"},
    ],
    AttributeDefinitions: [
        { AttributeName: "vote_item", AttributeType: "N" }
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 10,
      WriteCapacityUnits: 10
    }
}

dynamodb.createTable(params, function(err, data) {
    if (err) {
        console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        const initData = {
            TableName: "vote",
            Item: {
                "vote_item": 1,
                "dog": 0,
                "cat": 0
            }
        };
        docClient.put(initData, function (err, data) {
            if (err) {
                console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
            } else {
                console.log("Init Put OK");
            }
        });
    }
});