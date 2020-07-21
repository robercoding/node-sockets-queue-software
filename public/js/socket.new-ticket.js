const socket = io();

let label = $('#lblNuevoTicket');

socket.on('connect', () => {
    console.log("Local: I'm connected");
});

socket.on('disconnect', () => {
    console.log("Local, I'm disconnected");
});

socket.on('actualState', resp => {
    label.text(resp.actualState)
});

socket.on('nextTicket', (nextTicket) => {
    console.log(`Ticket: ${nextTicket}`);
});

$('button').on('click', () => {
    socket.emit('nextTicket', null, (nextTicket) => {
        label.text(nextTicket);
    });
});