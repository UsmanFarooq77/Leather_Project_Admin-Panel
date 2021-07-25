import { comment } from './../interfaces/comment';
export class comments implements comment {

    comment_author: string;
    comment_email: string;
    comment_content: string;
    comment_status: string;
    comment_toggle: string;
    date: string;
    id: number;
    image: string;

    constructor (){

    }
}