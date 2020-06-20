window.requestAnimFrame = (function () {
    return window.requestAnimationFrame      ||
           window.webkitCancelAnimationFrame ||
           window.mozRequestAnimationFrame   ||
           window.oRequestAnimationFrame     ||
           window.msRequestAnimationFrame    ||
           function (callback) {
               window.setTimeout(callback, 1000 / 60);
           };
})();

window.onload = function () {
    const WINDOW = {
        LEFT: -10,
        BOTTOM: -10,
        WIDTH: 20,
        HEIGHT: 20,
        P1: new Point(-10, 10, -30), // левый верхний угол
        P2: new Point(-10, -10, -30), // левый нижний угол
        P3: new Point(10, -10, -30), // правый нижний угол
        CENTER: new Point(0, 0, -30), // центр окошка, через которое видим мир
        CAMERA: new Point(0, 0, -50) // точка, из которой смотрим на мир
    };
    const ZOOM_OUT = 1.1;
    const ZOOM_IN = 0.9;

    const sur = new Surfaces;
    const canvas = new Canvas({id: 'canvas', width: 800, height: 800, WINDOW, callbacks: { wheel, mousemove, mouseup, mousedown}});
    const graph3D = new Graph3D({ WINDOW });
    const ui = new UI({ callbacks: {printPoints, printEdges, printPolygons, move}});
    // сцена
    const SCENE = [
        // ЗАЧЕТ

        sur.hyperbolicParaboloid(20, '#ffffff'),

        /*sur.sphere(25, 25, 10, new Point(0, 0, 0), '#fff100'),
        sur.sphere(25, 25, 3, new Point(15, 0, 0), '#05008b', {rotateOz: new Point(0, 0, 0)}, 1),
        sur.sphere(25, 25, 1, new Point(10, -20, -40), '#000000'),
        */ 
        // солнечная система
        /*sur.sphere(10, 10, 3, new Point(0, 0, 0), '#fff100', {rotateOz: new Point(0, 0 ,0)}, 1), //Солнце
        sur.sphere(10, 10, 0.1, new Point(-5, 0, 0), '#a5a154', {rotateOz: new Point(0, 0 ,0)}, 3),  // Меркурий
        sur.sphere(10, 10, 0.3, new Point(-10, 0, 0), '#be9921', {rotateOz: new Point(0, 0 ,0)}, 2), // Венера 
        sur.sphere(10, 10, 1, new Point(-15, 0, 0), '#1200c2', {rotateOz: new Point(0, 0 ,0)}, 1.5),  // Земля
        sur.sphere(10, 10, 0.1, new Point(-16.5, 0, 0), '#535353', {rotateOz: new Point(0, 0 ,0)}, 1.5), // Луна
        sur.sphere(10, 10, 0.9, new Point(-20, 0, 0), '#a63700', {rotateOz: new Point(0, 0 ,0)}, 0.8),  // Марс
        sur.sphere(10, 10, 1.5, new Point(-25, 0, 0), '#c8a283', {rotateOz: new Point(0, 0 ,0)}, 0.5), // Юпитер
        sur.bublik(20, 2.5, new Point(-25, 0, 0), '#2d2118', {rotateOz: new Point(0, 0, 0)}, 0.5), // кольцо Юпитера
        sur.sphere(10, 10, 1.2, new Point(-30, 0, 0), '#c6a452', {rotateOz: new Point(0, 0 ,0)}, 0.35),  // Сатурн
        sur.sphere(10, 10, 1.1, new Point(-35, 0, 0), '#0081c6', {rotateOz: new Point(0, 0 ,0)}, 0.2), // Уран
        sur.sphere(10, 10, 1.1, new Point(-40, 0, 0), '#004e77', {rotateOz: new Point(0, 0 ,0)}, 0.1),  // Нептун */
        // фигуры
        //sur.cone(20, 20, 5),
        //sur.cube(0, 0, 5),
        //sur.doublecavityHyperboloid(20), 
        //sur.ellipsoid(20 ,20, 10), 
        //sur.ellipticCylinder(20, 20, 10), 
        //sur.ellipticParaboloid(20),
        //sur.hyperbolicCylinder(20),
        //sur.hyperbolicParaboloid(20),
        //sur.parabolicCylinder(20), 
        //sur.paraboloid(10, 20),
        //sur.singlecavityHyperboloid(20, 10, 10),
    ];
    const LIGHT = new Light(10, -20, -40, 10000); // источник света

    let canRotate = 0;
    let canPrint = {
        points: false,
        edges: false,
        polygons: true
    };

    // inputs
    function printPoints(value) {
        canPrint.points = value;
    }
    function printEdges(value) {
        canPrint.edges = value;
    }
    function printPolygons(value) {
        canPrint.polygons = value;
    }

    // about callbacks
    function wheel(event) {
        /*const delta = (event.wheelDelta > 0) ? ZOOM_IN : ZOOM_OUT;
        graph3D.zoomMatrix(delta);
        SCENE.forEach(subject => {
            subject.points.forEach(point => graph3D.transform(point));
            if (subject.animation) {
                for (let key in subject.animation) {
                    if (key === 'rotateOx' || key === 'rotateOy' || key === 'rotateOz') {
                        graph3D.transform(subject.animation[key]);
                    }
                }
            }
        });*/
        const delta = (event.wheelDelta > 0) ? ZOOM_IN : ZOOM_OUT;
        graph3D.zoomMatrix(delta);
        SCENE.forEach(subject => {
            subject.points.forEach(point => graph3D.transform(point));
            if (subject.animation) {
                for (let key in subject.animation) {
                    graph3D.transform(subject.animation[key]);
                }
            }
        });
    }

    function mouseup(){
        canRotate = false;
    }

    function mousedown(){
        canRotate = true;
    }

    function mousemove(event) {
        if (canRotate) {
            if (event.movementX) { // вращение вокруг Oy
                const alpha = canvas.sx(event.movementX) / WINDOW.CAMERA.z / 50;
                graph3D.rotateOyMatrix(alpha)
                SCENE.forEach(subject => {
                    subject.points.forEach(point => graph3D.transform(point));
                    if (subject.animation) {
                        for (let key in subject.animation) {
                            graph3D.transform(subject.animation[key]);
                        }
                    }
                });
            }
            if (event.movementY) { // вращение вокруг Ox
                const alpha = canvas.sy(event.movementY) / -WINDOW.CAMERA.z / 50;                
                graph3D.rotateOxMatrix(alpha);
                SCENE.forEach(subject => {
                    subject.points.forEach(point => graph3D.transform(point));
                    if (subject.animation) {
                        for (let key in subject.animation) {
                            graph3D.transform(subject.animation[key]);
                        }
                    }
                });
            }
        }
    }

    function move(direction) {
        switch(direction) {
            case 'up': graph3D.rotateOxMatrix(Math.PI / 180); break;
            case 'down': graph3D.rotateOxMatrix(-Math.PI / 180); break;
            case 'left': graph3D.rotateOyMatrix(Math.PI / 180); break;
            case 'right': graph3D.rotateOyMatrix(-Math.PI / 180); break;
        }
        graph3D.transform(WINDOW.CAMERA);
        graph3D.transform(WINDOW.CENTER);
        graph3D.transform(WINDOW.P1);
        graph3D.transform(WINDOW.P2);
        graph3D.transform(WINDOW.P3);
    }
    
    // about render
    function printAllPolygons() {
        if (canPrint.polygons) {
            const polygons = [];
            // предварительные расчеты
            SCENE.forEach(subject => {
                //graph3D.calcCorner(subject, WINDOW.CAMERA); // определяем какие полигоны видимы
                graph3D.calcCenters(subject); // найти центры всех полигонов
                graph3D.calcDistance(subject, WINDOW.CAMERA, 'distance'); // записать дистанцию от полигонов до камеры
                graph3D.calcDistance(subject, LIGHT, 'lumen'); // записать дистанцию от полигонов до источника света
            });
            // расчет освещенности полигона и его проекции на экран
            SCENE.forEach(subject => {
                for (let i = 0; i < subject.polygons.length; i++) {
                    if (subject.polygons[i].visible) {
                        const polygon = subject.polygons[i];
                        const point1 = graph3D.getProection(subject.points[polygon.points[0]]);
                        const point2 = graph3D.getProection(subject.points[polygon.points[1]]);
                        const point3 = graph3D.getProection(subject.points[polygon.points[2]]);
                        const point4 = graph3D.getProection(subject.points[polygon.points[3]]);
                        let {r, g, b} = polygon.color;
                        const { isShadow, dark} = graph3D.calcShadow(polygon, subject, SCENE, LIGHT);
                        const lumen = (isShadow) ? dark : graph3D.calcIllumination(polygon.lumen, LIGHT.lumen);
                        r = Math.round(r * lumen);
                        g = Math.round(g * lumen);
                        b = Math.round(b * lumen);
                        polygons.push({
                            points: [point1, point2, point3, point4],
                            color: polygon.rgbToHex(r, g, b),
                            distance: polygon.distance
                        });
                    }
                }
            });
            // отрисовка всех полигонов
            polygons.sort((a, b) => b.distance - a.distance); // сортировка полиговнов
            let number = 1;
            polygons.forEach(polygon => {canvas.polygon(polygon.points, polygon.color, number++)});
        }
    }
    
    function printSubject(subject) {
        // print edges
        if (canPrint.edges) {
            /*for (let i = 0; i < subject.edges.length; i++) {
                const edges = subject.edges[i];
                const point1 = subject.points[edges.p1];
                const point2 = subject.points[edges.p2];
                canvas.line(graph3D.xs(point1), graph3D.ys(point1), graph3D.xs(point2), graph3D.ys(point2));
            }*/
            for (let i = 0; i < subject.edges.length; i++) {
                const edges = subject.edges[i];
                const point1 = graph3D.getProection(subject.points[edges.p1]);
                const point2 = graph3D.getProection(subject.points[edges.p2]);
                canvas.line(point1.x, point1.y, point2.x, point2.y);
            }
        }
        // print points
        if (canPrint.points) {
            /*for (let i = 0; i < subject.points.length; i++) {
                const points = subject.points[i];
                canvas.point(graph3D.xs(points), graph3D.ys(points));
            }*/
            for (let i = 0; i < subject.points.length; i++) {
                const point = graph3D.getProection(subject.points[i]);
                canvas.point(point.x, point.y);
            }
        }
    }

    function render() {
        canvas.clear();
        printAllPolygons();
        SCENE.forEach(subject => printSubject(subject));
        canvas.text(-7, 7, FPSout);
        canvas.text(-10, 10, 'aaa');
        canvas.render();
    }

    function animation() {
        // анимация вращения
        SCENE.forEach(subject => {
            if (subject.animation) {
                for (let key in subject.animation) {
                    if (key === 'rotateOx' || key === 'rotateOy' || key === 'rotateOz') {
                        const {x, y, z} = subject.animation[key];
                        const xn = WINDOW.CENTER.x - x;
                        const yn = WINDOW.CENTER.y - y;
                        const zn = WINDOW.CENTER.z - z;
                        const alpha = Math.PI / 180 * subject.speedCoef;
                        graph3D.animateMatrix(xn, yn, zn, key, alpha, -xn, -yn, -zn);
                        subject.points.forEach(point => {graph3D.transform(point)});
                    }
                }
                /*for (let key in subject.animation) {
                    const { x, y, z } = subject.animation[key];
                    const xn = WINDOW.CENTER.x - x;
                    const yn = WINDOW.CENTER.y - y;
                    const zn = WINDOW.CENTER.z - z;
                    const alpha = Math.PI / 180;
                    graph3D.animateMatrix(xn, yn, zn, key, alpha, -xn, -yn, -zn);
                    subject.points.forEach(point => graph3D.transform(point));
                }*/
            }
        });
    }

    setInterval(animation, 10);

    let FPS = 0;
    let FPSout = 0;
    let timestemp = (new Date()).getTime();
    (function animloop () {
        // вывод FPS
        FPS++;
        const currentTimestemp = (new Date()).getTime();
        if (currentTimestemp - timestemp >= 1000) {
            timestemp = currentTimestemp;
            FPSout = FPS;
            FPS = 0;
        }
        graph3D.calcPlaneEquation(); // получить и записать плоскость экрана
        graph3D.calcWindowVectors(); // вычислить векторы экрана
        // отрисовка сцены
        render();
        requestAnimFrame(animloop);
    })();
}; 