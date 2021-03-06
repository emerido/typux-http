# Typux Http
HTTP plugin for typux


### Use in messages

#### Post

```ts
@HttpPost('/api/session')
export class UserLogin
{

    public username : string; // <- By default in post payload
    
    public password : string; // <- By default in post payload
    
    @Query() // <- paste timestamp into query string
    public timestamp : string;

}

```

#### Get

```ts
@HttpGet('/api/user/{id}')
export class UserInfoGet
{

    @Ignore() // <- ignore for query string (optional)
    public id : number;
    
    constructor(id : number)
    {
        this.id = id;
    }

}
// dispatch(new UserInfoGet(1)) -> GET /api/user/1
```


#### Receiving response

```ts
@HttpGet('/api/user/{id}')
@HttpReceive(UserInfo, NotFound)
export class UserInfoGet
{

    @Ignore() // <- ignore for query string (optional)
    public id : number;
    
    constructor(id : number)
    {
        this.id = id;
    }

}

@HttpResponse(404 /** Response code */)
export class NotFound
{

}

@HttpResponse(200 /** Response code */)
export class UserInfo
{

    ...
    public id : number;
    ...
}

// dispatch(new UserInfoGet(1)) -> GET /api/user/1 -> dispatch(new UserInfo(/** values fron response */));
```


### Use with redux

Add reduxHttpMiddleware into applyMiddleware

```ts
export const store = createStore<any>(
    combineReducers<any>({
        ...
    }),
    applyMiddleware(
        typuxMiddleware(),
        reduxHttpMiddleware(),
        ...
    )
);
```
