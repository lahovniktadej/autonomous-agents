let flock = [];

function setup() {
    createCanvas(1650, 700);

    //  Generiranje avtonomnih agentov (z naključnimi koordinatami)
    for (let i = 0; i < 25; i++) flock.push(new Boid(Math.random() * 1200 + 200, Math.random() * 250 + 200));
}

function draw() {
    background(51);

    for (const boid of flock) {
        //  Simulacija jate/roja
        boid.flock(flock);

        //  Posodobitev lokacije avtonomnega agenta
        boid.update();

        //  Prikaz avtonomnega agenta
        boid.display();

        //  Preslikava, če vozilo zapusti okno
        boid.edges();
    }
}