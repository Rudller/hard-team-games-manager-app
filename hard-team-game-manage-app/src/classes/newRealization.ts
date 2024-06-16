export default class newRealization {
    companyName: string;
    description: string;
    date: string;
    people: number;
    teams: object[];
    
    constructor(companyName: string, description: string, date: string, people: number, teams: object[]) {
        this.companyName = companyName;
        this.description = description;
        this.date = date;
        this.people = people;
        this.teams = teams;
    }
}