var AWS = require('aws-sdk');
var s3 = new AWS.S3();
var RDS = new AWS.RDSDataService();

exports.handler = function (event) {
    console.log(event);
    try {
        var srcBucket = event.Records[0].s3.bucket.name;
        var srcKey = event.Records[0].s3.object.key;
        var getParams = {
            Bucket: srcBucket,
            Key: srcKey
        };
        s3.getObject(getParams, function (err, data) {
            if (err) console.error(err);
            var body = data.Body.toString('utf-8');
            var con_body = body.substring(0, body.length - 1).split("\n");
            var values = '';
            con_body.forEach(element => {
                values = values + '(' + element + '),';
            });
            values = values.substring(0, values.length - 1);
            console.log('VALUES: ', values);
            add_data_to_RDS(values);
        });
    } catch (err) {
        console.error("HANDLER ERROR: ", err);
    }
};

async function add_data_to_RDS(values) {
    console.log(values);
    try {
        var queryString = 'INSERT INTO stream_data VALUES ' + values + ';';
        // var queryString = 'CREATE TABLE stream_data (' +
        // 'date_time VARCHAR (50) PRIMARY KEY,' +
        // 'position_x VARCHAR (10) NOT NULL,' +
        // 'position_y VARCHAR (10) NOT NULL,' +
        // 'position_z VARCHAR (10) NOT NULL);';
        console.log(queryString);
        const params = {
            "resourceArn": process.env.RESOURCE_ARN,
            "secretArn": process.env.SECRET_ARN,
            "sql": queryString,
            "database": process.env.DATABASE_NAME
        };
        var result = await RDS.executeStatement(params).promise();
        console.log(result);
    } catch (e) {
        console.log(e);
    }
}