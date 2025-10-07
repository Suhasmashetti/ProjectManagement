import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import bodyParser from 'body-parser';

// {Route Imports}
import projectRoutes from "./routes/projectsRoutes"
import taskRoutes from "./routes/tasksRoutes"


dotenv.config()
const app = express();
app.use(express.json())
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy( { policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());

// {Routes}
app.get("/", (req, res) => {
    res.send("This is home route");
})

app.use("/projects", projectRoutes)
app.use("/tasks", taskRoutes)


const port = Number(process.env.PORT) || 3000;
app.listen(port, "0.0.0.0", () => {
  console.log(`Server running on port ${port}`);
});



