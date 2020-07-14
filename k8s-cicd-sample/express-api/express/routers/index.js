import express from 'express';
import AWS from 'aws-sdk';

const router = express.Router();

const config = {
    endpoint: 'http://dynamodb:8000',
    region: 'local',
    accessKeyId: 'fakeMyKeyId',
    secretAccessKey: 'fakeSecretAccessKey'
}

AWS.config.update(config)
const docClient = new AWS.DynamoDB.DocumentClient()

router.get('/welcome', async (req, res) => {
    try {
        const params = {
            TableName: "vote",
            Key: {
                "vote_item": 1
            }
        };

        docClient.get(params, function (err, data) {
            if (err) {
                res.json({
                    result: "Error",
                    message: err
                })
            } else {
                res.json({
                    result: "OK",
                    data: data,
                    message: "This is appserver cicd actived"
                })
            }
        });
    } catch (err) {
        res.json({
            result: "Error",
            message: err
        })
    }
});

router.put('/:dog&&:cat', async (req, res) => {
    try {
        const { dog, cat } = req.params;
        const params = {
            TableName: "vote",
            Item: {
                "vote_item": 1,
                "dog": dog,
                "cat": cat
            }
        };

        docClient.put(params, function (err, data) {
            if (err) {
                res.json({
                    result: "Error",
                    message: err
                })
            } else {
                res.json({
                    result: "OK"
                })
            }
        });
    } catch (err) {
        res.json({
            result: "Error",
            message: err
        })
    }
});

export default router;