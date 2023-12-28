const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const path = require('path');
const authRouter = require('./routes/v1/authRouter');
const userRouter = require('./routes/v1/userRouter');
const offRouter = require('./routes/v1/offRouter');
const ticketRouter = require('./routes/v1/ticketRouter');
const courseRouter = require('./routes/v1/courseRouter');
const menuRouter = require('./routes/v1/menuRouter');
const categoryRouter = require('./routes/v1/categoryRouter');
const newsletterRouter = require('./routes/v1/newsletterRouter');
const commentRouter = require('./routes/v1/commentRouter');
const contactUsRouter = require('./routes/v1/contactUsRouter');
const departmentRouter = require('./routes/v1/departmentRouter');
const searchRouter = require('./routes/v1/searchRouter');
const notificationRouter = require('./routes/v1/notificationRouter');
const authMiddleware = require('./middlewares/authMiddleware');
const isAdmin = require('./middlewares/isAdmin');
require('dotenv').config();
const port = process.env.PORT;
// Imports ^

const date = new Date();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(morgan('combined'))
// Ready Packageas ^

app.use("/course/cover", express.static(path.join(__dirname, 'public', 'course', 'cover')));
//Defult Route ^

app.use("/v1/auth", authRouter);
app.use("/v1/users", userRouter);
app.use("/v1/categories", categoryRouter);
app.use("/v1/courses", courseRouter);
app.use("/v1/comments", commentRouter);
app.use("/v1/contactus", contactUsRouter);
app.use("/v1/newsletter", newsletterRouter);
app.use("/v1/", searchRouter);
app.use("/v1/notification", notificationRouter);
app.use("/v1/off", offRouter);
app.use("/v1/ticket", ticketRouter);
app.use("/v1/menu", menuRouter);
app.use("/v1/department", departmentRouter);

// Manual Route^
app.use((req, res) => {
    res.status(404).json({ message: "page not found 404" })
})
module.exports = app;