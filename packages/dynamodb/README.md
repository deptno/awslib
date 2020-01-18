# @deptno/dynamodb

```
npm i @deptno/dynamodb
```

### logs
if you want to check detail logs

```shell script
DEBUG=@deptno/dynamodb node [your program]
```

```typescript
import {createDynamoDB} from '@deptno/dynamodb'

const ddb = createDynamoDB(documnetClient)

ddb.scan<ReturnSchema>({
  TableName: '...',
  Limit: 300,
  ReturnConsumedCapacity: 'TOTAL'
})
```

```shell script
{
  Items: [...],
  Count: 300,
  ScannedCount: 300,
  LastEvaluatedKey: {...},
  ConsumedCapacity: { TableName: '...', CapacityUnits: 22 }
} +19
```

###### api
- `raw` DynamoDBClient
- `batchWrite` write unlimited items
- `batchGet` get unlimited items
- `scanAll` recursive scan until end of items
- `scanAllSegmented` same as scanAll but works with segmented
- `queryAll` recursive query until end of items
- `util`
  - `js2ddbDoc` normalize dynamodb document (eg. strip empty string property)
  - `createToken` tokenizer
  - `parseToken` token to json
  - `gzip` typed gzip json
  - `unGzip` typed unGzip json
  - `createKey` typed key and parser (eg. `world#2019-11-01` -> `{hello: string, createdAt: Date}`)

###### [changelog](CHANGELOG)

###### MIT
