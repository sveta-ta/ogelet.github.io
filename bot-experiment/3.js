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
    const firstName = slots.FirstName;
    const lastName = slots.LastName;
    const email = slots.Email;
    const phoneNumber = slots.PhoneNumber;
    const USER_POOL_ID = 'userpoolid';
    const DB_TABLE_NAME = 'table';

    const userAuthParams = {
        UserPoolId: USER_POOL_ID,
        Username: phoneNumber.toString().substring(2),
        UserAttributes: [
            {
                Name: 'name',
                Value: `${firstName} ${lastName}`
            },
            {
                Name: 'email',
                Value: email
            }
        ],
    };
    
    cognitoIdentityServiceProvider.adminCreateUser(userAuthParams, (err, data) => {
        if (err) {
            console.log(err);
            errorHandler(err, sessionAttributes, callback);
        } else {
            const dbParams = {
                TableName : DB_TABLE_NAME,
                Item: {
                    user_id: phoneNumber.toString().substring(2),
                    user_info: intentRequest.currentIntent,
                }
            };
    
            documentClient.put(dbParams, function(err, data) {
                if (err) {
                    console.log(err);
                    errorHandler(err, sessionAttributes, callback);
                }
                else {
                    callback(close(sessionAttributes, 'Fulfilled', {
                        'contentType': 'PlainText',
                        'content': `Okay, ${firstName} ${lastName} you are succesfully registered`
                        }
                    ));
                }
            });
        }   
    });
}




function errorHandler(err, sessionAttributes, callback){
    let errorMessage;

    if(err.code === 'UsernameExistsException'){
        errorMessage = 'You are already registered';
    } else if(err.code === 'InvalidParameterException') {
        errorMessage = `${err.message}. Please try again.`;
    } else {
        errorMessage = 'Sorry, the error has occured, please try again';
    } 

    callback(close(sessionAttributes, 'Fulfilled', {
                'contentType': 'PlainText',
                'content': errorMessage
        }
    ));
}