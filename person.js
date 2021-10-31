// typescript ----------------------------------------------------------------
// we put our code into a namespace
var var1;
(function (var1) {
    // we export it so it can be reached outside of the namespace
    // we make our class a person with a name wich is a string
    // and a telefonumber wich is a number
    var person = /** @class */ (function () {
        // we make a construktor
        function person(fullName, teleNumber) {
            this.fullName = fullName;
            this.teleNumber = teleNumber;
            this.name = fullName;
            this.teleNR = teleNumber;
        }
        // and we return all values as a string
        person.prototype.returnFull = function () {
            return "Name: " + this.name + " Phone number: " + this.teleNR;
        };
        return person;
    }());
    var1.person = person;
})(var1 || (var1 = {}));
// we put a copy of our code into another namespace
// thanks to it being a namespace we dont need to worry
// about any collisions of errors of using the same names
var var2;
(function (var2) {
    // we export it so it can be reached outside of the namespace
    // we make our class a person with a name wich is a string
    // and a telefonumber wich is a number
    var person = /** @class */ (function () {
        // we make a construktor
        function person(fullName, teleNumber) {
            this.fullName = fullName;
            this.teleNumber = teleNumber;
            this.name = fullName;
            this.teleNR = teleNumber;
        }
        // and we return all values as a string
        person.prototype.returnFull = function () {
            return "Name: " + this.name + " Phone number: " + this.teleNR;
        };
        return person;
    }());
    var2.person = person;
})(var2 || (var2 = {}));
// Then outside our namespaces we give our values to the vars
var person = new var1.person("John", 123456789);
// and a consol log
console.log(person.returnFull());
// result "Name: John Phone number: 123456789" 
// Then outside our namespaces we give our values to the vars
var person2 = new var2.person("Bob", 987654321);
// and a consol log
console.log(person2.returnFull());
// Result  "Name: Bob Phone number: 987654321" 
