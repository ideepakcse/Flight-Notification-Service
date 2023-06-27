const amqplib = require("amqplib");

const { TicketService } = require('../services');

let channel, connection;

async function connectQueue() {
    try {

        connection = await amqplib.connect("amqp://localhost");
        channel = await connection.createChannel();
        await channel.assertQueue("noti-queue");
    
    } catch(error) {

        console.log(error);
    }
}

async function receiveData() {
    try {
            await channel.consume("noti-queue", async (data) => {
            const object = JSON.parse(`${Buffer.from(data.content)}`);
            await TicketService.sendEmail("deepaks17062003@gmail.com", object.recepientEmail, object.subject, object.text);
            channel.ack(data);
        });
    } catch(error) {
        
        console.log("queue error", error);
    }
}

module.exports = {
    connectQueue,
    receiveData,
}