import express from "express";
import exphbs from "express-handlebars";
import { Server } from "socket.io";





const app = express();
const PORT = 8080;

//Middleware
app.use(express.static("./src/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Configuración de Handlebars
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

//Rutas
app.get("/", (req, res) => {
    res.render("index");
})

//Listen
const httpServer = app.listen(PORT, () => {
    console.log(`Escuchando http://localhost:${PORT}`);
})

//Websockets
//1 Guardar referencia del server
//2 Generar instancia de socket io del lado backend

const io = new Server(httpServer);

const arrLog = [];

io.on("connection", (socket) => {
    console.log("Un cliente se ha conectado...");


    socket.on("mensaje", (data) => {
        arrLog.push(data);


        //Emitir mensaje al cliente con el array
        io.emit("mensajesLogs", arrLog);
    });
});

