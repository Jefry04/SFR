const app = require ("./app")
const { connect } = require("./db")
const { transporter, verify } = require('./utils/mailer');

const port = process.env.PORT || 8080;

connect();
verify(transporter);

app.listen (port, ()=>{
  console.log(`App running in port:${port}`)
})