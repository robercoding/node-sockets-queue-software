const socket = io();

var searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has('desk')) {
    window.location = 'index.html';
    throw new Error('Desk is needed');
}

console.log(desk);
var desk = searchParams.get('desk');
$('h1').text(`Desk ${desk}`)
console.log(desk);

$('button').on('click', () => {
    socket.emit('serveTicket', { 'desk': desk }, (callback) => {
        if (!callback.number) {
            alert("There are no tickets right now.")
            return {
                err: true,
                message: 'Sorry there was an error with the server'
            }
        }
        $('small').text(`Ticket ${callback.number}`)
    });
});