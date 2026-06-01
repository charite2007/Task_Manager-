import app from "./app.js";
import "dotenv/config.js"



const server = app;
const PORT = process.env.PORT;

server.listen(PORT,()=>{
    console.log(`server running on port: http://localhost:${PORT}`);
    
});
