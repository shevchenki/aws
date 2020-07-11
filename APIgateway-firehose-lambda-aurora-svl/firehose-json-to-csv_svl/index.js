exports.handler = async (event) => {
    console.log(event);
    const output = event.records.map((record) => {
        const json_data = JSON.parse((Buffer.from(record.data, 'base64')).toString('ascii'));
        const json_flatten_data = flattenJSON(json_data);
        var content = '';
        for (var key in json_flatten_data) {
            content = content + ",'" + json_flatten_data[key] + "'";
        }
        const csv_data = content.substring(1) + '\n';
        return {
            recordId: record.recordId,
            result: 'Ok',
            data: (Buffer.from(csv_data, 'utf8')).toString('base64')
        };
    });
    console.log(output);
    return { records: output };
};

function flattenJSON(data) {
    var result = {};
    function recurse(cur, prop) {
        if (Object(cur) !== cur) {
            result[prop] = cur;
        } else if (Array.isArray(cur)) {
            for (var i = 0, l = cur.length; i < l; i++)
                recurse(cur[i], prop ? prop + "." + i : "" + i);
            if (l == 0)
                result[prop] = [];
        } else {
            var isEmpty = true;
            for (var p in cur) {
                isEmpty = false;
                recurse(cur[p], prop ? prop + "." + p : p);
            }
            if (isEmpty)
                result[prop] = {};
        }
    }
    recurse(data, "");
    return result;
}