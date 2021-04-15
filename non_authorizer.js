// Authorizationをせずに通過させる
module.exports.handler = (event) => {
  return {
    principalId: 'user',
    policyDocument: {
        Version: '2012-10-17',
        Statement: [{
            Action: 'execute-api:Invoke',
            Effect: 'Allow',
            Resource: event.methodArn,
            // Resource: [`${identifier}:${service}:${action}:${region}:${accountId}:${apiId}/${stage}/*/*`]
        }]
    }
  }
}

// module.exports.handler = (event, context, callback) => {
//   var token = event.headers["Authorization"];
//   callback(null, {
//     principalId: 'user',
//     policyDocument: {
//         Version: '2012-10-17',
//         Statement: [{
//             Action: 'execute-api:Invoke',
//             Effect: 'Allow',
//             Resource: event.methodArn,
//             // Resource: [`${identifier}:${service}:${action}:${region}:${accountId}:${apiId}/${stage}/*/*`]
//         }]
//     }
//   });
// }