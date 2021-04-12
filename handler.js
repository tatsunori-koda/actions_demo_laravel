'use strict';

module.exports.auth = (event, context, callback) => {
    let Authorization = event.headers.Authorization;

    if (!Authorization) return callback('Unauthorized');

    var encodedCreds = authorizationHeader.split(" ")[1]
    var plainCreds = (new Buffer(encodedCreds, 'base64')).toString().split(':')
    var username = plainCreds[0]
    var password = plainCreds[1]

    if (!(username === 'admin' && password === 'password')) return callback('Unauthorized')
    var authResponse = buildAllowAllPolicy(event, username)
    callback(null, authResponse)

    /*
    if (!(username === 'admin' && password === 'password')) {
      const body = 'Unauthorized';
        const response = {
            status: '401',
            statusDescription: 'Unauthorized',
            body: body,
            headers: {
                'www-authenticate': [{key: 'WWW-Authenticate', value:'Basic'}]
            },
        };
        callback(null, response);
    }
    callback(null, request);
    */
};

function buildAllowAllPolicy (event, principalId) {
  const policy = {
    principalId: principalId,
    policyDocument: {
      Version: '2012-10-17',
      Statement: [
        {
          Action: 'execute-api:Invoke',
          Effect: 'Allow',
          Resource: "*",
          // Resource: event.methodArn
        }
      ]
    }
  }
  return policy
}

module.exports.hello = async event => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Go Serverless v1.0! Your function executed successfully!',
        input: event,
      },
      null,
      2
    ),
  };

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};