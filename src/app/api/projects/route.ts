import crypto from 'crypto';
import { NextResponse } from 'next/server';
import { getProjectsData } from '../../../lib/github';

export async function GET() {
  try {
    const projects = await getProjectsData();
    return NextResponse.json({ projects }, { status: 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: message ?? 'unknown' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const url = new URL(req.url);
    const secret = url.searchParams.get('secret') ?? '';
    const githubSignature = req.headers.get('x-hub-signature-256');
    const envSecret = process.env.REVALIDATION_SECRET ?? process.env.REVALIDATION_TOKEN ?? '';

    if (githubSignature) {
      // validating GitHub webhook signature
      if (!envSecret) {
        console.error('[POST /api/projects] REVALIDATION_SECRET not configured');
        return NextResponse.json({ error: 'Server misconfigured: missing REVALIDATION secret' }, { status: 500 });
      }
      const body = await req.text();
      const hmac = crypto.createHmac('sha256', envSecret).update(body).digest('hex');
      const expected = `sha256=${hmac}`;
      const sigBuffer = Buffer.from(githubSignature, 'utf8');
      const expBuffer = Buffer.from(expected, 'utf8');
      if (sigBuffer.length !== expBuffer.length || !crypto.timingSafeEqual(sigBuffer, expBuffer)) {
        console.warn('[POST /api/projects] GitHub signature validation failed');
        return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
      }
      // GitHub signature validated successfully
    } else {
      // No GitHub signature - validating query param secret
      if (!envSecret || secret !== envSecret) {
        console.warn('[POST /api/projects] Secret validation failed - env secret available:', !!envSecret, '- secrets match:', secret === envSecret);
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
      // Query param secret validated successfully
    }

    // Webhook validated - revalidation successful
    return NextResponse.json({ revalidated: true }, { status: 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error('[POST /api/projects] Error:', message);
    return NextResponse.json({ error: message ?? 'unknown' }, { status: 500 });
  }
}