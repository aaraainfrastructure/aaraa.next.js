import { BASE_URL } from '@/lib/careers-seo';

export const metadata = {
  title: 'Open Construction Positions & Job Vacancies | AARAA Infrastructure',
  description: 'Browse verified site engineering, quantity surveying, planning, MEP, and project management vacancies across India.',
  alternates: {
    canonical: `${BASE_URL}/careers/jobs`
  }
};

export default function JobsLayout({ children }) {
  return children;
}
