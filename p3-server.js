const fs = require('fs');
const fastify = require('fastify')();
const coinCount = require('./p3-module');

fastify.get("/", (request, reply) => {
    // Referenced https://stackoverflow.com/questions/10058814/get-data-from-fs-readfile and https://www.digitalocean.com/community/tutorials/nodejs-how-to-use__dirname to learn how to use required elements and not the ones used in class.
    fs.readFile(__dirname  +  '/index.html', (err, data) => {
    if (err) {
        reply
            .code(500)
            .header("Content-Type", "text/html; charset=utf-8")
            .send("Server Error");
    } else {
        reply
            .code(200)
            .header("Content-Type", "text/html; charset=utf-8")
            .send(data);
  }
})});

fastify.get("/coin", (request, reply) => {
    let { denom = 0, count = 0} = request.query;

    //Turns strings from query into integers to be passed into coinCount function
    denom = parseInt(denom);
    count = parseInt(count);

    let coinValue = coinCount({denom, count});
    
    reply
        .code(200)
        .header("Content-Type", "text/html; charset=utf-8")
        .send(`<h2>Value of ${count} of ${denom} is ${coinValue}</h2><br /><a href="/">Home</a>`);
    }
);

fastify.get("/coins", (request, reply) => {
    let { option } = request.query;

    //Using the coins variable value from the test earlier
    const coins = [{denom: 25, count: 2},{denom: 1, count: 7}];

    //Initialize coinValue to store value for each option
    let coinValue;

    switch (option) {
        case '1':
            coinValue = coinCount({ denom: 5, count: 3 }, { denom: 10, count: 2 }); 
            break;
        case '2':
            coinValue = coinCount(...coins);
            break;
        case '3':
            coinValue = coinCount(coins); 
            break;
        default:
            coinValue = 0;
    }
    reply
        .code(200)
        .header("Content-Type", "text/html; charset=utf-8")
        .send(`<h2>Option ${option} value is ${coinValue}</h2><br /><a href="/">Home</a>`);
    }
);

// Start server and listen to requests using Fastify
const listenIP = "localhost";
const listenPort = 8080;
fastify.listen(listenPort, listenIP, (err, address) => {
  if (err) {
    // Code sourced from in-class example code
    console.log(err);
    process.exit(1);
  };
  console.log(`Server listening on ${address}`);
});