import {Surface} from "./Surface";
import {Point} from "../entities/Point";
import {Edge} from "../entities/Edge";
import {Polygon} from "../entities/Polygon";
import {Subject} from "../entities/Subject";

Surface.prototype.singlecavityHyperboloid = (
    pointCount = 20,
    ringCount = 10,
    R = 10,
    color = '#ff0000'
) => {
    const points: Point[] = [];
    const edges: Edge[] = [];
    const polygons: Polygon[] = [];

    // points
    for (let beta = Math.PI / 2; beta >= -Math.PI / 2; beta -= Math.PI / ringCount) {
        let r = (1.5 - Math.cos(beta)) * R;
        let height = Math.sin(beta) * R;
        for (let alpha = 0; alpha < Math.PI * 2; alpha += Math.PI / pointCount * 2) {
            let x = Math.cos(alpha) * r;
            let y = height;
            let z = Math.sin(alpha) * r;
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
    
    return new Subject(points, edges, polygons);
}
