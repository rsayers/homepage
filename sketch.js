var xstep = 1;
var ystep = 1;
var line_dist = 200;
var fps = 30;

function pdist(p1, p2) {
    return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
}

class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.xstep = random(-1.5, 1.5);
        this.ystep = random(-1.5, 1.5);
    }

    draw() {
        this.step();
        fill(0);
        circle(this.x, this.y, 5);
    }

    step() {
        this.x += this.xstep;
        this.y += this.ystep;

        if (this.x < 1 || this.x > width) {
            this.xstep = -this.xstep;
        }

        if (this.y < 1 || this.y > height) {
            this.ystep = -this.ystep;
        }
    }
}

var points = [];

function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    for (var i = 0; i < 30; i++) {
        points.push(new Point(random(width), random(height)));
    }
    strokeWeight(2);
}

function draw() {

    background(255);
    for (const point of points) {
        point.draw();
    }

    for (const p1 of points) {
        var numlines = 0;
        for (const p2 of points) {
            if (numlines > 2) continue;
            if (p1.x == p2.x && p1.y == p2.y) continue;
            var d = pdist(p1, p2);
            if (d <= line_dist) {
                numlines++;
                var f = d / line_dist;
                var c = 255 * f;
                stroke(c);
                line(p1.x, p1.y, p2.x, p2.y);
            }
        }
    }
}