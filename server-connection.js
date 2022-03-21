const express = require("express");
const app = express();

app.set('port', 8081);

app.use(express.static('./static'))
app.use(express.json())

// app.post('/contact', (request, response) => {
//     response.send(JSON.stringify(request.body))
// })
 

app.listen(8081)