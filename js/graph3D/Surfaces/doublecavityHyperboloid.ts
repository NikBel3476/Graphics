import {Surface} from "./Surface";
import {Point} from "../entities/Point";
import {Edge} from "../entities/Edge";
import {Polygon} from "../entities/Polygon";
import {Subject} from "../entities/Subject";

Surface.prototype.doublecavityHyperboloid = (count = 20, point = new Point(0, 0, 0), color = 'ff0000') => {
    const points = [];
    const edges = [];
    const polygons = [];

    //расставить точки
    const delta = Math.PI * 2 / count;
    function makePoints(a, b) {
        for (let i = 0; i <= Math.PI; i += delta) {
            for (let j = 0; j < Math.PI * 2; j += delta) {
                const x = a * point.x + 4 * i * Math.cos(j);
                const y = a * point.y + 4 * i * Math.sin(j);
                const z = b + a * i * i;
                points.push(new Point(x, y, z));
            }
        }
    }

    makePoints(1, 0);
    makePoints(-1, -10);

    //ребра
    for (let i = 0; i < points.length; i++) {
        //вдоль
        if (i + 1 < points.length && (i + 1) % count !== 0) {
            edges.push(new Edge(i + 1, i));
        } else if ((i + 1) % count === 0) {
            edges.push(new Edge(i + 1 - count, i));
        }
        //поверек
        if (i + count < points.length) {
            if (i + count < points.length / 2) {
                edges.push(new Edge(i, i + count));
            }
            if (i > points.length / 2) {
                edges.push(new Edge(i, i + count));
            }
        }
    }
    //полигоны
    for (let i = 0; i < points.length; i++) {
        if (i + count < points.length / 2) {
            if (i + 1 + count < points.length && (i + 1) % count !== 0) {
                polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count], color));
            } else if ((i + count) < points.length && (i + 1) % count === 0) {
                polygons.push(new Polygon([i, i + 1 - count, i + 1, i + count], color));
            }
        }
        if (i + 1 > points.length / 2) {
            if (i + 1 + count < points.length && (i + 1) % count !== 0) {
                polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count], color));
            } else if ((i + count) < points.length && (i + 1) % count === 0) {
                polygons.push(new Polygon([i, i + 1 - count, i + 1, i + count], color));
            }
        }
    }

    // НЕПРАВИЛЬНО

    // points
    /*for (let beta = Math.PI / 2; beta < Math.PI; beta += Math.PI / ringCount) {
        const y = R - Math.sin(beta) * R + 1;
        const r = Math.cos(beta) * R;
        for (let alfa = 0; alfa < 2 * Math.PI; alfa += Math.PI / pointCount * 2) {
            const x = Math.cos(alfa) * r;
            const z = Math.sin(alfa) * r;
            points.push(new Point(x, y, z)); 
        }
    }
    for (let beta = Math.PI / 2; beta < Math.PI; beta += Math.PI / ringCount) {
        const y = Math.sin(beta) * R - R - 1;
        const r = Math.cos(beta) * R;
        for (let alfa = 0; alfa < 2 * Math.PI; alfa += Math.PI / pointCount) {
            const x = Math.cos(alfa) * r;
            const z = Math.sin(alfa) * r;
            points.push(new Point(x, y, z)); 
        }
    }
    
    for (let i = 0; i + 1 < points.length; i++) {
        if ((i + 1) % (pointCount * 2) != 0) {
            edges.push(new Edge(i, i + 1));
        } else {
            edges.push(new Edge(i, i + 1 - pointCount * 2));
        }
    }
    // polygons
    for (let i = 0; i < points.length; i++) {
        if ((i + 1 + pointCount) < points.length && ((i + 1) % pointCount) != 0) {
            polygons.push(new Polygon([i, i + 1, i + 1 + pointCount, i + pointCount]));
        } else if ((i + pointCount) < points.length && ((i + 1) % pointCount) == 0) {
            polygons.push(new Polygon([i, i - pointCount + 1, i + 1, i + pointCount]));
        }
    }
    
    // 
    const size = 10;
    const delta = size / count;
    for (let i = 0; i < count; i++) {
        for (let j = 0; j < count; j++) {
            const x = i * delta - size / 2;
            const y = j * delta - size / 2;
            const z = Math.sqrt(x * x + y * y + 1);
            points.push(new Point(x, y, z));
            }
    }
    for (let i = 0; i < count; i++) {
            for (let j = 0; j < count; j++) {
                const x = i * delta - size / 2;
                const y = j * delta - size / 2;
                const z = -Math.sqrt(x * x + y * y + 1);
                points.push(new Point(x, y, z));
            }
    }

    // ребра
    for (let i = 0; i < points.length; i++) {
        if (i + 1 < points.length && (i + 1) % count != 0) {
            edges.push(new Edge(i, i + 1));
        }
        if (i + count < points.length) {
            edges.push(new Edge(i, i + count));
        }
    }
    //  полигоны
    for (let i = 0; i < points.length; i++) {
        if (i + 1 + count < points.length && (i + 1) % count != 0) {
            polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count]));
        }
    }
    */
    return new Subject(points, edges, polygons);
}
