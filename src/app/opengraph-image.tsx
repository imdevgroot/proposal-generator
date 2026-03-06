import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Proposal Generator';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          display: 'flex',
          background: 'linear-gradient(135deg, #0a0d14 0%, #060e1a 50%, #0a0d14 100%)',
          position: 'relative',
          overflow: 'hidden',
          fontFamily: 'system-ui, -apple-system, sans-serif',
        }}
      >
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '8px', background: '#3b82f6', display: 'flex' }} />
        <div style={{ position: 'absolute', right: '-80px', top: '-80px', width: '480px', height: '480px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%)', display: 'flex' }} />
        <div style={{ position: 'absolute', left: '200px', bottom: '-100px', width: '600px', height: '300px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(59,130,246,0.1) 0%, transparent 70%)', display: 'flex' }} />
        <div style={{ display: 'flex', flexDirection: 'column', padding: '52px 80px 52px 96px', flex: 1, justifyContent: 'space-between' }}>
          <div style={{ color: '#3b82f6', fontSize: '15px', fontWeight: 700, letterSpacing: '4px', display: 'flex' }}>AGENCY TOOLS</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ color: '#ffffff', fontSize: '64px', fontWeight: 900, lineHeight: 1.05, display: 'flex' }}>Proposal Generator</div>
            <div style={{ color: 'rgba(255,255,255,0.55)', fontSize: '22px', lineHeight: 1.45, maxWidth: '700px', display: 'flex' }}>Generate branded agency proposals instantly</div>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <div style={{ background: 'rgba(59,130,246,0.15)', border: '1px solid rgba(59,130,246,0.35)', color: '#3b82f6', padding: '8px 18px', borderRadius: '6px', fontSize: '14px', fontWeight: 600, display: 'flex' }}>Custom Branding</div>
            <div style={{ background: 'rgba(59,130,246,0.15)', border: '1px solid rgba(59,130,246,0.35)', color: '#3b82f6', padding: '8px 18px', borderRadius: '6px', fontSize: '14px', fontWeight: 600, display: 'flex' }}>Scope and Pricing</div>
            <div style={{ background: 'rgba(59,130,246,0.15)', border: '1px solid rgba(59,130,246,0.35)', color: '#3b82f6', padding: '8px 18px', borderRadius: '6px', fontSize: '14px', fontWeight: 600, display: 'flex' }}>PDF Ready</div>
            <div style={{ background: 'rgba(59,130,246,0.15)', border: '1px solid rgba(59,130,246,0.35)', color: '#3b82f6', padding: '8px 18px', borderRadius: '6px', fontSize: '14px', fontWeight: 600, display: 'flex' }}>Professional Format</div>
          </div>
        </div>
        <div style={{ position: 'absolute', right: '80px', top: '28px', color: 'rgba(255,255,255,0.06)', fontSize: '160px', display: 'flex' }}>📄</div>
        <div style={{ position: 'absolute', bottom: '28px', right: '80px', color: 'rgba(255,255,255,0.2)', fontSize: '14px', display: 'flex' }}>proposal-generator-blue.vercel.app</div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
