type UIConstructorParams = {
    callbacks: {
        printPoints: (args: any) => any;
        printEdges: (args: any) => any;
        printPolygons: (args: any) => any;
        move: (args: any) => any;
    };
}

export class UI {
    move: (args: any) => any;

    constructor({ callbacks }: UIConstructorParams) {
        // callbacks
        const printPoints = (callbacks.printPoints instanceof Function) ? callbacks.printPoints : function () {};
        const printEdges = (callbacks.printEdges instanceof Function) ? callbacks.printEdges : function () {};
        const printPolygons = (callbacks.printPolygons instanceof Function) ? callbacks.printPolygons : function () {};
        this.move = (callbacks.move instanceof Function) ? callbacks.move : function () {};
        // events
        document.addEventListener('keydown', event => this.keyDown(event));
        (document.getElementById('pointsCheckbox') as HTMLInputElement).addEventListener('click', function() { printPoints(this.checked); });
        (document.getElementById('edgesCheckbox') as HTMLInputElement).addEventListener('click', function() { printEdges(this.checked); });
        (document.getElementById('polygonsCheckbox') as HTMLInputElement).addEventListener('click', function() { printPolygons(this.checked); });
    }

    keyDown(event: KeyboardEvent) {
        switch(event.keyCode) {
            case 37: return this.move('left');
            case 38: return this.move('up');
            case 39: return this.move('right');
            case 40: return this.move('down');
        }
    }
}
