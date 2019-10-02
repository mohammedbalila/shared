const express = require("express");
const path = require('path')
const socket = require("socket.io");
const compression = require('compression')
const app = express();

app.get('/', (req, res) => {
    res.render('messages')
})


const port = process.env.PORT || 3000

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(compression());
app.use('/assets', express.static("assets"));

const server = app.listen(port, () => {
    console.log(`Running on ${port}`)
});

// Socket setup & pass server
const io = socket(server);
io.on('connection', (socket) => {
    // Handle chat event
    socket.on('chat', function (data) {
        // console.log(data);
        io.sockets.emit('chat', data);
    });

    // Handle typing event
    socket.on('typing', function (data) {
        socket.broadcast.emit('typing', data);
    });

});
