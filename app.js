const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const app = express();
const port = 3000;

//App setting

app.set('port', process.env.PORT || port);
app.set('views', path.resolve(__dirname, 'src/views'));
app.engine('.hbs', {
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./src/lib/helpers')
});
app.set('view engine', '.hbs' );

app.use(express.static(path.resolve(__dirname, 'src/public')));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Routers

//App init
app.listen(app.get('port'), () => {
    console.log(`Server is in port ${port}`);
});