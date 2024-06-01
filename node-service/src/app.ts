import express, {Request, Response} from 'express'
import dotenv from 'dotenv'
import taskRoute from './routes/task';
import path from 'path';


dotenv.config();
const app = express();
const cors = require('cors');
const PORT = process.env.BACKEND_PORT || 3000;
const buildPath = path.join(__dirname, '../../fn_out');

app.use(cors({
    origin: '*'
}));
app.use(express.static(buildPath));
app.use(express.json());
app.use('/api', taskRoute);

// gets the static files from the build folder
app.get('*', (req, res) => {
    res.sendFile(path.join(buildPath, 'index.html'))
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
}).on("error", (error) => {
    throw new Error(error.message);
});
