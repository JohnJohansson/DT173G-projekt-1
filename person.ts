
// typescript ----------------------------------------------------------------


// we put our code into a namespace
namespace var1 {

    // we export it so it can be reached outside of the namespace
    // we make our class a person with a name wich is a string
    // and a telefonumber wich is a number
    export class person {
        name: string;
        teleNR: number;
        // we make a construktor
        constructor(public fullName: string, public teleNumber: number) {
            this.name = fullName;
            this.teleNR = teleNumber;
        }
        // and we return all values as a string
        returnFull(): string {
            return "Name: " + this.name + " Phone number: " + this.teleNR;
        }
    }
}

// we put a copy of our code into another namespace
// thanks to it being a namespace we dont need to worry
// about any collisions of errors of using the same names
namespace var2 {

    // we export it so it can be reached outside of the namespace
    // we make our class a person with a name wich is a string
    // and a telefonumber wich is a number
    export class person {
        name: string;
        teleNR: number;
        // we make a construktor
        constructor(public fullName: string, public teleNumber: number) {
            this.name = fullName;
            this.teleNR = teleNumber;
        }
        // and we return all values as a string
        returnFull(): string {
            return "Name: " + this.name + " Phone number: " + this.teleNR;
        }
    }
}

// Then outside our namespaces we give our values to the vars
let person: var1.person = new var1.person("John", 123456789);
// and a consol log
console.log(person.returnFull());
// result "Name: John Phone number: 123456789" 

// Then outside our namespaces we give our values to the vars
let person2: var2.person = new var2.person("Bob", 987654321);
// and a consol log
console.log(person2.returnFull());
// Result  "Name: Bob Phone number: 987654321" 