'use strict';
    
const AWS = require('aws-sdk')     
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
    const USER_POOL_ID = 'userpool';
    //phoneNumber.toString().substring(2);
    const userName = '6467377667';
    const CLIENT_ID = '7gob3in412cb9pdv1btuga7ke9'; // 
    
    var params = {
        AuthFlow: 'ADMIN_NO_SRP_AUTH',
        ClientId: CLIENT_ID,
        UserPoolId: USER_POOL_ID,
        AuthParameters: {
            'USERNAME': userName,
            'PASSWORD': '1234567'
        },
    };


    cognitoIdentityServiceProvider.adminInitiateAuth(params, function(err, data) {
      if (err) {
        console.log(err);
      } else {
          console.log(data);
          
          callback(close(sessionAttributes, 'Fulfilled', {
            'contentType': 'PlainText',
            'content': `Sure, just go on our website and make your choice https://order-bot.000webhostapp.com/?SessionToken=${data.AuthenticationResult.AccessToken}`
            }
        ));
      }

  });

}

