const express = require("express")
const app = express()

const amqp = require('amqplib')

let channel, connection;
const queueName = "FirstQueue2";
const Message = "Monmessage";

// Connect to RabbitMQ
async function connectToRabbitMQ() {
    const amqpServer = "amqp://guest:guest@localhost:5672";
    connection = await amqp.connect(amqpServer);
    channel = await connection.createChannel();
    await channel.assertQueue(queueName);
}

connectToRabbitMQ().then(() => {
    channel.sendToQueue(queueName,
        Buffer.from(Message)
    );
});

setTimeout(() => {
    connection.close();
}, 1000)

app.listen(3000)
