const express = require("express");


const PORT = process.env.PORT || process.env.port || 8888;

//connect to database
mongoose.connect(keys.mongodb.databaseUri, (err) => {
    if (err) throw err;
    console.log("Connected to database");
});

let app = express();
app.use("/dist", express.static(path.join(__dirname, "../client/dist")));

app.set("views", path.join(__dirname, "../client/views"));

//setup parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(PORT, () => {
    console.log(`Listening to port: ${PORT}`);
    console.log(`Navigate to http://localhost:${PORT}/`);
});