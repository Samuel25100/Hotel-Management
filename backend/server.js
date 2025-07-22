const express = require('express');
require("dotenv").config();
const mongoose = require('mongoose');
// routes
const user_routes = require("./routes/user_routes");
const booking_routes = require("./routes/booking_routes");
const houseKeeping_routes = require("./routes/houseKeeping_routes");
const rooms_routes = require("./routes/rooms_routes");
const payment_routes = require("./routes/payment_routes");


const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 3000;

/* Middlewares */
app.use(cors());
app.use(express.json());

/* Routes */
app.use('/user', user_routes);
app.use('/booking', booking_routes);
app.use('/housekeeping', houseKeeping_routes);
app.use('/rooms', rooms_routes);
app.use('/payment', payment_routes);


/* Mongoose connections */
const url = process.env.MONGODB_URL || 'mongodb://localhost:27017/hotelmngDB';
mongoose.connect(url)
        .then(() => console.log('MongoDB connected'))
        .catch((err) => console.log('MongoDb error:', err));

/* Server */
app.listen(PORT || 3000, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
