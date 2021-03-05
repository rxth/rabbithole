class Animal {
    constructor(numLegs, numEyes, weight, height) {
        this.numLegs = numLegs;
        this.numEyes = numEyes;
        this.weight = weight;
        this.height = height;
    }

    run() {
        if (this.numLegs !== 4 ) {
            console.log("I can't fucking run")
        } else {
            if (this.weight < 100) {
                console.log("I'm fucking running!!!!")
            } else {
                console.log("I'm running but now I'm out of breath")
            }
        }
    }
}


function makeAnimal(animalProps) {
    return Animal(animalProps.numLegs, animalProps.numEyes, animalProps.weight, animalProps.height)
}

const fuckedUpAnimalProps = {
    numLegs: 5,
    numEyes: 1,
    weight: 1,
    height: 10,
}



fuckedUpAnimal = makeAnimal(fuckedUpAnimalProps)
fuckedUpAnimal.run() // I can't fucking run


const normalAnimalProps = {
    numLegs: 4,
    numEyes: 2,
    weight: 1,
    height: 10,
}

normalAnimal = makeAnimal(normalAnimalProps)
normalAnimal.run() // I'm fucking running!!!!

fuckedUpAnimal.run() // I can't fucking run


function makeCow(weight, height) {
    const numLegs = 4;
    const numEyes = 2;
    return makeAnimal(numLegs, numEyes, weight, height)
}

cow = makeCow(101, 5)
cow.run() // "I'm running but now I'm out of breath