const app =require('./app')
const cors = require('cors');
app.use(cors());


const port = process.env.PORT ;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
