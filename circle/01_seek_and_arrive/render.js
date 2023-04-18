let boid;
let target;

function setup() {
  createCanvas(1650, 700);

  //  Generiranje avtonomnega agenta (z naključnimi koordinatami)
  boid = new Boid(Math.random() * 1650, Math.random() * 700);

  //  Generiranje ciljne točke (z naključnimi koordinatami)
  target = createVector(Math.random() * 1550 + 50, Math.random() * 600 + 50);
}

function draw() {
  background(51);

  //  Označevanje ciljne točke (X)
  line(target.x - 6, target.y - 6, target.x + 6, target.y + 6);
  line(target.x - 6, target.y + 6, target.x + 6, target.y - 6);

  // Premikanje avtonomnega agenta
  boid.arrive(target);

  //  Posodobitev lokacije avtonomnega agenta
  boid.update();

  //  Prikaz avtonomnega agenta
  boid.display();
}