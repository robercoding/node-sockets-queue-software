const fs = require('fs');


class Ticket {

    constructor(number, desk) {

        this.number = number;
        this.desk = desk;

    }
}


class TicketControl {

    constructor() {
        this.last = 0;
        this.today = new Date().getDate();

        this.tickets = [];
        this.lastFour = [];
        let data = require('../data/data.json');

        if (data.today === this.today) {
            this.last = data.last;
            this.tickets = data.tickets;
            this.lastFour = data.lastFour;
        } else {
            this.resetCount();
        }

    }

    getLastTicket() {
        return `Ticket ${this.last}`;
    }

    getLastFour() {
        return this.lastFour;
    }

    next() {
        this.last += 1;

        let ticket = new Ticket(this.last, null);
        this.tickets.push(ticket);

        this.writeInFile();

        return `Ticket ${this.last}`;
    }

    serveTicket(desk) {
        if (this.tickets.length === 0) {
            return `There are 0 tickets`
        } else {
            let numberTicket = this.tickets[0].number;
            this.tickets.shift();

            let serveTicket = new Ticket(numberTicket, desk);
            this.lastFour.unshift(serveTicket);

            if (this.lastFour.length > 4) {
                this.lastFour.splice(-1, 1); //delete last 

            }

            console.log("last 4");
            console.log(this.lastFour);

            this.writeInFile();
            return serveTicket;
        }
    }

    resetCount() {

        this.last = 0;
        this.tickets = [];
        this.lastFour = [];
        this.writeInFile();
        console.log('System has been initialized');
    }

    writeInFile() {
        let jsonData = { 'last': this.last, 'today': this.today, 'tickets': this.tickets, "lastFour": this.lastFour }

        let jsonDataString = JSON.stringify(jsonData);

        fs.writeFileSync('./server/data/data.json', jsonDataString);
    }

}


module.exports = {
    TicketControl
}