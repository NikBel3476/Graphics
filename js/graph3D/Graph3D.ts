import {Math3D} from "./Math3D";
import {Point} from "./entities/Point";
import {Subject} from "./entities/Subject";
import {Polygon} from "./entities/Polygon";
import {Light} from "./entities/Light";

type Graph3DConstructorParams = {
    WINDOW: {
        LEFT: number,
        BOTTOM: number,
        WIDTH: number,
        HEIGHT: number,
        P1: Point,
        P2: Point,
        P3: Point,
        CENTER: Point,
        CAMERA: Point
    };
}

export class Graph3D {
    WINDOW: {
        LEFT: number,
        BOTTOM: number,
        WIDTH: number,
        HEIGHT: number,
        P1: Point,
        P2: Point,
        P3: Point,
        CENTER: Point,
        CAMERA: Point
    };
    math: Math3D;
    P1P2!: Point;
    P2P3!: Point;

    constructor({ WINDOW }: Graph3DConstructorParams) {
        this.WINDOW = WINDOW;
        this.math = new Math3D();
    }

    // не нужны
    /*xs(point) {
        const zs = this.WINDOW.CENTER.z;
        const z0 = this.WINDOW.CAMERA.z;
        const x0 = this.WINDOW.CAMERA.x;
        return (point.x - x0) / (point.z - z0) * (zs - z0) + x0;
    }

    ys(point) {
        const zs = this.WINDOW.CENTER.z;
        const z0 = this.WINDOW.CAMERA.z;
        const y0 = this.WINDOW.CAMERA.y;
        return (point.y - y0) / (point.z - z0) * (zs - z0) + y0;
    }*/
    // масштабирование точки
    zoomMatrix(delta: number) {
        this.math.transformMatrix([this.math.zoomMatrix(delta)]);
    }

    moveMatrix(sx: number, sy: number, sz: number): void {
        this.math.transformMatrix([this.math.moveMatrix(sx, sy, sz)]);
    }

    rotateOxMatrix(alpha: number): void {
        this.math.transformMatrix([this.math.rotateOxMatrix(alpha)]);
    }

    rotateOyMatrix(alpha: number): void {
        this.math.transformMatrix([this.math.rotateOyMatrix(alpha)]);
    }

    rotateOzMatrix(alpha: number): void {
        this.math.transformMatrix([this.math.rotateOzMatrix(alpha)]);
    }

    animateMatrix(x1: number, y1: number, z1: number, key: string, alpha: number, x2: number, y2: number, z2: number): void {
        this.math.transformMatrix([
            this.math.moveMatrix(x1, y1, z1),
            // @ts-ignore
            this.math[`${key}Matrix`](alpha),
            this.math.moveMatrix(x2, y2, z2)
        ]);
    }

    transform(point: Point): void {
        this.math.transform(point);
    }

    // посчитать центры всех полигонов
    calcCenters(subject: Subject): void {
        for (let i = 0; i < subject.polygons.length; i++) {
            const polygon = subject.polygons[i];
            const points = polygon.points;
            let x = 0, y = 0, z = 0;
            for (let j = 0; j < points.length; j++) {
                x += subject.points[points[j]].x;
                y += subject.points[points[j]].y;
                z += subject.points[points[j]].z;
            }
            polygon.center.x = x / points.length;
            polygon.center.y = y / points.length;
            polygon.center.z = z / points.length;
        }
    }
    // расчет расстояния от полигона до точки
    calcDistance(subject: Subject, endPoint: Point, name: string): void {
        for (let i = 0; i < subject.polygons.length; i++) {
            const polygon = subject.polygons[i];
            if (polygon.visible) {
                /*const points = subject.polygons[i].points;
                let x = 0, y = 0, z = 0;
                for (let j = 0; j < points.length; j++) {
                    x += subject.points[points[j]].x;
                    y += subject.points[points[j]].y;
                    z += subject.points[points[j]].z;
                }
                x /= points.length;
                y /= points.length;
                z /= points.length;*/
                // @ts-ignore
                polygon[name] = Math.sqrt(Math.pow(endPoint.x - polygon.center.x, 2) +
                                          Math.pow(endPoint.y - polygon.center.y, 2) + 
                                          Math.pow(endPoint.z - polygon.center.z, 2));
            }
        }
    }

    calcIllumination(distance: number, lumen: number): number {
        let illum = (distance) ? lumen / (distance * distance) : 1;
        return (illum > 1) ? 1 : illum;
    }

    calcShadow(
        polygon: Polygon,
        subject: Subject,
        SCENE: Subject[],
        LIGHT: Light
    ): { isShadow: boolean, dark: number } | undefined {
        const M1 = polygon.center;
        const s = this.math.calcVector(M1, LIGHT);
        // FIXME: loop runs 1 time
        for (let i = 0; i < SCENE.length; i++) {
            if (subject.id !== SCENE[i].id) {
                for (let j = 0; j < SCENE[i].polygons.length; j++) {
                    const polygon2 = SCENE[i].polygons[j];
                    if (polygon2.visible) {
                        const M0 = polygon2.center;
                        // если полигон сравнивается сам с собой
                        if (M1.x === M0.x && M1.y === M0.y && M1.z === M0.z) {
                            continue;
                        }
    
                        // не учитывать полигоны, которые находятся дальше
                        if (polygon2.lumen > polygon.lumen) {
                            continue;
                        }
    
                        const dark = this.math.calcVectorModule(
                                    this.math.vectorProd(this.math.calcVector(M0, M1), s)) / 
                                    this.math.calcVectorModule(s);
                        if (dark < 0.5) {
                            return {
                                isShadow: true, 
                                dark: dark / 10
                            };
                        } 
                    }
                }
            }

            // FIXME: maybe move it out from loop body
            return {
                isShadow: false,
                dark: 1
            };
        }
    }

    calcCorner(subject: Subject, endPoint: Point): void {
        const perpendicular = Math.cos(Math.PI / 2);
        const viewVector = this.math.calcVector(endPoint, new Point(0 ,0 ,0));
        for (let i = 0; i < subject.polygons.length; i++) {
            const points = subject.polygons[i].points;
            const vector1 = this.math.calcVector(subject.points[points[0]], subject.points[points[1]]);
            const vector2 = this.math.calcVector(subject.points[points[0]], subject.points[points[2]]);
            const vector3 = this.math.vectorProd(vector1, vector2);
            subject.polygons[i].visible = this.math.calcGorner(viewVector, vector3) <= perpendicular;
        }
    }

    calcPlaneEquation(): void {
        this.math.calcPlaneEquation(this.WINDOW.CAMERA, this.WINDOW.CENTER);
    }

    getProection(point: Point): Omit<Point, 'z'> {
        const M = this.math.getProection(point);
        const P2M = this.math.calcVector(this.WINDOW.P2, M);
        const cosa = this.math.calcGorner(this.P1P2, M);
        const cosb = this.math.calcGorner(this.P2P3, M);
        const module = this.math.calcVectorModule(P2M);
        return {
            x: cosa * module,
            y: cosb * module
        };
    }

    calcWindowVectors() {
        this.P1P2 = this.math.calcVector(this.WINDOW.P2, this.WINDOW.P1);
        this.P2P3 = this.math.calcVector(this.WINDOW.P2, this.WINDOW.P3);
    }
}
