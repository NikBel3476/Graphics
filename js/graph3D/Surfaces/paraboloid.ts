import {Surface} from "./Surface";
import {Point} from "../entities/Point";
import {Edge} from "../entities/Edge";
import {Polygon} from "../entities/Polygon";
import {Subject} from "../entities/Subject";

Surface.prototype.paraboloid = (pointCount = 10, length = 20, color = '#ff0000') => {
    const points = [];
    const edges = [];
    const polygons = [];
    const a = 2;
    const b = 2;
    const delta = length / pointCount;

    x = -length / 2 - delta;

    // points
    for (let i = 0; i <= pointCount; i++) {
        x += delta;
        z = -length / 2 - delta;
        for (let j = 0; j <= pointCount; j++) {
            z += delta;
            y = (-z * z + Math.abs(x * x / (a * a))) / (b * b);
            points.push(new Point(x, y, z));
        }
    }

    // edges
    let k = pointCount;
    for (let i = 0; i < points.length - 1; i++) {
        if (i % k != 0 || i == 0) {
            edges.push(new Edge(i, i + 1));
        } else {
            k += pointCount + 1;
        }
    }

    // polygons
    k = pointCount;
    for (let i = 0; i < points.length - pointCount - 2; i++) {
        if (i % k != 0 || i == 0) {
            polygons.push(new Polygon([i, i + 1, i + pointCount + 2, i + pointCount + 1], color));
        } else {
            k += pointCount + 1;
        }
    }
    return new Subject(points, edges, polygons);
}
