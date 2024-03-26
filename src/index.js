require('dotenv').config();
require('./config/database');
var cors = require('cors')
const app = require('./app');

app.use(cors())



const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT} 💞💞💞`);
});



// MIBRO SMARTWATCH 
// 080808