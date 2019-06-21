export class Widget{
    imageURL?: string;
    widgetURL?: string;
    name:string;
    author:string;
    id?:number;
    active?:boolean;
    github:string;
    docker:string;

    constructor(data:any){
        this.name = data.name;
        this.author = data.author;
        this.github = data.github;
        this.docker = data.docker;
    }
    
}