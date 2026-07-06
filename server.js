import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.static(path.join(__dirname, "/")));
app.use(bodyParser.json());

// AI Responses Database
const data = {
  centers: [
    { name: "Future Minds Academy", location: "Downtown", programs: "STEM, Test Prep, Mentoring" },
    { name: "Beyond Boundaries", location: "North Campus", programs: "Career Training, Soft Skills" },
    { name: "Pathway Institute", location: "City Center", programs: "Scholarship Coaching, College Plans" }
  ],
  scholarships: [
    { title: "Future Leaders Scholarship", amount: "$4,000", deadline: "Apr 30" },
    { title: "Tech Innovators Grant", amount: "$3,500", deadline: "May 12" },
    { title: "Creative Scholars Award", amount: "$2,800", deadline: "Jun 10" }
  ],
  colleges: [
    { title: "Global Engineering University", focus: "Engineering & Robotics" },
    { title: "Bright Future Business School", focus: "Commerce & Management" },
    { title: "Artisan Design College", focus: "Design & Media" }
  ],
  companies: [
    { title: "ByteWave", opportunity: "Internships in Software Development" },
    { title: "Nova Health", opportunity: "Graduate programs in Healthcare Analytics" },
    { title: "SparkEd", opportunity: "Career mentorship in EdTech" }
  ],
  careers: [
    { title: "Data Analyst", description: "Use data to build stronger career paths." },
    { title: "Product Designer", description: "Design future-ready learning experiences." },
    { title: "AI Education Specialist", description: "Create intelligent learning systems." }
  ],
  goalSuggestions: {
    engineering: [
      "Build your portfolio with personal robotics or coding projects.",
      "Explore engineering internships and technical bootcamps.",
      "Prepare for SAT/ACT and engineering college admissions."
    ],
    business: [
      "Join entrepreneurship clubs and case competitions.",
      "Study market trends, finance, and leadership programs.",
      "Apply for business scholarships and mentorship opportunities."
    ],
    arts: [
      "Create a portfolio of artwork, digital design, or media projects.",
      "Visit local galleries and attend creative workshops.",
      "Find arts scholarships and collaborative design programs."
    ],
    medicine: [
      "Volunteer in healthcare settings and science labs.",
      "Join biology clubs and medical prep coaching.",
      "Explore medical scholarships and competitive pathways." ]
  }
};

// AI Response Generator
function generateAIResponse(userInput) {
  const input = userInput.toLowerCase();
  
  // Check for scholarship query
  if (input.includes("scholarship") || input.includes("financial") || input.includes("aid") || input.includes("funding")) {
    return {
      message: `Based on your interest in scholarships, here are some options:\n\n${data.scholarships.map(s => `• ${s.title} - ${s.amount} (Deadline: ${s.deadline})`).join('\n')}\n\nWould you like more information about any of these scholarships?`,
      category: "scholarship"
    };
  }
  
  // Check for coaching query
  if (input.includes("coaching") || input.includes("center") || input.includes("mentor") || input.includes("tutor")) {
    return {
      message: `Here are some coaching centers near you:\n\n${data.centers.map(c => `• ${c.name}\n  Location: ${c.location}\n  Programs: ${c.programs}`).join('\n\n')}\n\nWhich one interests you?`,
      category: "coaching"
    };
  }
  
  // Check for college query
  if (input.includes("college") || input.includes("university") || input.includes("admission") || input.includes("university")) {
    return {
      message: `Here are some great college options based on your interests:\n\n${data.colleges.map(c => `• ${c.title}\n  Focus: ${c.focus}`).join('\n\n')}\n\nWould you like to know more about any of these?`,
      category: "college"
    };
  }
  
  // Check for career/company query
  if (input.includes("career") || input.includes("job") || input.includes("opportunity") || input.includes("work") || input.includes("company")) {
    return {
      message: `Here are some exciting career opportunities:\n\n${data.companies.map(c => `• ${c.title}\n  ${c.opportunity}`).join('\n\n')}\n\nAlso check out these career paths:\n${data.careers.map(c => `• ${c.title} - ${c.description}`).join('\n')}`,
      category: "career"
    };
  }
  
  // Check for goal suggestions
  if (input.includes("engineering") || input.includes("business") || input.includes("arts") || input.includes("medicine") || input.includes("goal") || input.includes("path")) {
    let goal = "engineering";
    if (input.includes("business")) goal = "business";
    if (input.includes("arts") || input.includes("design")) goal = "arts";
    if (input.includes("medicine") || input.includes("medical")) goal = "medicine";
    
    const suggestions = data.goalSuggestions[goal];
    return {
      message: `For a career in ${goal}, here are my recommendations:\n\n${suggestions.map(s => `• ${s}`).join('\n')}\n\nWould you like more details on any of these?`,
      category: "goal"
    };
  }
  
  // Default response
  return {
    message: `I can help you with:\n• Finding scholarships\n• Locating coaching centers\n• Exploring colleges and universities\n• Discovering career opportunities\n• Planning your education path\n\nWhat would you like to know more about?`,
    category: "general"
  };
}

// AI Chat Endpoint
app.post("/api/ai/chat", (req, res) => {
  const { message } = req.body;
  
  if (!message || !message.trim()) {
    return res.status(400).json({ error: "Message cannot be empty" });
  }
  
  try {
    const response = generateAIResponse(message);
    res.json(response);
  } catch (error) {
    console.error("AI Error:", error);
    res.status(500).json({ error: "An error occurred while processing your request" });
  }
});

// Serve HTML files
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});