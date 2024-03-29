import {Point} from "./entities/Point";

export class Math3D {
    matrix: {
        transform: number[][];
    };
    plane: { A: number; B: number; C: number; x0: number; y0: number; z0: number; xs0: number; ys0: number; zs0: number; };

    constructor() {
        this.matrix = {
            transform: [[1, 0, 0, 0],
                        [0, 1, 0, 0],
                        [0, 0, 1, 0],
                        [0, 0, 0, 1]]
        }
    
        // уравнение плоскости в удобном виде
        this.plane = {
            // нормальный вектор
            A: 0,
            B: 0,
            C: 0,
            // точка плоскости (смещение)
            x0: 0,
            y0: 0,
            z0: 0,
            // точка камеры
            xs0: 0,
            ys0: 0,
            zs0: 0
        }
    }

    calcVector(a: Point, b: Point): Point {
        return {
            x: b.x - a.x,
            y: b.y - a.y,
            z: b.z - a.z
        }
    }

    vectorProd(a: Point, b: Point): Point {
        return {
            x: a.y * b.z - a.z * b.y,
            y: a.z * b.x - a.x * b.z,
            z: a.x * b.y - a.y * b.x
        }
    }

    // расчет уравнения плоскости и запись его в структуру
    // point1 - камера 
    // point2 - центр экрана
    calcPlaneEquation(point1: Point, point2: Point): void {
        const vector = this.calcVector(point1, point2);
        // координаты плоскости
        this.plane.A = vector.x;
        this.plane.B = vector.y;
        this.plane.C = vector.z;
        this.plane.x0 = point2.x;
        this.plane.y0 = point2.y;
        this.plane.z0 = point2.z;
        // дописать камеру
        this.plane.xs0 = point1.x;
        this.plane.ys0 = point1.y;
        this.plane.zs0 = point1.z;
    }

    // получить проекцию точки на плоскость экрана относительно камеры
    getProection(point: Point): Point {
        const {A, B, C, x0, y0, z0, xs0, ys0, zs0} = this.plane;
        const m = point.x - xs0;
        const n = point.y - ys0;
        const p = point.z - zs0;
        const t = (A*(x0 - xs0) + B*(y0 - ys0) + C*(z0 - zs0)) / (A*m + B*n + C*p);
        const ps = {
            x: x0 + m * t,
            y: y0 + n * t,
            z: z0 + p * t
        }
        return {
            x: ps.x, //- A,
            y: ps.y, //- B,
            z: ps.z //- C
        }
    }

    scalProd(a: Point, b: Point): number {
        return a.x * b.x + a.y * b.y + a.z * b.z;
    }

    calcGorner(a: Point, b: Point): number {
        return this.scalProd(a, b) / (Math.sqrt(this.scalProd(a, a) * this.scalProd(b, b)));
    }

    calcVectorModule(a: Point): number {
        return Math.sqrt(Math.pow(a.x, 2) + Math.pow(a.y, 2) + Math.pow(a.z, 2));
    }

    // перемножение матрицы преобразования на точку
    // m = [x, y, z, 1]
    // T = [[],[],[],[]] по 4 элемента
    multMatrix(T: number[][], m: number[]): number[] {
        const c = [0, 0, 0, 0];
        //const rows = T.length;
        //const colomns = m.length;
        for (let i = 0; i < 4 /*rows*/; i++) {
            let S = 0;
            for (let j = 0; j < 4 /*colomns*/; j++) {        
                S += T[j][i] * m[j];   
            }
            c[i] = S;
        }
        return c;
    }

    multMatrixes(A: number[][], B: number[][]): number[][] {
        const C = [[0, 0, 0, 0], 
                   [0, 0, 0, 0], 
                   [0, 0, 0, 0], 
                   [0, 0, 0, 0]];
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                let s = 0;
                for (let k = 0; k < 4; k++) {
                    s += A[i][k] * B[k][j];
                }
                C[i][j] = s;
            }
        }
        return C;
    }

    zoomMatrix(delta: number): number[][] {
        return [[delta,  0,  0, 0],
                [ 0, delta,  0, 0],
                [ 0,  0, delta, 0],
                [ 0,  0,     0, 1]];
    }

    moveMatrix(sx: number, sy: number, sz: number): number[][] {
        return [[ 1,  0,  0, 0],
                [ 0,  1,  0, 0],
                [ 0,  0,  1, 0],
                [sx, sy, sz, 1]];
    }

    rotateOxMatrix(alpha: number): number[][] {
        return [[1, 0, 0, 0],
                [0,  Math.cos(alpha), Math.sin(alpha), 0],
                [0, -Math.sin(alpha), Math.cos(alpha), 0],
                [0, 0, 0, 1]];
    }

    rotateOyMatrix(alpha: number): number[][] {
        return [[Math.cos(alpha), 0, -Math.sin(alpha), 0],
                [0, 1, 0, 0],
                [Math.sin(alpha), 0, Math.cos(alpha), 0],
                [0, 0, 0, 1]];
}

    rotateOzMatrix(alpha: number): number[][] {
        return [[ Math.cos(alpha), Math.sin(alpha), 0, 0],
                [-Math.sin(alpha), Math.cos(alpha), 0, 0],
                [0, 0, 1, 0],
                [0, 0, 0, 1]]
    }

    // заполнить общую матрицу перобразований (на основании массива)
    transformMatrix(matrixes: number[][][] = []) {
        this.matrix.transform = [[1, 0, 0, 0],
                                 [0, 1, 0, 0],
                                 [0, 0, 1, 0],
                                 [0, 0, 0, 1]];
        matrixes.forEach(matrix => {this.matrix.transform = this.multMatrixes(this.matrix.transform, matrix)});
    }

    // функция преобразований точки относительно матрицы
    transform(point: Point): void {
        const array = this.multMatrix(this.matrix.transform, [point.x, point.y, point.z, 1]);
        point.x = array[0];
        point.y = array[1];
        point.z = array[2];
    }
}
