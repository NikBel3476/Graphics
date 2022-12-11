import {Point} from "../graph3D/entities/Point";

type canvasConstructorParams = {
    id: string;
    width: number;
    height: number;
    WINDOW: { LEFT: number, BOTTOM: number, WIDTH: number, HEIGHT: number };
    callbacks: {
        wheel: (args: any) => void;
        mousemove: (args: any) => void;
        mouseup: (args: any) => void;
        mousedown: (args: any) => void;
    }
}

export class Canvas {
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    canvasV: HTMLCanvasElement;
    contextV: CanvasRenderingContext2D;
    WINDOW: { LEFT: number, BOTTOM: number, WIDTH: number, HEIGHT: number };
    PI2: number;

    constructor({
        id,
        width = 300,
        height = 300,
        WINDOW = { LEFT: -5, BOTTOM: -5, WIDTH: 20, HEIGHT: 20 },
        callbacks
    }: canvasConstructorParams) {
        if (id) {
            this.canvas = document.getElementById(id) as HTMLCanvasElement;
        } else {
            this.canvas = document.createElement('canvas');
            document.querySelector('body')!.appendChild(this.canvas);
        }
        this.context = this.canvas.getContext('2d')!;
        this.canvas.width  = width;
        this.canvas.height = height;

        // виртуальный canvas
        this.canvasV = document.createElement('canvas');
        this.contextV = this.canvasV.getContext('2d')!;
        this.canvasV.width  = width;
        this.canvasV.height = height;

        this.WINDOW = WINDOW;
        this.PI2 = 2 * Math.PI;
        // callbacks
        const wheel = (callbacks.wheel instanceof Function) ? callbacks.wheel : function () {};
        const mousemove = (callbacks.mousemove instanceof Function) ? callbacks.mousemove : function () {};
        const mouseup = (callbacks.mouseup instanceof Function) ? callbacks.mouseup : function () {};
        const mousedown = (callbacks.mousedown instanceof Function) ? callbacks.mousedown : function () {};
        this.canvas.addEventListener('wheel', wheel);
        this.canvas.addEventListener('mousemove', mousemove);
        this.canvas.addEventListener('mouseup', mouseup);
        this.canvas.addEventListener('mousedown', mousedown);
    }

    xs(x: number): number {
        return (x - this.WINDOW.LEFT) / this.WINDOW.WIDTH * this.canvas.width;
    }

    ys(y: number): number {
        return this.canvas.height - (y - this.WINDOW.BOTTOM) / this.WINDOW.HEIGHT * this.canvas.height;
    }

    xsPolygon(x: number): number {
        return x / this.WINDOW.WIDTH * this.canvas.width + this.canvas.width / 2;
    }

    ysPolygon(y: number): number {
        return this.canvas.height - y / this.WINDOW.HEIGHT * this.canvas.height - this.canvas.height / 2;
    }

    sx(x: number): number {
        return x * this.WINDOW.WIDTH / this.canvas.width + this.WINDOW.LEFT;
    }
    sy(y: number): number {
        return (this.canvas.height - y) * this.WINDOW.HEIGHT / this.canvas.height + this.WINDOW.BOTTOM;
    }

    clear() {
        this.contextV.fillStyle = '#eeeeee';
        this.contextV.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    line(x1: number, y1: number, x2: number, y2: number, color = '#0f0', width = 2) {
        this.contextV.beginPath();
        this.contextV.strokeStyle = color;
        this.contextV.lineWidth = width;
        this.contextV.moveTo(this.xs(x1), this.ys(y1));
        this.contextV.lineTo(this.xs(x2), this.ys(y2));
        this.contextV.stroke();
    }

    point(x: number, y: number, color = '#f00', size = 2) {
        this.contextV.beginPath();
        this.contextV.strokeStyle = color;
        this.contextV.arc(this.xs(x), this.ys(y), size, 0, this.PI2);
        this.contextV.stroke();
    }

    text(x: number, y: number, text: string, font = '15px bond Arial', color = '#000') {
        this.contextV.fillStyle = color;
        this.contextV.font = font;
        this.contextV.fillText(text, this.xs(x), this.ys(y));
    }

    polygon(points: Point[], color = '008800BB') {
        this.contextV.fillStyle = color;
        this.contextV.strokeStyle = color;
        this.contextV.beginPath();
        this.contextV.moveTo(this.xsPolygon(points[0].x), this.ysPolygon(points[0].y));
        for (let i = 1; i < points.length; i++) {
            this.contextV.lineTo(this.xsPolygon(points[i].x), this.ysPolygon(points[i].y));
        }
        this.contextV.closePath();
        this.contextV.fill();
        // текст
        this.contextV.fillStyle = '#000000';
        this.contextV.font = '10px Verdana';
        // нумерация полигонов
        // this.contextV.fillText(`${number}`, this.xsPolygon(points[0].x), this.ysPolygon(points[0].y));
    }

    render() {
        this.context.drawImage(this.canvasV, 0, 0);
    }
}
