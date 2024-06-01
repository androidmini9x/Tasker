import express, {Request, Response} from 'express'
import dotenv from 'dotenv'


dotenv.config();
const app = express();
const cors = require('cors');
const PORT = process.env.BACKEND_PORT || 3000;

app.use(cors({
    origin: '*'
}));
app.use(express.json());

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
}).on("error", (error) => {
    throw new Error(error.message);
});
