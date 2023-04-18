class Boid {
  //  Konstruktor avtonomnega agenta
  constructor(x, y) {
    //  Pospešek, hitrost in lokacija avtonomnega agenta
    this.acceleration = createVector(0, 0);
    this.velocity = createVector(0, -2);
    this.position = createVector(x, y);

    // Velikost avtonomnega agenta
    this.radius = 6;

    //  Maksimalna hitrost in sila krmiljenja
    this.maxspeed = 4;
    this.maxforce = 0.1;
  }

  // Posodobitev lokacije avtonomnega agenta
  update() {
    //  Posodobitev hitrosti
    this.velocity.add(this.acceleration);

    //  Omejitev hitrosti
    this.velocity.limit(this.maxspeed);

    //  Posodobitev lokacije avtonomnega agenta
    this.position.add(this.velocity);

    //  Ponastavitev pospeška na 0
    this.acceleration.mult(0);
  }

  //  Dodajanje pospeška
  applyForce(force) {
    this.acceleration.add(force);
  }

  //  Premikanje avtonomnega agenta proti ciljni točki
  arrive(target) {
    // Vektor od lokacije do ciljne točke
    let desired = p5.Vector.sub(target, this.position);

    //  Izračun razdalje od ciljne točke
    const distance = desired.mag(); // Distance from the target is the magnitude of the vector

    //  Če je razdalja manjša od 100 pikslov, se hitrost zmanjša
    if (distance < 100) {
      //  Izračun hitrosti glede na razdaljo
      let speed = map(distance, 0, 100, 0, this.maxspeed);
      desired.setMag(speed);
    } else {
      desired.setMag(this.maxspeed);
    }

    //  STEER = DESIRED - VELOCITY
    let steer = p5.Vector.sub(desired, this.velocity);

    //  Omejitev sile krmiljenja
    steer.limit(this.maxforce);

    //  Dodajanje pospeška
    this.applyForce(steer);
  }

  //  Prikaz avtonomnega agenta
  display() {
    // Izračun usmerjenosti avtonomnega agenta (PI/2 za poravnavo trikotnika, ki je v osnovi usmerjen navzgor)
    let theta = this.velocity.heading() + PI / 2;

    //  Nastavitve lika
    fill(127);
    stroke(200);
    strokeWeight(1);

    push();

    //  Preslikava na položaj avtonomnega agenta
    translate(this.position.x, this.position.y);

    //  Rotacija lika glede na usmerjenost avtonomnega agenta
    rotate(theta);

    beginShape();

    //  Stranice trikotnika
    vertex(0, -this.radius * 2);
    vertex(-this.radius, this.radius * 2);
    vertex(this.radius, this.radius * 2);

    endShape(CLOSE);

    pop();
  }
}