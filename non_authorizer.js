// Authorizationをせずに通過させる
module.exports.handler = async(event) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Go Serverless Webpack (Typescript) v1.0! Your function executed successfully!',
      input: event,
    }),
  };
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