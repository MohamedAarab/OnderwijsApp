export class Cursus{
    id:number;
    code:string;
    name:string;
    period:number;
    europeanCredits:number;
    coordinator:string;
    examination:string;

    constructor(id:number, code:string, name:string, period:number, europeanCredits:number, coordinator:string, examination:string) {
        this.id = id;
        this.code = code;
        this.name = name;
        this.period = period;
        this.europeanCredits = europeanCredits;
        this.coordinator = coordinator;
        this.examination = examination;
    }
}
