import {reduxHttpMiddleware} from "./redux";
import {HttpGet, Path, Query} from "./attrs";
export * from './attrs';
export * from './enums';
export * from './redux';

@HttpGet('/api/login/{username}')
class Login
{

    @Path()
    public username : string;

    @Query()
    public password : string;

    constructor(username: string, password: string) {
        this.username = username;
        this.password = password;
    }
    
}

const middleware = reduxHttpMiddleware()({} as any)(x => x);

middleware({
    data : new Login('admin', '123')
} as any);