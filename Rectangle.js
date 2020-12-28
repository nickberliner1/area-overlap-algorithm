// Sets attributes for each rectangle
class Rectangle {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    // Returns true or false based on whether coordings overlap
    doesItOverlap(coords) {
        let [x, y] = coords;
        if (x >= this.x
            && x < this.x + this.width
            && y >= this.y
            && y < this.y + this.height) {
            return true;
        }
        return false;
    }
    calculateArea() {
        return this.width * this.height;
    }
    // Returns a new Rectangle object from an array of coordinates
    static build(arr) {

        let xCoords = arr.map(coords => coords[0]).sort();
        let yCoords = arr.map(coords => coords[1]).sort();

        let [x1, , x2] = xCoords;
        let [y1, , y2] = yCoords;

        let width = Math.abs(x1 - x2);
        let height = Math.abs(y1 - y2);
        let x = Math.min(x1, x2);
        let y = Math.min(y1, y2);

        return new Rectangle(x, y, width, height);
    }
}





function detect(strArr) {
    // turns string array into normal array
    let coords = strArr[0]
        .match(/(-?\d+,-?\d+)/g)
        .map(pair => pair.split(/\s*,\s*/).map(num => Number(num)));
  
    let first = Rectangle.build(coords.splice(0, 4));
    let second = Rectangle.build(coords);

    let overlap = 0;
    for ( let coords of second ) {
      if ( first.doesItOverlap(coords) ) {
        overlap ++
      }
    }

    if (overlap === 0) {
        return 0;
    }
    return overlap;
}

console.log(detect(["(0,0),(2,2),(2,0),(0,2),(1,0),(1,2),(6,0),(6,2)"]));