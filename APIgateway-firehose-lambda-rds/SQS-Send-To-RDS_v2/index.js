var AWS = require('aws-sdk');
var s3 = new AWS.S3();
var pg = require('pg');

exports.handler = (event) => {
    console.log("EVENT: ", event);
    try {
        var JSON_data = JSON.parse(event.Records[0].body);
        var srcBucket = JSON_data.Records[0].s3.bucket.name;
        var srcKey = JSON_data.Records[0].s3.object.key;
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

function add_data_to_RDS(values) {
    var conn = 'postgresql://' +
        process.env.USER + ':' +
        process.env.KEY + '@' +
        process.env.HOST + ':' +
        process.env.PORT + '/postgres';

    var client = new pg.Client(conn);
    client.connect();

    var queryString =
        'INSERT INTO stream_data ("date_time", "position_x", "position_y", "position_z") VALUES '
        + values + ';';
    console.log('QUERY_STRING: ', queryString);
    
    client.query(queryString, function (err, result) {
        if (err) {
            console.log('Error running query', err);
            return;
        }
        var jsonResult = JSON.stringify(result);
        console.log(">>> successful query. jsonResult: " + jsonResult);
        client.end();
    });
}