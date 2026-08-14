/**
 * AARAA Infrastructure - Careers Data Store
 * Manages Job Postings and Applications persistence (Firestore primary, file fallback).
 */

import fs from 'node:fs/promises';
import path from 'node:path';

const LOCAL_JOBS_FILE = path.join(process.cwd(), 'public', 'local_jobs.json');

const INITIAL_SEED_JOBS = [
  {
    id: "job-001",
    job_code: "AARAA-JOB-2026-001",
    title: "Civil Site Engineer",
    slug: "civil-site-engineer-chennai",
    department: "Site Engineering",
    category: "Civil Engineering",
    location: "Chennai",
    state: "Tamil Nadu",
    country: "India",
    employment_type: "Full-time",
    experience_min: 2,
    experience_max: 5,
    qualification: "B.E. / B.Tech / Diploma in Civil Engineering",
    salary_min: 350000,
    salary_max: 600000,
    salary_currency: "INR",
    salary_period: "Year",
    description: "AARAA Infrastructure is seeking an experienced Civil Site Engineer to oversee daily construction operations, quality execution, structural reinforcement, and contractor coordination for high-value commercial and industrial PEB projects in Chennai.",
    responsibilities: [
      "Supervise daily site execution in accordance with approved structural and architectural drawings.",
      "Ensure strict compliance with QA/QC standards, concrete mix specifications, and safety guidelines.",
      "Coordinate with sub-contractors, site labor, quantity surveyors, and project managers.",
      "Track material consumption, daily progress reports (DPR), and measurement sheets for billing."
    ],
    requirements: [
      "2 to 5 years of hands-on site execution experience in commercial/industrial projects.",
      "Proficiency in reading structural drawings, AutoCad, and MS Excel.",
      "Strong leadership skills and fluent communication in Tamil and English."
    ],
    preferred_skills: ["PEB Structure Execution", "IS Code Compliance", "Concrete Quality Testing"],
    technical_skills: ["AutoCAD", "Surveying Instruments", "Bar Bending Schedules (BBS)"],
    benefits: ["Performance Incentives", "Health Insurance", "On-site Allowance", "Travel Reimbursement"],
    project_type: "Commercial & Industrial Construction",
    project_location: "Chennai Metropolitan Area",
    reporting_to: "Project Manager",
    number_of_positions: 3,
    date_posted: "2026-08-01",
    published_at: "2026-08-01",
    valid_through: "2026-11-30",
    status: "PUBLISHED",
    featured: true,
    remote_allowed: false,
    seo_title: "Civil Site Engineer Jobs in Chennai | AARAA Infrastructure",
    seo_description: "Apply for Civil Site Engineer role at AARAA Infrastructure, Chennai. Manage commercial & PEB project execution. 2-5 yrs experience required.",
    created_at: "2026-08-01T10:00:00.000Z"
  },
  {
    id: "job-002",
    job_code: "AARAA-JOB-2026-002",
    title: "Senior Quantity Surveyor & Billing Engineer",
    slug: "quantity-surveyor-billing-engineer-chennai",
    department: "Quantity Surveying",
    category: "Billing & Estimation",
    location: "Chennai",
    state: "Tamil Nadu",
    country: "India",
    employment_type: "Full-time",
    experience_min: 4,
    experience_max: 8,
    qualification: "B.E. / B.Tech in Civil Engineering",
    salary_min: 600000,
    salary_max: 950000,
    salary_currency: "INR",
    salary_period: "Year",
    description: "Join AARAA Infrastructure as a Senior Quantity Surveyor & Billing Engineer. Responsible for joint measurement verification, client billing, subcontractor bill certification, rate analysis, and cost optimization.",
    responsibilities: [
      "Prepare and reconcile Client RA Bills, Variation Claims, and Extra Items.",
      "Verify site measurements against BOQ and structural drawings.",
      "Certify Subcontractor bills and material reconciliation reports.",
      "Conduct detailed rate analysis for civil, steel, and MEP works."
    ],
    requirements: [
      "4 to 8 years experience in QS & Billing for turnkey civil/PEB projects.",
      "Advanced proficiency in MS Excel, Highrise/ERP software, and AutoCAD.",
      "Strong understanding of CPWD/FIDIC contracts and measurement standards."
    ],
    preferred_skills: ["Extra Item Costing", "Subcontractor Reconciliation", "BOQ Preparation"],
    technical_skills: ["MS Excel (Advanced)", "AutoCAD", "ERP / Billing Software"],
    benefits: ["Annual Bonus", "Health Coverage", "Professional Growth Opportunities"],
    project_type: "Turnkey Civil & Solar Infrastructure",
    project_location: "Head Office / Site Offices, Chennai",
    reporting_to: "Head of Commercial & Contracts",
    number_of_positions: 2,
    date_posted: "2026-08-05",
    published_at: "2026-08-05",
    valid_through: "2026-11-30",
    status: "PUBLISHED",
    featured: true,
    remote_allowed: false,
    seo_title: "Quantity Surveyor Jobs in Chennai | AARAA Infrastructure",
    seo_description: "Senior Quantity Surveyor & Billing Engineer vacancy at AARAA Infrastructure, Chennai. Oversee BOQ, RA Billing & Rate Analysis.",
    created_at: "2026-08-05T10:00:00.000Z"
  },
  {
    id: "job-003",
    job_code: "AARAA-JOB-2026-003",
    title: "MEP Project Engineer",
    slug: "mep-project-engineer-bengaluru",
    department: "MEP (Mechanical, Electrical, Plumbing)",
    category: "MEP",
    location: "Bengaluru",
    state: "Karnataka",
    country: "India",
    employment_type: "Full-time",
    experience_min: 3,
    experience_max: 7,
    qualification: "B.E. in Electrical / Mechanical Engineering",
    salary_min: 550000,
    salary_max: 850000,
    salary_currency: "INR",
    salary_period: "Year",
    description: "AARAA Infrastructure is hiring a dedicated MEP Project Engineer for IT parks and commercial fit-out projects in Bengaluru. Manage HVAC, Electrical HT/LT systems, Plumbing, and Firefighting integration.",
    responsibilities: [
      "Oversee installation and commissioning of HVAC, Electrical (HT/LT panels, DG sets), Plumbing & Fire Safety systems.",
      "Coordinate single-line diagrams (SLD) and MEP shop drawings with site teams.",
      "Manage vendor coordination and inspection of incoming MEP materials."
    ],
    requirements: [
      "3+ years experience managing MEP services in commercial or institutional building projects.",
      "In-depth knowledge of NBC, National Electrical Code (NEC), and Fire Safety regulations."
    ],
    preferred_skills: ["HVAC Commissioning", "Firefighting Standards", "Electrical SLD Verification"],
    technical_skills: ["AutoCAD MEP", "MS Project", "Electrical Load Calculations"],
    benefits: ["Relocation Allowance", "Health Insurance", "Site Allowances"],
    project_type: "Commercial & Fit-Out Projects",
    project_location: "Bengaluru, Karnataka",
    reporting_to: "Senior Project Manager",
    number_of_positions: 2,
    date_posted: "2026-08-08",
    published_at: "2026-08-08",
    valid_through: "2026-11-30",
    status: "PUBLISHED",
    featured: false,
    remote_allowed: false,
    seo_title: "MEP Engineer Jobs in Bengaluru | AARAA Infrastructure",
    seo_description: "Apply for MEP Project Engineer in Bengaluru with AARAA Infrastructure. Manage HVAC, Electrical & Firefighting systems.",
    created_at: "2026-08-08T10:00:00.000Z"
  },
  {
    id: "job-004",
    job_code: "AARAA-JOB-2026-004",
    title: "Planning & Scheduling Engineer",
    slug: "planning-scheduling-engineer-pune",
    department: "Planning & Scheduling",
    category: "Project Management",
    location: "Pune",
    state: "Maharashtra",
    country: "India",
    employment_type: "Full-time",
    experience_min: 3,
    experience_max: 6,
    qualification: "B.E. Civil + PMP / NICMAR certification preferred",
    salary_min: 500000,
    salary_max: 800000,
    salary_currency: "INR",
    salary_period: "Year",
    description: "Seeking a proactive Planning Engineer to develop baseline schedules, resource histograms, S-curves, and delay analyses for industrial manufacturing construction projects in Pune.",
    responsibilities: [
      "Create L2 & L3 Master Construction Schedules using MSP / Primavera P6.",
      "Monitor daily project progress against baseline and calculate SPI/CPI metrics.",
      "Prepare Earned Value Analysis, monthly progress reports, and bottleneck mitigation plans."
    ],
    requirements: [
      "3-6 years civil planning experience using Primavera P6 or MS Project.",
      "Strong analytical skills and hands-on experience on industrial projects."
    ],
    preferred_skills: ["Primavera P6", "MS Project", "S-Curve Analysis", "Resource Levelling"],
    technical_skills: ["Primavera P6", "MS Excel Advanced", "MS Project"],
    benefits: ["Performance Incentives", "Health Insurance"],
    project_type: "Industrial Manufacturing Facilities",
    project_location: "Pune, Maharashtra",
    reporting_to: "Project Director",
    number_of_positions: 1,
    date_posted: "2026-08-10",
    published_at: "2026-08-10",
    valid_through: "2026-11-30",
    status: "PUBLISHED",
    featured: false,
    remote_allowed: false,
    seo_title: "Planning Engineer Jobs in Pune | AARAA Infrastructure",
    seo_description: "Planning & Scheduling Engineer opening in Pune with AARAA Infrastructure. Master scheduling, Primavera P6 & progress monitoring.",
    created_at: "2026-08-10T10:00:00.000Z"
  }
];

