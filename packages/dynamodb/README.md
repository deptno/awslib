# @deptno/dynamodb

```
npm i @deptno/dynamodb
```

###### api
- `batchWrite` can write unlimited items
- `batchGet` can get unlimited items
- `scanAll` recursive scan until end of items
- `scanAllSegmented` same as scanAll but works with segmented
- `queryAll` recursive query until end of items
- `util`
  - `js2ddbDoc` normalize to dynamodb document
  - `createToken` tokenizer
  - `parseToken` token to json

###### [changelog](CHANGELOG)
`0.0.2` - util.js2ddbDoc support Buffer type
`0.0.1` - add util.js2ddbDoc  
`0.0.0` - release

###### MIT
