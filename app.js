const app = require("express")();
const path = require('path')
const socket = require("socket.io");
const compression = require('compression')

app.get('/',(req,res)=>{
res.render('messages')
})


const port = process.env.PORT || 3000

app
    .set('views', path.join(__dirname, 'views'))
    .set('view engine', 'ejs')
    .use(compression())
    .use('/assests', require("express").static(path.join(__dirname, 'assests')))

    let server = app.listen(port)

// Socket setup & pass server
var io = socket(server);
io.on('connection', (socket) => {

    console.log('made socket connection', socket.id);

    // Handle chat event
    socket.on('chat', function(data){
        // console.log(data);
        io.sockets.emit('chat', data);
    });

    // Handle typing event
    socket.on('typing', function(data){
        socket.broadcast.emit('typing', data);
    });

});
