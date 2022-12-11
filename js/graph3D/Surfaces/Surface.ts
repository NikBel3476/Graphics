import {Subject} from "../entities/Subject";
import {Point} from "../entities/Point";

export class Surface {
    constructor() {}

    bublik(count: number, R: number, point: Point, color: string, animation, speedCoef?: number): Subject {
        return this.bublik(count, R, point, color, animation, speedCoef);
    }
    cone(pointCount?: number, ringCount?: number, point?: Point, color?: string, R?: number): Subject {
        return this.cone(pointCount, ringCount, point, color, R);
    }
    cube(x?: number, y?: number, z?: number, size?: number, color?: string) {
        return this.cube(x, y, z, size, color);
    }
    doublecavityHyperboloid(count?: number, point?: Point, color?: string) {
        return this.doublecavityHyperboloid(count, point, color);
    }
    ellipsoid(pointCount?: number, ringCount?: number, R?: number, color?: string, a?: number, b?: number) {
        return this.ellipsoid(pointCount, ringCount, R, color, a, b);
    };
    ellipticCylinder(pointCount?: number, ringCount?: number, R?: number, color?: string) {
        return this.ellipticCylinder(pointCount, ringCount, R, color);
    };
    ellipticParaboloid(count?: number, color?: string) {
        return this.ellipticParaboloid(count, color);
    };
    hyperbolicParaboloid(count?: number, color?: string): Subject {
        return this.hyperbolicParaboloid(count, color);
    };
    hyperbolicCylinder(count?: number, color?: string) {
        return this.hyperbolicCylinder(count, color);
    };
    parabolicCylinder(count?: number, color?: string) {
        return this.parabolicCylinder(count, color);
    };
    paraboloid(pointCount?: number, length?: number, color?: string) {
        return this.paraboloid(pointCount, length, color);
    };
    singlecavityHyperboloid(pointCount?: number, ringCount?: number, R?: number, color?: string) {
        return this.singlecavityHyperboloid(pointCount, ringCount, R, color);
    };
    sphere(pointCount: number, ringCount: number, R: number, point: Point, color: string, animation, speedCoef?: number) {
        return this.sphere(pointCount, ringCount, R, point, color, animation, speedCoef);
    };
}
