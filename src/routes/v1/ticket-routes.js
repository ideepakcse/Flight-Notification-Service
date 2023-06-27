const express = require('express');

const { TicketController } = require('../../controllers');

const router = express.Router();

router.post('/', TicketController.createTicket);

module.exports=router;