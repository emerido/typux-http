export declare class Post {
    id: number;
    userId: number;
    title: string;
    body: string;
}
export declare class PostFetched extends Post {
}
export declare class PostNotFound {
}
export declare class FetchPost {
    id: number;
    constructor(id: number);
}
