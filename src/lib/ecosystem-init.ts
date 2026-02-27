// lib/ecosystem-init.ts — Ecosystem initialization helper
// Called during app startup to register streams and set up subscriptions

import { ecosystem } from "./ecosystem";
import type { StreamRegistration } from "./ecosystem";

interface EcosystemManifest {
  publishes?: StreamRegistration[];
  consumes?: string[]; // stream names to subscribe to
}

let initialized = false;

/**
 * Initialize ecosystem connections for this app.
 * Call this once during app startup (e.g., in root layout or API init).
 * Safe to call multiple times — only runs once.
 */
export async function initEcosystem(
  manifest?: EcosystemManifest
): Promise<void> {
  if (initialized || !ecosystem.isConfigured) return;
  initialized = true;

  try {
    // Register published streams
    if (manifest?.publishes?.length) {
      const registered = await ecosystem.register(manifest.publishes);
      if (registered) {
        console.log(
          `[Ecosystem] Registered ${registered.length} stream(s):`,
          registered
        );
      }
    }

    // Subscribe to consumed streams
    if (manifest?.consumes?.length) {
      for (const streamName of manifest.consumes) {
        const success = await ecosystem.subscribe(streamName);
        if (success) {
          console.log(`[Ecosystem] Subscribed to: ${streamName}`);
        }
      }
    }
  } catch (error) {
    console.error("[Ecosystem] Initialization error:", error);
    // Non-fatal — app continues without ecosystem
  }
}
