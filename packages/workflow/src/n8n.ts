/**
 * n8n webhook integration
 */

export interface N8nWebhookPayload {
  event: string;
  data: Record<string, unknown>;
  metadata?: {
    organizationId?: string;
    userId?: string;
    vertical?: string;
  };
}

/**
 * Trigger an n8n webhook
 */
export async function triggerN8nWebhook(
  webhookPath: string,
  payload: N8nWebhookPayload
): Promise<unknown> {
  const baseUrl = process.env.N8N_WEBHOOK_URL;
  if (!baseUrl) {
    throw new Error('N8N_WEBHOOK_URL is not configured');
  }

  const url = `${baseUrl}${webhookPath}`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(process.env.N8N_API_KEY && {
        'X-N8N-API-KEY': process.env.N8N_API_KEY,
      }),
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`n8n webhook failed: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

/**
 * Common n8n webhook paths by vertical
 * These map to n8n workflows configured for each vertical
 */
export const N8N_WEBHOOKS = {
  // Forge (Construction)
  FORGE_INVOICE_RECEIVED: '/webhook/forge/invoice-received',
  FORGE_PAY_APP_SUBMITTED: '/webhook/forge/pay-app-submitted',
  FORGE_CHANGE_ORDER_APPROVED: '/webhook/forge/change-order-approved',

  // Counsel (Legal)
  COUNSEL_CONTRACT_UPLOADED: '/webhook/counsel/contract-uploaded',
  COUNSEL_DEADLINE_APPROACHING: '/webhook/counsel/deadline-approaching',

  // Ledger (Accounting)
  LEDGER_DOCUMENT_UPLOADED: '/webhook/ledger/document-uploaded',
  LEDGER_RECONCILIATION_COMPLETE: '/webhook/ledger/reconciliation-complete',

  // Generic
  DOCUMENT_PROCESSED: '/webhook/common/document-processed',
  NOTIFICATION_SEND: '/webhook/common/notification-send',
} as const;

/**
 * Helper to create typed webhook triggers
 */
export function createWebhookTrigger<T extends Record<string, unknown>>(
  webhookPath: string
) {
  return (data: T, metadata?: N8nWebhookPayload['metadata']) =>
    triggerN8nWebhook(webhookPath, {
      event: webhookPath.split('/').pop() ?? 'unknown',
      data,
      metadata,
    });
}
