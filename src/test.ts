import {reduxHttpMiddleware} from "./redux";
import {FetchPost} from './test/messages';

const state : any = {
    dispatch(action) {
        console.log('Dispatched new action', action);
    }
};
const action = (data : any) : any => ({data});

const middleware = reduxHttpMiddleware()(state)(x => x);





middleware(action(new FetchPost(12)));

