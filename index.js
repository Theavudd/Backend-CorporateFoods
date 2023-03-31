var express = require("express");
var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.get("/", (req, res) => {
  res.send("hello world");
});
// app.use("/api/payments", require("./routers/api/payment"));
// app.use("/api/users", require("./routers/api/user"));

app.listen(3000, () => {
  // console.log('Server started at port 3000');
});
