import { NextResponse } from 'next/server';
import { getPublishedJobs } from '@/lib/careers-store';

export async function GET() {
  try {
    const jobs = await getPublishedJobs();
    return NextResponse.json(jobs, {
      headers: {
        'Cache-Control': 'no-store, max-age=0'
      }
    });
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return NextResponse.json({ error: "Failed to load jobs" }, { status: 500 });
  }
}
