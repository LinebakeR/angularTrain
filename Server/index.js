const express = require('express');
const app = express();
const blogRoute = require('./routes/blogRoute');
const cors = require('cors');
const bodyparser = require('body-parser');
const path = require('path');

app.set('port', process.env.port || 3000);
app.listen(app.get('port'), () => {
  console.log(`Connected on port ${app.get('port')}`);
});
app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

app.use('/', blogRoute);

app.use(express.static(path.join(__dirname, './uploads')));
