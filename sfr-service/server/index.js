const app = require ("./app")
const { connect } = require("./db")

const port = process.env.PORT || 8080;

connect();

app.listen (port, ()=>{
  console.log(`App running in port:${port}`)
})