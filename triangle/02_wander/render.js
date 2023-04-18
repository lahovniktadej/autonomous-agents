let boid;
let target;

function setup() {
    createCanvas(1650, 700);

    //  Generiranje avtonomnega agenta (z naključnimi koordinatami)
    boid = new Boid(Math.random() * 1550 + 50, Math.random() * 600 + 50);
}

function draw() {
    background(51);

    //  Naključna hoja avtonomnega agenta
    boid.wander();

    //  Posodobitev lokacije avtonomnega agenta
    boid.update();

    //  Prikaz avtonomnega agenta
    boid.display();

    //  Preslikava, če vozilo zapusti okno
    boid.edges();
}

function mouseClicked() {
    //  Prikaz/skrivanje točke, krožnice in povezav
    boid.debug();
}