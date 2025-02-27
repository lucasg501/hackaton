const swaggerAutogen = require("swagger-autogen")({openapi: "3.0.0"});


const doc = {
    info:{

    },
    host: 'localhost:4000',
    securityDefinitions:{
        apiKeyAuth: {
            type: 'apiKey',
            in: 'header',
            name: 'chaveapi',
            description: 'chave para aut da api'
        }
    },
    components:{
        schemas:{

        }
    }
}

let outputJson = "./outputSwagger.json";
let endpoins = ["./server.js"];

swaggerAutogen(outputJson, endpoins, doc)
.then(r=>{
    require('./server.js');
});