const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control');

const ticketControl = new TicketControl();

io.on('connection', (client) => {

    console.log("A client has been connected");

    client.emit('actualState', {
        actualState: ticketControl.getLastTicket(),
        lastFour: ticketControl.getLastFour()
    });

    client.on('serveTicket', (data, callback) => {
        if (!data.desk) {
            return callback({
                err: true,
                message: 'Desk is needed'
            });
        }


        let serveTicket = ticketControl.serveTicket(data.desk);

        callback(serveTicket)

        //Update public screen
        if (serveTicket.number) {
            client.broadcast.emit('updateState', {
                lastFour: ticketControl.getLastFour()
            });
        }



    });

    client.on('disconnect', () => {
        console.log('A client has been disconected');
    });

    client.on('nextTicket', (data, callback) => {
        let nextTicket = ticketControl.next();

        callback(nextTicket);
        console.log(`Next ticket: ${nextTicket}`);
    });
});