const express=require('express');

const router=express.Router();

const ticketRoutes = require('./ticket-routes');

router.use('/tickets',ticketRoutes);

module.exports=router;