class Boid {
  //  Konstruktor avtonomnega agenta
  constructor(x, y) {
    //  Pospešek, hitrost in lokacija avtonomnega agenta
    this.acceleration = createVector(0, 0);
    this.velocity = createVector(Math.random() * 4 + 1, Math.random() * 4 + 1);
    this.position = createVector(x, y);

    // Velikost avtonomnega agenta
    this.radius = 6;

    //  Maksimalna hitrost in 
    this.maxspeed = 8;
    this.maxforce = 0.80;
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

  //  Okoljske meje
  boundaries() {
    let desired = null;

    //  Horizontalno gibanje
    if (this.position.x < distance) {
      //  Ustvarjanje vektorja, ki kaže v nasprotno smer
      desired = createVector(this.maxspeed, this.velocity.y);
    } else if (this.position.x > width - distance) {
      //  Ustvarjanje vektorja, ki kaže v nasprotno smer
      desired = createVector(-this.maxspeed, this.velocity.y);
    }

    //  Vertikalno gibanje
    if (this.position.y < distance) {
      //  Ustvarjanje vektorja, ki kaže v nasprotno smer
      desired = createVector(this.velocity.x, this.maxspeed);
    } else if (this.position.y > height - distance) {
      //  Ustvarjanje vektorja, ki kaže v nasprotno smer
      desired = createVector(this.velocity.x, -this.maxspeed);
    }

    //  Če je potrebno, se izvede popravek hitrosti
    if (desired !== null) {
      //  Normalizacija vektorja
      desired.normalize();

      //  Množenje z maksimalno hitrostjo
      desired.mult(this.maxspeed);

      //  STEER = DESIRED - VELOCITY
      let steer = p5.Vector.sub(desired, this.velocity);

      //  Omejitev sile krmiljenja
      steer.limit(this.maxforce);

      //  Dodajanje pospeška
      this.applyForce(steer);
    }
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