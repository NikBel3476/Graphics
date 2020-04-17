Surfaces.prototype.sphere = (x = 0, y = 0, z = 0, r = 10) => {
    const pointNumber = 100;
    const deltaAngle = 2 * Math.PI / pointNumber;
    let angle;
    const points = [];
    const edges = [];

    angle = 0;
    for (let i = 0; i < pointNumber; i++) {
        points.push(new Point(r * Math.cos(angle) + x, r * Math.sin(angle) + y, z));
        angle += deltaAngle;
    }
    for (let i = 0; i < pointNumber - 1; i++) {
        edges.push(new Edge(i, i + 1));
    } 
    edges.push(new Edge(pointNumber - 1, 0));
    
    angle = 0;
    for (let i = 0; i < pointNumber; i++) {
        points.push(new Point(x, r * Math.sin(angle) + y, r * Math.cos(angle) + z));
        angle += deltaAngle;
    }
    for (let i = pointNumber; i < pointNumber * 2 - 1; i++) {
        edges.push(new Edge(i, i + 1));
    } 
    edges.push(new Edge(pointNumber * 2 - 1, pointNumber));
    
    angle = 0;
    for (let i = 0; i < pointNumber; i++) {
        points.push(new Point(r * Math.cos(angle) + x, y, r * Math.sin(angle) + z));
        angle += deltaAngle;
    }
    for (let i = pointNumber * 2; i < pointNumber * 3 - 1; i++) {
        edges.push(new Edge(i, i + 1));
    } 
    edges.push(new Edge(pointNumber * 3 - 1, pointNumber * 2));
    
    angle = 0;
    for (let i = 0; i < pointNumber; i++) {
        points.push(new Point(r * Math.cos(angle) + x, r * Math.cos(angle) + y, r * Math.sin(angle) + z));
        angle += deltaAngle;
    }
    for (let i = pointNumber * 3; i < pointNumber * 4 - 1; i++) {
        edges.push(new Edge(i, i + 1));
    } 
    edges.push(new Edge(pointNumber * 4 - 1, pointNumber * 3));

    /*angle = 0;
    for (let i = 0; i < pointNumber; i++) {
        points.push(new Point(r * Math.cos(angle) + x, r * Math.sin(angle) + y, r * Math.sin(angle) + z));
        angle += deltaAngle;
    }
    for (let i = pointNumber * 4; i < pointNumber * 5 - 1; i++) {
        edges.push(new Edge(i, i + 1));
    } 
    edges.push(new Edge(pointNumber * 5 - 1, pointNumber * 4));*/
    
    return new Subject(points, edges);
}