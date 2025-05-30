import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import studentsRouter from "./routes/students.js";
import teachersRouter from "./routes/teachers.js";
import attendanceRouter from "./routes/attendance.js";
import feesRouter from "./routes/fees.js";
import assessmentsRouter from "./routes/assessments.js";
import gradesRouter from "./routes/grades.js";
import coursesRouter from "./routes/courses.js";
import examsRouter from "./routes/exams.js";
import dashboardRouter from "./routes/dashboard.js";

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/students", studentsRouter);
app.use("/teachers", teachersRouter);
app.use("/attendance", attendanceRouter);
app.use("/fees", feesRouter);
app.use("/assessments", assessmentsRouter);
app.use("/gradebook", gradesRouter);
app.use("/courses", coursesRouter);
app.use("/exams", examsRouter);
app.use("/dashboard", dashboardRouter);

app.get("/", (req, res) => res.send("School App API v1"));

// Gebruik process.env.PORT, standaard 4000 als niet gezet
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));