// Authorizationをせずに通過させる
module.exports.handler = (event, context, callback) => {
  const [ identifier, service, action, region, accountId, apiGatewayArn ] = event.methodArn.split(':')
  const [ apiId, stage, ..._rest ] = apiGatewayArn.split('/')
  callback(null, {
    principalId: 'user',
    policyDocument: {
        Version: '2012-10-17',
        Statement: [{
            Action: 'execute-api:Invoke',
            Effect: 'Allow',
            Resource: [`${identifier}:${service}:${action}:${region}:${accountId}:${apiId}/${stage}/*/*`]
        }]
    }
  });
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