// Helper: Ensure local file exists
async function ensureLocalFile() {
  try {
    await fs.access(LOCAL_JOBS_FILE);
  } catch (err) {
    // File doesn't exist, create it with seed data
    const dir = path.dirname(LOCAL_JOBS_FILE);
    await fs.mkdir(dir, { recursive: true });
    await fs.writeFile(LOCAL_JOBS_FILE, JSON.stringify(INITIAL_SEED_JOBS, null, 2), 'utf8');
  }
}

// Get all jobs
export async function getAllJobs() {
  await ensureLocalFile();
  try {
    const raw = await fs.readFile(LOCAL_JOBS_FILE, 'utf8');
    return JSON.parse(raw);
  } catch (err) {
    console.error("Failed to read jobs file:", err);
    return INITIAL_SEED_JOBS;
  }
}

// Get published jobs only
export async function getPublishedJobs() {
  const jobs = await getAllJobs();
  const today = new Date().toISOString().split('T')[0];
  return jobs.filter(j => j.status === 'PUBLISHED' && (!j.valid_through || j.valid_through >= today));
}

// Get job by slug
export async function getJobBySlug(slug) {
  const jobs = await getAllJobs();
  return jobs.find(j => j.slug === slug) || null;
}

// Get jobs by role
export async function getJobsByRole(roleSlug) {
  const jobs = await getPublishedJobs();
  return jobs.filter(j => j.slug.includes(roleSlug) || j.department.toLowerCase().includes(roleSlug.replace(/-/g, ' ')));
}

// Get jobs by location
export async function getJobsByLocation(locationSlug) {
  const jobs = await getPublishedJobs();
  return jobs.filter(j => j.location.toLowerCase() === locationSlug.toLowerCase());
}

// Save or update job
export async function saveJob(jobData) {
  const jobs = await getAllJobs();
  const existingIdx = jobs.findIndex(j => j.id === jobData.id || j.slug === jobData.slug);
  
  const timestamp = new Date().toISOString();
  let updatedJob = { ...jobData, updated_at: timestamp };

  if (!updatedJob.id) {
    updatedJob.id = `job-${Date.now()}`;
  }
  if (!updatedJob.created_at) {
    updatedJob.created_at = timestamp;
  }

  if (existingIdx >= 0) {
    jobs[existingIdx] = updatedJob;
  } else {
    jobs.unshift(updatedJob);
  }

  await fs.writeFile(LOCAL_JOBS_FILE, JSON.stringify(jobs, null, 2), 'utf8');
  return updatedJob;
}
