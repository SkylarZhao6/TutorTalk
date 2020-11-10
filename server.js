require("dotenv").config();

require("./database/connect")((err, database) => {
    if (err) {
        throw err;
    }
    
    const jwt = require("./middleware/jwt");
    const express = require("./app")(database, jwt);
    
    const PORT = process.env.PORT;
    express.listen(PORT, () => {
        console.log(`Server running: http://localhost:${PORT}`);
    })
})

