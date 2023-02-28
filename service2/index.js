const express = require("express")
const app = express()

const amqp = require('amqplib')

let channel, connection;
const queueName = "FirstQueue";
const Message = "Monmessage";

// Connect to RabbitMQ
async function connectToRabbitMQ() {
    const amqpServer = "amqp://guest:guest@localhost:5672";
    connection = await amqp.connect(amqpServer);
    channel = await connection.createChannel();
    await channel.assertQueue(queueName);
}

connectToRabbitMQ().then(() => {
    channel.consume(queueName, (data) => {
        console.log("Consumed from " + queueName + " - " + data.content);
        channel.ack(data);
    });
});

setTimeout(() => {
    connection.close();
}, 1000);

app.listen(3001)

