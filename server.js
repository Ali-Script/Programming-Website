const app = require('./app');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const authRouter = require('./routes/v1/authRouter');
const date = new Date();
require('dotenv').config();
const port = process.env.PORT;

(async () => {
    await mongoose.connect(process.env.MONGOOSE_URI)
})();


app.listen(port, () => { console.log(`Server Run on Port : ${port}`); });