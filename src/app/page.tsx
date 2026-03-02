import { readFileSync } from 'fs';
import { join } from 'path';
import BuildingPoller from '@/app/components/building-poller';

interface BuildStatus {
  state: 'draft' | 'building' | 'preview';
  phase?: string;
  appName?: string;
  prNumber?: number;
}

function getBuildStatus(): BuildStatus {
  try {
    const filePath = join(process.cwd(), 'public', 'build-status.json');
    return JSON.parse(readFileSync(filePath, 'utf-8')) as BuildStatus;
  } catch {
    return { state: 'draft', appName: 'Portal App' };
  }
}

export default function Home() {
  const status = getBuildStatus();
  const appName = status.appName || 'Portal App';

  return (
    <main className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-bg">
      {/* Ambient glow element — adapts to --color-primary via CSS variable */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 40%, var(--color-primary), transparent)',
          animation:
            status.state === 'preview'
              ? 'settle-pulse 6s ease-in-out infinite'
              : 'glow-pulse 4s ease-in-out infinite',
        }}
      />

      {status.state === 'draft' && (
        <DraftState appName={appName} />
      )}

      {status.state === 'building' && (
        <BuildingPoller
          initialPhase={status.phase || 'Designing'}
          appName={appName}
        />
      )}

      {status.state === 'preview' && (
        <PreviewState appName={appName} prNumber={status.prNumber} />
      )}
    </main>
  );
}

function DraftState({ appName }: { appName: string }) {
  return (
    <div className="text-center space-y-4 z-10 relative">
      <h1 className="text-7xl font-heading text-primary tracking-tight leading-none">
        {appName}
      </h1>
      <p className="text-lg text-text-secondary">Coming Soon</p>
    </div>
  );
}

function PreviewState({
  appName,
  prNumber,
}: {
  appName: string;
  prNumber?: number;
}) {
  const previewUrl = prNumber
    ? `https://pr-${prNumber}-${appName}.underlay.io`
    : undefined;

  return (
    <div className="text-center space-y-6 z-10 relative">
      <h1 className="text-7xl font-heading text-primary tracking-tight leading-none">
        {appName}
      </h1>
      <p className="text-lg text-text-secondary">Ready for Review</p>
      {previewUrl && (
        <a
          href={previewUrl}
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary/10 border border-primary/20 text-primary rounded-lg hover:bg-primary/20 transition-colors text-base font-body font-medium"
        >
          View Preview →
        </a>
      )}
    </div>
  );
}
