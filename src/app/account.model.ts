export class Account{
    public id:number
    public title:String
    public description:String
    public balance:number

    public constructor(id:number,title:String,description:String,balance:number){

        this.id = id
        this.title = title
        this.description = description
        this.balance = balance

    }
}