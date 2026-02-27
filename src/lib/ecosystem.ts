// lib/ecosystem.ts — Portal v6 Ecosystem Client
// Auto-included in every portal-built app

interface EcosystemConfig {
  apiUrl: string;
  apiKey: string;
  appSlug: string;
}

interface PublishOptions {
  stream: string;
  payload: Record<string, unknown>;
}

interface StreamOptions {
  since?: string;
  page?: number;
  limit?: number;
}

interface StreamRegistration {
  name: string;
  type: "EVENT" | "STATE" | "FEED";
  description: string;
  schema?: Record<string, unknown>;
}

class EcosystemClient {
  private config: EcosystemConfig;

  constructor(config?: Partial<EcosystemConfig>) {
    this.config = {
      apiUrl: config?.apiUrl || process.env.ECOSYSTEM_API_URL || "",
      apiKey: config?.apiKey || process.env.ECOSYSTEM_API_KEY || "",
      appSlug: config?.appSlug || process.env.APP_SLUG || "",
    };
  }

  /** Check if the ecosystem client is configured */
  get isConfigured(): boolean {
    return !!(this.config.apiUrl && this.config.apiKey);
  }

  /** Register streams this app publishes (call on startup) */
  async register(
    streams: StreamRegistration[]
  ): Promise<string[] | null> {
    if (!this.isConfigured || streams.length === 0) return null;
    const result = await this.request<{ registered: string[] }>(
      "POST",
      "/register",
      { streams }
    );
    return result?.registered || null;
  }

  /** Publish data to a stream this app owns */
  async publish(options: PublishOptions): Promise<boolean> {
    if (!this.isConfigured) return false;
    const result = await this.request<{ published: boolean }>(
      "POST",
      "/publish",
      options
    );
    return result?.published || false;
  }

  /** Read data from any stream this app is subscribed to */
  async read<T = unknown>(
    streamName: string,
    options?: StreamOptions
  ): Promise<T | null> {
    if (!this.isConfigured) return null;
    const params = new URLSearchParams();
    if (options?.since) params.set("since", options.since);
    if (options?.page) params.set("page", String(options.page));
    if (options?.limit) params.set("limit", String(options.limit));
    const qs = params.toString() ? `?${params.toString()}` : "";
    return this.request<T>("GET", `/stream/${streamName}${qs}`);
  }

  /** Subscribe to a stream (usually done once during setup) */
  async subscribe(streamName: string): Promise<boolean> {
    if (!this.isConfigured) return false;
    const result = await this.request<{ subscribed: boolean }>(
      "POST",
      "/subscribe",
      { stream: streamName }
    );
    return result?.subscribed || false;
  }

  /** Unsubscribe from a stream */
  async unsubscribe(streamName: string): Promise<boolean> {
    if (!this.isConfigured) return false;
    const result = await this.request<{ unsubscribed: boolean }>(
      "POST",
      "/unsubscribe",
      { stream: streamName }
    );
    return result?.unsubscribed || false;
  }

  private async request<T = unknown>(
    method: string,
    path: string,
    body?: unknown
  ): Promise<T | null> {
    if (!this.config.apiUrl || !this.config.apiKey) {
      console.warn("[Ecosystem] Not configured — skipping request to", path);
      return null;
    }

    try {
      const url = `${this.config.apiUrl}${path}`;
      const response = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${this.config.apiKey}`,
          "Content-Type": "application/json",
        },
        ...(body ? { body: JSON.stringify(body) } : {}),
      });

      if (!response.ok) {
        const error = await response.text().catch(() => "Unknown error");
        console.error(
          `[Ecosystem] ${method} ${path} failed (${response.status}): ${error}`
        );
        return null;
      }

      const contentType = response.headers.get("content-type");
      if (contentType?.includes("application/json")) {
        return response.json() as Promise<T>;
      }
      return null;
    } catch (error) {
      console.error(`[Ecosystem] ${method} ${path} error:`, error);
      return null;
    }
  }
}

// Singleton instance — import and use directly
export const ecosystem = new EcosystemClient();

// Named export for custom configuration
export { EcosystemClient };
export type {
  EcosystemConfig,
  PublishOptions,
  StreamOptions,
  StreamRegistration,
};
