/* Amplify Params - DO NOT EDIT
You can access the following resource attributes as environment variables from your Lambda function
var environment = process.env.ENV
var region = process.env.REGION
var storageUploads3BucketName = process.env.STORAGE_UPLOADS3_BUCKETNAME
var apiUploadfiles3GraphQLAPIIdOutput = process.env.API_UPLOADFILES3_GRAPHQLAPIIDOUTPUT
var apiUploadfiles3GraphQLAPIEndpointOutput = process.env.API_UPLOADFILES3_GRAPHQLAPIENDPOINTOUTPUT

Amplify Params - DO NOT EDIT */

exports.handler = async (event) => {
    // TODO implement
    const response = {
        statusCode: 200,
        body: JSON.stringify('Hello from Lambda!'),
    };
    return response;
};
