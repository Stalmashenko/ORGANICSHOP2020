const express = require("express");
const bodyParser = require('body-parser');
const passport = require('passport');
const cookieParser = require('cookie-parser')
const {Users} = require('./models/sequelize.js');
const session = require('express-session');
const flash = require('connect-flash');
const hbshelpers = require('./helpers/hbs');
require('./config/passport')(passport);
const hbs = require('express-handlebars').create({
    extname: '.hbs',        
    layoutsDir: "views/layouts",
    defaultLayout: "layout", 
    helpers: {
      ifEquals: hbshelpers.ifEquals
    }
  });
const app = express();

const getRouter = require("./routes/getRouter.js");
const entryRouter = require("./routes/entryRouter.js");
const catalogRouter = require("./routes/catalogRouter.js");
const orderRouter = require("./routes/orderRouter.js");
const exitRouter = require("./routes/exitRouter.js");
const historyRouter = require("./routes/historyRouter.js");


// устанавливаем настройки для файлов layout
app.engine("hbs", hbs.engine)
app.use(cookieParser())
app.use(session ({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session())

app.set("view engine", "hbs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/static', express.static('static'));

app.use("/", getRouter);
app.use("/entry", entryRouter);
app.use("/catalog", catalogRouter);
app.use("/order", orderRouter);
app.use("/exit", exitRouter);
app.use("/history", historyRouter);

app.use(function (req, res, next) {
    res.status(404).send("Not Found");
});

app.listen(3000);
