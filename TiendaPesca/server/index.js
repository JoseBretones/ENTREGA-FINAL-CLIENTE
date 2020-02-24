const express = require ('express');
const morgan = require ('morgan');
const app = express ();
const { mongoose } = require ('./database');
const cors= require ('cors');

//Settings
app.set('port', process.env.PORT || 3000);

//Midelwares
app.use(morgan('dev'));
app.use(express.json());
app.use(cors({origin: 'http://localhost:4200'}));
//Routes
app.use('/tienda/productos' , require('./routers/products.routes'));
app.use('/tienda/usuarios' , require('./routers/users.routes'));
app.use('/tienda/pedidos' , require('./routers/orders.routes'));

//Starting the server
app.listen(app.get('port') , () =>{
    console.log("Server on port 3000.");
});