import {HttpGet, HttpReceive, HttpResponse, Path} from "../attrs";

export class Post
{
    public id : number;
    public userId: number;
    public title : string;
    public body : string;
}

@HttpResponse(200)
export class PostFetched extends Post
{

}


@HttpResponse(404)
export class PostNotFound
{

}

@HttpGet('http://jsonplaceholder.typicode.com/posts/{id}')
@HttpReceive(PostNotFound, PostFetched)
export class FetchPost
{

    @Path()
    public id : number;

    constructor(id: number) {
        this.id = id;
    }

}
