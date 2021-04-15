// Authorizationをせずに通過させる
module.exports.handler = (event, context) => {
  const policy = {
    principalId: 'user',
    policyDocument: {
      Version: '2012-10-17',
      Statement: [
        {
          Action: 'execute-api:Invoke',
          Effect: 'Allow',
          // Resource: event.methodArn,
          Resource: [`${identifier}:${service}:${action}:${region}:${accountId}:${apiId}/${stage}/*/*`]
        },
      ],
    },
  };
  context.succeed(policy);
}
