import {Subject} from "../entities/Subject";
import {Point} from "../entities/Point";

export class Surface {
    constructor() {}

    circle(count: number, R: number, point: Point, color: string, animation: { [key: string]: Point } | null, speedCoef?: number): Subject {
        return this.circle(count, R, point, color, animation, speedCoef);
    }

    cone(pointCount?: number, ringCount?: number, point?: Point, color?: string, R?: number): Subject {
        return this.cone(pointCount, ringCount, point, color, R);
    }

    cube(x?: number, y?: number, z?: number, size?: number, color?: string): Subject {
        return this.cube(x, y, z, size, color);
    }

    doublecavityHyperboloid(count?: number, point?: Point, color?: string): Subject {
        return this.doublecavityHyperboloid(count, point, color);
    }

    ellipsoid(pointCount?: number, ringCount?: number, R?: number, color?: string, a?: number, b?: number): Subject {
        return this.ellipsoid(pointCount, ringCount, R, color, a, b);
    }

    ellipticCylinder(pointCount?: number, ringCount?: number, R?: number, color?: string): Subject {
        return this.ellipticCylinder(pointCount, ringCount, R, color);
    }

    ellipticParaboloid(count?: number, color?: string): Subject {
        return this.ellipticParaboloid(count, color);
    }

    hyperbolicParaboloid(count?: number, color?: string): Subject {
        return this.hyperbolicParaboloid(count, color);
    }

    hyperbolicCylinder(count?: number, color?: string): Subject {
        return this.hyperbolicCylinder(count, color);
    }

    parabolicCylinder(count?: number, color?: string): Subject {
        return this.parabolicCylinder(count, color);
    }

    paraboloid(pointCount?: number, length?: number, color?: string): Subject {
        return this.paraboloid(pointCount, length, color);
    }

    singlecavityHyperboloid(pointCount?: number, ringCount?: number, R?: number, color?: string): Subject {
        return this.singlecavityHyperboloid(pointCount, ringCount, R, color);
    }

    sphere(
        pointCount: number,
        ringCount: number,
        R: number,
        point: Point,
        color: string,
        animation: { [key: string]: Point } | null,
        speedCoef?: number
    ): Subject {
        return this.sphere(pointCount, ringCount, R, point, color, animation, speedCoef);
    }
}
