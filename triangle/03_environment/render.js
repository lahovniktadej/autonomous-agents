let boid;
let distance = 150;

function setup() {
  createCanvas(1650, 700);

  //  Generiranje avtonomnega agenta (z naključnimi koordinatami)
  boid = new Boid(Math.random() * 1200 + 200, Math.random() * 250 + 200);
}

function draw() {
  background(51);

  //  Prikaz mej gibanja avtonomnega agenta
  stroke(175);
  noFill();
  rectMode(CENTER);
  rect(width / 2, height / 2, width - distance * 2, height - distance * 2);

  //  Preverjanje mej, ki ovirajo gibanje avtonomnega agenta
  boid.boundaries();

  //  Posodobitev lokacije avtonomnega agenta
  boid.update();

  //  Prikaz avtonomnega agenta
  boid.display();
}