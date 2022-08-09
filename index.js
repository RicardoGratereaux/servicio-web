var express = require('express');
var bodyParser = require('body-parser');
const { response } = require('express');
const { json } = require('body-parser');

var app = express();
var port = process.env.PORT || 3525;

// Convierte una petición recibida (POST-GET...) a objeto JSON
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

let contacts = [];

//pasamos los contactos a la variable contacts
fetch('http://www.raydelto.org/agenda.php')
.then(e => e.json())
.then(content => contacts = content);


app.get('/', function(req, res){
	res.status(200).send({
		message: 'GET Home route working fine!'
	});
});

//guardar contacto
app.post('/contacts', (req, res) => {
    const contact = {
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        telefono: req.body.telefono
    }

    contacts.push(contact)

    const response = {
        data: contact,
        message: 'Contacto agregado correctamente'
    }

    res.send(response)
})

//listar contactos
app.get('/contacts', (req, res) => {
    const response = {
        data: contacts
    }

    res.send(response)
})

//obtener el puerto
app.listen(port, function(){
	console.log(`Server running in http://localhost:${port}`);
	console.log('Defined routes:');
	console.log('	[GET] http://localhost:3525/');
});