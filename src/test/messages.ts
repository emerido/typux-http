import {HttpGet, HttpReceive, HttpResponse, Path} from "../attrs";

@HttpResponse(200)
export class PostFetched
{

}


@HttpGet('http://jsonplaceholder.typicode.com/posts/{id}')
@HttpReceive(PostFetched)
export class FetchPost
{

    @Path()
    public id : number;

    constructor(id: number) {
        this.id = id;
    }

}