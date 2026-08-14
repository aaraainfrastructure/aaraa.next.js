/**
 * AARAA Infrastructure - Construction Career Taxonomy
 * Standardized categories, roles, departments, and verified locations for AARAA Infrastructure.
 */

export const DEPARTMENTS = [
  "Civil Engineering",
  "Site Engineering",
  "Project Management",
  "Planning & Scheduling",
  "Quantity Surveying",
  "Billing & Estimation",
  "Contracts & Claims",
  "MEP (Mechanical, Electrical, Plumbing)",
  "Electrical Infrastructure",
  "Mechanical Engineering",
  "HVAC & Building Services",
  "Plumbing & Firefighting",
  "QA/QC (Quality Assurance & Control)",
  "Safety / HSE (Health, Safety, Environment)",
  "Procurement & Supply Chain",
  "Stores & Material Management",
  "Architecture & Design",
  "Interior Fit-Out",
  "Solar EPC & Renewables",
  "Desalination & Water Infrastructure",
  "Finance & Commercial",
  "HR & Talent Acquisition",
  "Administration & Operations",
  "Business Development"
];

export const PROJECT_TYPES = [
  "Civil Construction",
  "Industrial Construction",
  "Infrastructure & Roadworks",
  "Commercial Buildings",
  "Institutional & Educational",
  "Renewable Energy (Solar EPC)",
  "Wind & Hybrid Power",
  "Desalination & Water Treatment",
  "Interior Fit-Out & PEB",
  "Repair & Renovation"
];

export const VERIFIED_LOCATIONS = [
  { slug: "chennai", name: "Chennai", state: "Tamil Nadu", country: "India", isPrimary: true },
  { slug: "bengaluru", name: "Bengaluru", state: "Karnataka", country: "India", isPrimary: true },
  { slug: "mumbai", name: "Mumbai", state: "Maharashtra", country: "India", isPrimary: true },
  { slug: "delhi-ncr", name: "Delhi NCR", state: "Delhi", country: "India", isPrimary: true },
  { slug: "hyderabad", name: "Hyderabad", state: "Telangana", country: "India", isPrimary: true },
  { slug: "pune", name: "Pune", state: "Maharashtra", country: "India", isPrimary: true },
  { slug: "kolkata", name: "Kolkata", state: "West Bengal", country: "India", isPrimary: true },
  { slug: "ahmedabad", name: "Ahmedabad", state: "Gujarat", country: "India", isPrimary: true },
  { slug: "kochi", name: "Kochi", state: "Kerala", country: "India", isPrimary: true },
  { slug: "coimbatore", name: "Coimbatore", state: "Tamil Nadu", country: "India", isPrimary: true },
  { slug: "hosur", name: "Hosur", state: "Tamil Nadu", country: "India", isPrimary: true },
  { slug: "madurai", name: "Madurai", state: "Tamil Nadu", country: "India", isPrimary: false },
  { slug: "trichy", name: "Trichy", state: "Tamil Nadu", country: "India", isPrimary: false },
  { slug: "salem", name: "Salem", state: "Tamil Nadu", country: "India", isPrimary: false },
  { slug: "visakhapatnam", name: "Visakhapatnam", state: "Andhra Pradesh", country: "India", isPrimary: false },
  { slug: "vijayawada", name: "Vijayawada", state: "Andhra Pradesh", country: "India", isPrimary: false },
  { slug: "mangaluru", name: "Mangaluru", state: "Karnataka", country: "India", isPrimary: false },
  { slug: "mysuru", name: "Mysuru", state: "Karnataka", country: "India", isPrimary: false },
  { slug: "jaipur", name: "Jaipur", state: "Rajasthan", country: "India", isPrimary: false },
  { slug: "lucknow", name: "Lucknow", state: "Uttar Pradesh", country: "India", isPrimary: false },
  { slug: "noida", name: "Noida", state: "Uttar Pradesh", country: "India", isPrimary: false },
  { slug: "gurugram", name: "Gurugram", state: "Haryana", country: "India", isPrimary: false },
  { slug: "chandigarh", name: "Chandigarh", state: "Punjab", country: "India", isPrimary: false },
  { slug: "bhopal", name: "Bhopal", state: "Madhya Pradesh", country: "India", isPrimary: false },
  { slug: "indore", name: "Indore", state: "Madhya Pradesh", country: "India", isPrimary: false },
  { slug: "nagpur", name: "Nagpur", state: "Maharashtra", country: "India", isPrimary: false },
  { slug: "surat", name: "Surat", state: "Gujarat", country: "India", isPrimary: false },
  { slug: "vadodara", name: "Vadodara", state: "Gujarat", country: "India", isPrimary: false },
  { slug: "bhubaneswar", name: "Bhubaneswar", state: "Odisha", country: "India", isPrimary: false },
  { slug: "guwahati", name: "Guwahati", state: "Assam", country: "India", isPrimary: false }
];

export const CORE_ROLES = [
  { slug: "civil-engineer", title: "Civil Engineer", dept: "Civil Engineering" },
  { slug: "site-engineer", title: "Site Engineer", dept: "Site Engineering" },
  { slug: "civil-site-engineer", title: "Civil Site Engineer", dept: "Site Engineering" },
  { slug: "planning-engineer", title: "Planning Engineer", dept: "Planning & Scheduling" },
  { slug: "quantity-surveyor", title: "Quantity Surveyor", dept: "Quantity Surveying" },
  { slug: "billing-engineer", title: "Billing Engineer", dept: "Billing & Estimation" },
  { slug: "project-engineer", title: "Project Engineer", dept: "Project Management" },
  { slug: "project-manager", title: "Project Manager", dept: "Project Management" },
  { slug: "mep-engineer", title: "MEP Engineer", dept: "MEP (Mechanical, Electrical, Plumbing)" },
  { slug: "electrical-engineer", title: "Electrical Engineer", dept: "Electrical Infrastructure" },
  { slug: "safety-engineer", title: "Safety Engineer (HSE)", dept: "Safety / HSE (Health, Safety, Environment)" },
  { slug: "qa-qc-engineer", title: "QA/QC Engineer", dept: "QA/QC (Quality Assurance & Control)" },
  { slug: "procurement-engineer", title: "Procurement Engineer", dept: "Procurement & Supply Chain" },
  { slug: "solar-epc-engineer", title: "Solar EPC Engineer", dept: "Solar EPC & Renewables" }
];
