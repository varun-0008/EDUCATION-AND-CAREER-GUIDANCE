import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "/")));

const users = [
  { email: "student@example.com", password: "student123", role: "student", name: "Student" },
  { email: "parent@example.com", password: "parent123", role: "parent", name: "Parent" },
  { email: "teacher@example.com", password: "teacher123", role: "teacher", name: "Teacher" }
];

app.post("/api/login", (req, res) => {
  const { email, password, role } = req.body;
  if (!email || !password || !role) {
    return res.status(400).json({ message: "Missing login fields." });
  }

  const user = users.find(u => u.email === email && u.password === password && u.role === role);
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials or role." });
  }

  res.cookie("session", JSON.stringify({ email: user.email, role: user.role, name: user.name }), {
    httpOnly: true,
    sameSite: "lax",
    maxAge: 1000 * 60 * 60 * 2
  });
  return res.json({ user: { name: user.name, role: user.role } });
});

app.post("/api/logout", (req, res) => {
  res.clearCookie("session");
  res.json({ success: true });
});

app.get("/api/me", (req, res) => {
  const sessionCookie = req.cookies.session;
  if (!sessionCookie) {
    return res.status(401).json({ message: "Not authenticated." });
  }

  try {
    const session = JSON.parse(sessionCookie);
    return res.json({ user: { name: session.name, role: session.role } });
  } catch (error) {
    return res.status(400).json({ message: "Invalid session." });
  }
});

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});