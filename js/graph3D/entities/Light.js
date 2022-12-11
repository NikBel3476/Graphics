import {Point} from "./Point";

export class Light extends Point {
    constructor(x, y, z, lumen = 100) {
        super(x, y, z);
        this.lumen = lumen;
    }
}
