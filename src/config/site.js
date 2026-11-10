// ===== EDIT YOUR CONTENT HERE =====
import lnt from "../assets/logos/lnt.jpg";
import sharva from "../assets/logos/sharva.jpg";
import uom from "../assets/logos/uom.png";
import jspiders from "../assets/logos/jspiders.jpg";
import infosys from "../assets/logos/infosys.jpg";
import ait from "../assets/logos/ait.jpg";
import currency from "../assets/projects/currency.jpg";
import rag from "../assets/projects/rag.jpg";
import pdfquery from "../assets/projects/pdfquery.jpg";

export const ME = {
  name: "Srihari", // the opening animation needs 9 letters or fewer, no spaces
  role: "Software Engineer",
  intro:
    "Hey, I’m Srihari. A computer science graduate (BE, University of Mysore, CGPA 8.5) with hands-on experience building web applications, working with databases and writing secure, efficient code. I’ve interned in web development and AI at L&T Technology Services, and I’m looking for my first full-time software role across front-end and back-end.",
  email: "sriharigowda837@gmail.com",
  phone: "+91-9740528192",
  location: "India",
  github: "https://github.com/Hari-fr",
  linkedin: "https://www.linkedin.com/in/srihari-s-a28213317",
  resume: import.meta.env.BASE_URL + "Srihari_Resume.pdf", // file lives in /public

  skills: [
    ["Python", "Java", "C", "C++", "SQL", "HTML", "CSS", "JavaScript", "React"],
    ["J2EE", "Spring", "Servlets", "DBMS", "MySQL", "Generative AI", "LLMs", "Hugging Face", "RAG"],
    ["CNN", "YOLO", "OCR", "Sentence Transformers", "Git", "GitHub", "VS Code", "Android Studio", "Ollama", "ChromaDB"],
  ],

  services: [
    ["Web Development", "Responsive web pages and interactive UI components.", "HTML, CSS, JavaScript and React, from an internship building responsive pages and improving usability."],
    ["Java & Backend", "Java, J2EE, Spring, Servlets and MySQL for secure, efficient code.", "Java Full Stack Development certification (Jspiders), with a solid base in DBMS and back-end logic."],
    ["AI & LLM Apps", "RAG pipelines, LLMs and Hugging Face.", "Worked on LLMs, RAG, Hugging Face, OCR and document processing during an AI internship at L&T Technology Services."],
    ["Computer Vision", "CNN and YOLO for real-time detection.", "Built an Android app that recognises Indian currency notes for visually impaired users."],
    ["Documents & Search", "OCR and semantic search over documents.", "Built semantic search pipelines and document scanners using retrieval-augmented generation."],
  ],

  // image: put a screenshot in src/assets/projects/, import it at the top of this file
  //   (e.g. import currency from "../assets/projects/currency.jpg") and add  image: currency
  // live / repo: use "" or "#" to hide a button until you have the link
  projects: [
    { title: "Currency Detection App", stack: "CNN, YOLO, Android Studio", image: currency, imageLabel: "Concept preview",
      desc: "An app that identifies Indian currency notes in real time using CNN and YOLO, built so visually impaired users can recognise denominations independently.",
      live: "", repo: "https://github.com/Hari-fr" },
    { title: "Multi-Model RAG Document Scanner", stack: "RAG, OCR, LLMs", image: rag, imageLabel: "Concept preview",
      desc: "A document scanner that combines retrieval-augmented generation and OCR for precise outputs, with fine-tuned LLMs for readability, accuracy and summarisation.",
      live: "", repo: "https://github.com/Hari-fr" },
    { title: "AI-Powered PDF Query System", stack: "Phi-3-mini, MiniLM, PdfPlumber, Python", image: pdfquery, imageLabel: "Concept preview",
      desc: "A smart PDF interface for natural-language questions, using semantic search and sentence transformers to pull context-aware insights out of documents.",
      live: "", repo: "https://github.com/Hari-fr" },
  ],

  // Not shown on the site yet (no section for them) — ready for an Experience / Education section
  internships: [
    { role: "AI Intern", company: "L&T Technology Services", period: "Sep 2024 – Dec 2024", logo: lnt,
      points: ["Worked on LLMs, RAG, Hugging Face, OCR and document processing.", "Built semantic search pipelines and improved document retrieval.", "Explored Table Transformer and PDF processing using Python."] },
    { role: "Web Developing Intern", company: "Sharva Creative Communications", period: "Sep 2023 – Oct 2023", logo: sharva,
      points: ["Developed responsive web pages using HTML, CSS and JavaScript.", "Built interactive UI components and improved usability."] },
  ],
  education: [
    { school: "University of Mysore, Mysuru", detail: "BE in Computer Science and Design", period: "2021 – 2025", score: "CGPA 8.5", logo: uom },
    { school: "Kuvempu PU College, Mysuru", detail: "Pre University Education", period: "2019 – 2021", score: "82.5%" },
    { school: "Vidya Vardhaka Pandit Nehru High School, Mysuru", detail: "High School (SSLC), Karnataka State Board", period: "2009 – 2019", score: "85.8%" },
  ],
  // logo: import an image at the top of this file and add `logo: yourImport` to an entry
  achievements: [
    { type: "CERTIFICATION", title: "Java Full Stack Development", org: "Jspiders, Mysuru", logo: jspiders,
      topics: ["Core Java", "SQL", "HTML", "CSS", "React", "Advanced Java", "Spring", "Servlets"] },
    { type: "CERTIFICATIONS", title: "Infosys Springboard", org: "Infosys Limited, Mysuru", logo: infosys, topics: [] },
    { type: "HACKATHON", title: "Hackathon Participation", org: "Adichunchanagiri Institute of Technology, Chikkamagalur", logo: ait, topics: [] },
  ],
};

export const NAV = ["home", "about", "service", "experience", "project", "achievements", "contact"];
