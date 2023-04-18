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
        this.maxforce = 0.05;
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

    //  Premikanje proti ciljni točki
    seek(target) {
        //  Vektor, ki kaže od avtonomnega agenta do ciljne točke
        const direction = p5.Vector.sub(target, this.position);
        direction.normalize();

        //  Množenje z maksimalno hitrostjo
        direction.mult(this.maxspeed);

        //  Vektor, ki kaže od avtonomnega agenta do ciljne točke
        const steer = p5.Vector.sub(direction, this.velocity);
        steer.limit(this.maxforce);
        this.applyForce(steer);
    }

    //  Gibanje v sredino skupine avtonomnih agentov
    cohesion(boids) {
        const neighbourhood = 100;
        let nearbyBoids = 0;

        //  Inicializacija vektorja
        let direction = createVector(0, 0);

        for (const boid of boids) {
            //  Razdalja med avtonomnim agentom in preostalimi avtonomnimi agenti
            const distance = p5.Vector.dist(this.position, boid.position);

            if (distance > 0 && distance < neighbourhood) {
                nearbyBoids++;

                //  Seštevanje vektorjev vseh vozil, ki so v bližini avtonomnega agenta
                direction.add(boid.position);
            }

            if (nearbyBoids > 0) {
                direction.div(nearbyBoids);
                this.seek(direction);
            } else {
                //  Apliciranje sile krmiljenja na avtonomnega agenta
                this.applyForce(createVector(0, 0));
            }
        }
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

    //  Prikaz avtonomnega agenta
    display() {
        //  Risanje avtonomnega agenta (krog)
        fill(127);
        stroke(200);
        strokeWeight(1);
        ellipse(this.position.x, this.position.y, this.radius * 2);
    }
}