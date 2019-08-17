"use strict";

const AWS = require("aws-sdk");
const cognitoIdentityServiceProvider = new AWS.CognitoIdentityServiceProvider();

// --------------- Main handler -----------------------

exports.handler = (event, context, callback) => {
  try {
    dispatch(event, response => {
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
      type: "Close",
      fulfillmentState,
      message
    }
  };
}

function dispatch(intentRequest, callback) {
  const sessionAttributes = intentRequest.sessionAttributes;
  const slots = intentRequest.currentIntent.slots;

  const phoneNumber = slots.PhoneNumber;
  const USER_POOL_ID = "us-east-1_5L7OMdWGY";
  //phoneNumber.toString().substring(2);
  const userName = "6467377667";
  const CLIENT_ID = "7gob3in412cb9pdv1btuga7ke9";

  var params = {
    AuthFlow: "ADMIN_NO_SRP_AUTH",
    ClientId: CLIENT_ID,
    UserPoolId: USER_POOL_ID,
    AuthParameters: {
      USERNAME: userName,
      PASSWORD: "1234567"
    }
  };

  // var passwordparams = {
  //   UserPoolId:USER_POOL_ID, /* required */
  //   Username: userName, /* required */
  //   Password: '123456'
  // };
  // cognitoIdentityServiceProvider.adminSetUserPassword(passwordparams, function(err, data) {
  //   if (err) console.log(err, err.stack); // an error occurred
  //   else     console.log(data);           // successful response
  // });

  cognitoIdentityServiceProvider.adminInitiateAuth(params, function(err, data) {
    if (err) {
      console.log("------", err);
    } else {
      console.log("+++++++++");
      console.log(data);

      var params = {
        ChallengeName: "NEW_PASSWORD_REQUIRED" /* required */,
        ClientId: CLIENT_ID /* required */,

        ChallengeResponses: {
          NEW_PASSWORD: "1234567",
          USERNAME: userName
        },
        Session: data.Session
      };
      cognitoIdentityServiceProvider.respondToAuthChallenge(params, function(
        err,
        data
      ) {
        if (err) console.log(err, err.stack);
        // an error occurred
        else console.log(data); // successful response
      });

      //   callback(close(sessionAttributes, 'Fulfilled', {
      //     'contentType': 'PlainText',
      //     'content': `Sure, just go on our website and make your choice https://order-bot.000webhostapp.com/?SessionToken=${data.AuthenticationResult.AccessToken}`
      //     }
      // ));
    }
  });
}
