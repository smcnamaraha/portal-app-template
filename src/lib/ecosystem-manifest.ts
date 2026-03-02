// ecosystem-manifest.ts — Declare this app's ecosystem participation.
//
// Phase 0 of the BUILD_PLAN fills in these arrays based on the app spec.
// Empty arrays = this app does not participate in the ecosystem (initEcosystem
// will no-op if isConfigured is false or both arrays are empty).
//
// Published stream example:
//   { name: 'my-app-events', type: 'EVENT' as const, description: 'User actions', schema: { type: 'object', properties: { userId: { type: 'string' } }, required: ['userId'] } }
//
// Consumed stream example (stream name registered by another app):
//   'other-app-state'

import type { StreamRegistration } from "./ecosystem";

export const ECOSYSTEM_MANIFEST = {
  publishes: [] as StreamRegistration[],
  consumes: [] as string[],
};
