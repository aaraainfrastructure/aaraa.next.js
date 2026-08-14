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
  { slug: "tuticorin", name: "Tuticorin", state: "Tamil Nadu", country: "India", isPrimary: true },
  { slug: "perur", name: "Perur", state: "Tamil Nadu", country: "India", isPrimary: true },
  { slug: "bengaluru", name: "Bengaluru", state: "Karnataka", country: "India", isPrimary: true },
  { slug: "kudligi", name: "Kudligi", state: "Karnataka", country: "India", isPrimary: true },
  { slug: "pune", name: "Pune", state: "Maharashtra", country: "India", isPrimary: true },
  { slug: "uthukottai", name: "Uthukottai", state: "Tamil Nadu", country: "India", isPrimary: true },
  { slug: "mumbai", name: "Mumbai", state: "Maharashtra", country: "India", isPrimary: false }
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
