let subjectId = 0;

class Subject {
    constructor(points = [], edges = [], polygons = [], animation = null, speedCoef = 1) {
        this.id = ++subjectId;
        this.points = points;
        this.edges = edges;
        this.polygons = polygons;
        this.animation = animation;
        this.speedCoef = speedCoef;
    }
}