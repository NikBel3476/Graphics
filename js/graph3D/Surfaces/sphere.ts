import {Surface} from "./Surface";
import {Point} from "../entities/Point";
import {Edge} from "../entities/Edge";
import {Polygon} from "../entities/Polygon";
import {Subject} from "../entities/Subject";

Surface.prototype.sphere = (
    pointCount = 10,
    ringCount = 10,
    R = 10,
    point = new Point(0, 0 ,0),
    color = '#FF0000',
    animation: { [key: string]: Point } | null = null,
    speedCoef = 1
) => {
    let x0 = point.x;
    let y0 = point.y;
    let z0 = point.z;
    const points: Point[] = [];
    const edges: Edge[] = [];
    const polygons: Polygon[] = [];

    // points
    for (let beta = Math.PI / 2; beta >= -Math.PI; beta -= Math.PI / ringCount) {
        let r = Math.cos(beta) * R;
        let height = Math.sin(beta) * R;
        for (let alpha = 0; alpha < Math.PI * 2; alpha += Math.PI / pointCount * 2) {
            let x = Math.cos(alpha) * r + x0;
            let y = height + y0;
            let z = Math.sin(alpha) * r + z0;
            points.push(new Point(x, y, z));
        }
    }

    // edges
    for (let i = 0; i < points.length; i++) {
        if (i % pointCount === 0 && i !== 0) {
            edges.push(new Edge(i, i + 1));
        } else {
            if (i + 1 < points.length && (i + 1) % pointCount !== 0) {
                edges.push(new Edge(i, i + 1));
            } else {
                edges.push(new Edge(i, i + 1 - pointCount));
            }
        }
        if (i + pointCount < points.length) {
            edges.push(new Edge(i, i + pointCount));
        }
    }

    // polygons
    for (let i = 0; i < points.length; i++) {
        if ((i + 1 + pointCount) < points.length && ((i + 1) % pointCount) != 0) {
            polygons.push(new Polygon([i, i + 1, i + 1 + pointCount, i + pointCount], color));
        } else if ((i + pointCount) < points.length && ((i + 1) % pointCount) == 0) {
            polygons.push(new Polygon([i, i - pointCount + 1, i + 1, i + pointCount], color));
        }
    }
    
    const center = {
        x: (points[0].x + points[points.length - 1].x) / 2,
        y: (points[0].y + points[points.length - 1].y) / 2,
        z: (points[0].z + points[points.length - 1].z) / 2
    }

    return new Subject(points, edges, polygons, animation, speedCoef);
}
