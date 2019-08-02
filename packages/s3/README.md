# @deptno/s3

```
npm i @deptno/s3
```

api
- `cache` s3 proxy

cache
```typescript
const channels = await s3lib.cache<any[]>({
     bucket: 'bucket',
     key   : `tmp/data.json`,
     fetch() {
       return dlib.scanAll({
         TableName: 'ddb_table',
         IndexName: 'index',
       })
     },
     store(data) {
       return JSON.stringify(data)
     },
     restore(data: string) {
       return JSON.parse(data)
     }
   })
```

0.0.1
- add cache.{store,restore}

0.0.0
- release
MIT
