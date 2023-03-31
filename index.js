var express = require('express');
var app = express();
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(bodyParser.json());
app.get('/', (req, res) => {
  res.send('Welcome to Corporate Foods');
});
app.use('/api/login', require('./src/routers/api/login/index.ts'));
// app.use("/api/users", require("./routers/api/user"));

app.listen(3000, () => {
  // console.log('Server started at port 3000');
});
