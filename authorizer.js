// Authorizationヘッダーの照合
module.exports.handler = (event, context, callback) => {
  const authorizationHeader = event.headers.Authorization
  if (!authorizationHeader) {
    return callback('Unauthorized')
  }

  const encodedCredentials = authorizationHeader.split(' ')[1]
  const [ username, password ] = (Buffer.from(encodedCredentials, 'base64')).toString().split(':')
  if (!(username === 'admin' && password === 'password')) {
    return callback('Unauthorized')
  }

  const authResponse = buildPolicy(event, username)
  callback(null, authResponse)
}

// IAMポリシーの作成
function buildPolicy (event, principalId) {
  const [ identifier, service, action, region, accountId, apiGatewayArn ] = event.methodArn.split(':')
  const [ apiId, stage, ..._rest ] = apiGatewayArn.split('/')

  return {
    principalId,
    policyDocument: {
      Version: '2012-10-17',
      Statement: [
        {
          // 実行アクション
          Action: 'execute-api:Invoke',
          // 許可
          Effect: 'Allow',
          // API Gatewayエンドポイント
          Resource: [`${identifier}:${service}:${action}:${region}:${accountId}:${apiId}/${stage}/*/*`]
        }
      ]
    }
  }
}
