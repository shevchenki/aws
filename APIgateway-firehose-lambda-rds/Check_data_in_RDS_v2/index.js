var pg = require('pg');

exports.handler = (event) => {
    var conn = 'postgresql://' +
        process.env.USER + ':' +
        process.env.KEY + '@' +
        process.env.HOST + ':' +
        process.env.PORT + '/postgres';
    var client = new pg.Client(conn);
    client.connect();

    var queryString = 'CREATE TABLE stream_data (' +
        'date_time VARCHAR (50) PRIMARY KEY,' +
        'position_x VARCHAR (10) NOT NULL,' +
        'position_y VARCHAR (10) NOT NULL,' +
        'position_z VARCHAR (10) NOT NULL);';
        
    //var queryString = 'SELECT * FROM stream_data';
    console.log('QUERY_STRING: ', queryString);

    client.query(queryString, function (err, result) {
        if (err) {
            console.log('Error running query', err);
            return;
        }
        console.log(result);
        client.end();
    });
}