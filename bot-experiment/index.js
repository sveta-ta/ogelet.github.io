'use strict';
    
const AWS = require('aws-sdk')     
const documentClient = new AWS.DynamoDB.DocumentClient();
const cognitoIdentityServiceProvider = new AWS.CognitoIdentityServiceProvider();

// --------------- Main handler -----------------------

exports.handler = (event, context, callback) => {
    try {
        dispatch(event,
            (response) => {
                callback(null, response);
            });
    } catch (err) {
        callback(err);
    }
};

function close(sessionAttributes, fulfillmentState, message) {
    return {
        sessionAttributes,
        dialogAction: {
            type: 'Close',
            fulfillmentState,
            message,
        },
    };
}




function dispatch(intentRequest, callback) {
    const sessionAttributes = intentRequest.sessionAttributes;
    const slots = intentRequest.currentIntent.slots;


    const phoneNumber = slots.PhoneNumber;
    const USER_POOL_ID = 'us-east-1_5L7OMdWGY';
    //phoneNumber.toString().substring(2);
    const userName = '6467377667';
    const CLIENT_ID = '7gob3in412cb9pdv1btuga7ke9';
    
    var params = {
        AuthFlow: 'ADMIN_NO_SRP_AUTH',
        ClientId: CLIENT_ID,
        UserPoolId: USER_POOL_ID,
        AuthParameters: {
            'USERNAME': userName,
            'PASSWORD': '6467377667'
        },
    };


    cognitoIdentityServiceProvider.adminInitiateAuth(params, function(err, data) {
      if (err) {

        errorHandler(err, sessionAttributes, callback);
      } else {
          console.log('SUCCESS !!!!!!!', data);
          console.log('SUCCESS !!!!!!!');
          callback(close(sessionAttributes, 'Fulfilled', {
            'contentType': 'PlainText',
            'content': `Okay, ${data.Session}`
            }
        ));
      }

  });




    

}

