export default class newTeam {
    id: number;
    name: string;
    color: string;
    points: number;
    members: string[];


    constructor( id: number, name: string, color: string, points: number, members: string[]) {
        this.id = id;
        this.name = name;
        this.color = color;
        this.points = points;
        this.members = members;
    }
}