const AWS = require('aws-sdk')     
const documentClient = new AWS.DynamoDB.DocumentClient();
const cognitoIdentityServiceProvider = new AWS.CognitoIdentityServiceProvider();



// called by API GateWay, when user choose product on web page, update product in the db
exports.handler = (event) => {
    const sessionToken = event.authentication;
    const product = event.product;
    
    var params = {
        AccessToken: sessionToken
    };
    cognitoIdentityServiceProvider.getUser(params, function(err, data) {
      if (err) {
          console.log(err, err.stack);
      } else {
            console.log(data);
            const userName = data.Username;
            const DB_TABLE_NAME = 'test_users';
            var params = {
                TableName: DB_TABLE_NAME,
                Key:{
                    "user_id": userName,
                },
                UpdateExpression: "set user_info.product = :p",
                ExpressionAttributeValues:{
                    ":p": product,
                },
                ReturnValues:"UPDATED_NEW"
            };


documentClient.update(params, function(err, data) {
    if (err) {
        console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2));
    }
});


      }
    });

    const response = {
        statusCode: 200,
        body: 'Success'
    };
    
    
    
    return response;
};
