import {FetchPost, PostFetched} from './test/messages';
import {Manager} from "./manager";

const executor = new Manager();
executor.execute(new FetchPost(1000000))
    .then(console.log);

