class Boid {
    //  Konstruktor avtonomnega agenta
    constructor(x, y) {
        //  Pospešek, hitrost in lokacija avtonomnega agenta
        this.acceleration = createVector(0, 0);
        this.velocity = createVector(Math.random() * 2 + 1, Math.random() * 2 + 1);
        this.position = createVector(x, y);

        // Velikost avtonomnega agenta
        this.radius = 6;

        //  Maksimalna hitrost in sila krmiljenja
        this.maxspeed = 2;
        this.maxforce = 0.1;

        //  Kot za naključno hojo avtonomnega agenta
        this.theta = PI / 2;

        //  Prikaz/skrivanje točke, krožnice in povezav
        this.debug_lines = true;
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

    //  Naključna hoja avtonomnega agenta
    wander() {
        //  Projeciranje točke gibanja pred avtonomnega agenta
        let point = this.velocity.copy();
        point.setMag(125);
        point.add(this.position);

        //  Prikaz točke gibanja
        if (this.debug_lines) {
            fill(127);
            circle(point.x, point.y, 8);
        }

        //  Radij krožnice gibanja
        let radius = 36;

        if (this.debug_lines) {
            //  Prikaz radija točke gibanja
            noFill();
            circle(point.x, point.y, radius * 2);

            //  Prikaz povezave med avtonomnim agentom in središčem krožnice
            stroke(127);
            line(this.position.x, this.position.y, point.x, point.y);
        }

        //  Naključni kot med vektorjem hitrosti in točko gibanja
        let theta = this.theta + this.velocity.heading();

        //  Pretvorba radija in kota v koordinate
        let x = radius * cos(theta);
        let y = radius * sin(theta);
        point.add(x, y);

        if (this.debug_lines) {
            //  Prikaz točke gibanja na krožnici
            fill(127);
            circle(point.x, point.y, 8);

            //  Prikaz povezave med središčem krožnice in točko gibanja
            stroke(127);
            line(point.x - x, point.y - y, point.x, point.y);
        }

        //  Izračun sile krmiljenja
        let steer = point.sub(this.position);
        steer.setMag(this.maxforce);
        this.applyForce(steer);

        const range = 0.30;
        this.theta += random(-range, range);
    }

    //  Preslikava, če vozilo zapusti okno
    edges() {
        if (this.position.x > width + this.radius) {
            this.position.x = -this.radius;
        } else if (this.position.x < -this.radius) {
            this.position.x = width + this.radius;
        }
        if (this.position.y > height + this.radius) {
            this.position.y = -this.radius;
        } else if (this.position.y < -this.radius) {
            this.position.y = height + this.radius;
        }
    }

    debug() {
        this.debug_lines = !this.debug_lines;
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