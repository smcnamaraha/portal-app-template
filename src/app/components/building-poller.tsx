'use client';

import { useState, useEffect } from 'react';

interface BuildStatus {
  state: string;
  phase?: string;
  appName?: string;
}

interface Props {
  initialPhase: string;
  appName: string;
}

export default function BuildingPoller({ initialPhase, appName }: Props) {
  const [phase, setPhase] = useState(initialPhase);

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const res = await fetch('/build-status.json', { cache: 'no-store' });
        if (!res.ok) return;
        const data: BuildStatus = await res.json();
        if (data.state === 'building' && data.phase) {
          setPhase(data.phase);
        } else if (data.state !== 'building') {
          // State changed (e.g. build completed) — reload for server-rendered new state
          window.location.reload();
        }
      } catch {
        // Keep last known phase on error — do not crash
      }
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-center space-y-6 z-10 relative">
      <h1 className="text-5xl font-heading text-primary tracking-tight leading-none">
        {appName}
      </h1>
      <p className="text-base text-text-secondary">
        Building{' '}
        <span className="text-primary font-medium">{phase}</span>
      </p>
      <div className="flex justify-center gap-2" aria-label="Building in progress">
        <span
          className="w-2 h-2 rounded-full bg-primary animate-bounce"
          style={{ animationDelay: '0ms' }}
        />
        <span
          className="w-2 h-2 rounded-full bg-primary animate-bounce"
          style={{ animationDelay: '150ms' }}
        />
        <span
          className="w-2 h-2 rounded-full bg-primary animate-bounce"
          style={{ animationDelay: '300ms' }}
        />
      </div>
    </div>
  );
}
