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
        this.maxspeed = 5;
        this.maxforce = 0.25;
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

        return steer;
    }

    //  Izogibanje drugim avtonomnim agentom
    separate(flock) {
        const desired_separation = 25;
        let nearbyBoids = 0;
        let steer = createVector(0, 0);

        for (const boid of flock) {
            //  Razdalja med avtonomnim agentom in preostalimi avtonomnimi agenti
            const distance = p5.Vector.dist(this.position, boid.position);

            if (distance > 0 && distance < desired_separation) {
                nearbyBoids++;

                //  Vektor, ki kaže v nasprotno smer
                const diff = p5.Vector.sub(this.position, boid.position);
                diff.normalize();

                //  Obtežitev glede na razdaljo
                diff.div(distance);

                //  Seštevanje vektorjev vseh vozil, ki so v bližini avtonomnega agenta
                steer.add(diff);
            }
        }

        //  Preverjanje, ali je avtonomni agent v bližini drugih avtonomnih agentov
        if (nearbyBoids > 0) {
            //  Deljenje s številom avtonomnih agentov v bližini
            steer.div(nearbyBoids);
        }

        if (steer.mag() > 0) {
            steer.normalize();

            //  Skaliranje na maksimalno hitrost
            steer.mult(this.maxspeed);

            //  Reynoldsova formula za izračun krmiljenja
            steer.sub(this.velocity);

            //  Omejitev sile krmiljenja
            steer.limit(this.maxforce);
        }

        return steer;
    }

    //  Poravnava z drugimi avtonomnimi agenti
    alignment(flock) {
        const neighbourhood = 50;
        let nearbyBoids = 0;

        //  Inicializacija vektorja
        let direction = createVector(0, 0);

        for (const boid of flock) {
            //  Razdalja med avtonomnim agentom in preostalimi avtonomnimi agenti
            const distance = p5.Vector.dist(this.position, boid.position);

            if (distance > 0 && distance < neighbourhood) {
                nearbyBoids++;

                //  Seštevanje vektorjev vseh vozil, ki so v bližini avtonomnega agenta
                direction.add(boid.velocity);
            }
        }

        //  Preverjanje, ali je avtonomni agent v bližini drugih avtonomnih agentov
        if (nearbyBoids > 0) {
            //  Deljenje s številom avtonomnih agentov v bližini
            direction.div(nearbyBoids);
            direction.normalize();

            //  Skaliranje na maksimalno hitrost
            direction.mult(this.maxspeed);

            //  Reynoldsova formula za izračun krmiljenja
            let steer = p5.Vector.sub(direction, this.velocity);

            //  Omejitev sile krmiljenja
            steer.limit(this.maxforce);
            return steer;
        }

        return createVector(0, 0);
    }

    //  Gibanje v sredino skupine avtonomnih agentov
    cohesion(flock) {
        const neighbourhood = 50;
        let nearbyBoids = 0;

        //  Inicializacija vektorja
        let steer = createVector(0, 0);

        for (const boid of flock) {
            //  Razdalja med avtonomnim agentom in preostalimi avtonomnimi agenti
            const distance = p5.Vector.dist(this.position, boid.position);

            if (distance > 0 && distance < neighbourhood) {
                nearbyBoids++;

                //  Seštevanje vektorjev vseh vozil, ki so v bližini avtonomnega agenta
                steer.add(boid.position);
            }

            if (nearbyBoids > 0) {
                steer.div(nearbyBoids);
                return this.seek(steer);
            } else {
                return createVector(0, 0);
            }
        }
    }

    //  Simulacija jate/roja
    flock(flock) {
        let separation = this.separate(flock);
        let alignment = this.alignment(flock);
        let cohesion = this.cohesion(flock);

        //  Obtežitev posameznih komponent
        separation.mult(1.5);
        alignment.mult(1.0);
        cohesion.mult(1.0);

        //  Apliciranje sile krmiljenja na avtonomnega agenta
        this.applyForce(separation);
        this.applyForce(alignment);
        this.applyForce(cohesion);
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
        //  Risanje avtonomnega agenta (trikotnik)
        let theta = this.velocity.heading() + PI / 2;
        fill(127);
        stroke(200);
        strokeWeight(1);
        push();
        translate(this.position.x, this.position.y);
        rotate(theta);
        beginShape();
        vertex(0, -this.radius * 2);
        vertex(-this.radius, this.radius * 2);
        vertex(this.radius, this.radius * 2);
        endShape(CLOSE);
        pop();
    }
}