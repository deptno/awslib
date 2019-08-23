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
  - `gzip` gzip json with type
  - `unGzip` unGzip json with type

###### [changelog](CHANGELOG)

###### MIT
