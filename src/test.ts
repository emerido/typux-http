import {FetchPost, PostFetched} from './test/messages';
import {Manager} from "./manager";

const executor = new Manager();
executor.execute(new FetchPost(2))
    .then(console.log);

