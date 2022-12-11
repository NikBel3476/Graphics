import {Point} from "./Point";
import {Edge} from "./Edge";
import {Polygon} from "./Polygon";

let subjectId = 0;

export class Subject {
    id: number;
    points: Point[];
    edges: Edge[];
    polygons: Polygon[];
    animation: { [key: string]: Point } | null;
    speedCoef: number;

    constructor(
        points: Point[] = [],
        edges: Edge[] = [],
        polygons: Polygon[] = [],
        animation: { [key: string]: Point } | null  = null,
        speedCoef = 1
    ) {
        this.id = ++subjectId;
        this.points = points;
        this.edges = edges;
        this.polygons = polygons;
        this.animation = animation;
        this.speedCoef = speedCoef;
    }
}
