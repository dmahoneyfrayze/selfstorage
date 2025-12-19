export interface GHLContact {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    phone?: string;
}

/**
 * MOCK implementation of GHL Connector.
 * In production, this would make requests to api.gohighlevel.com
 */
export const GHLService = {
    /**
     * Creates or updates a contact in GHL
     */
    createContact: async (data: Partial<GHLContact>): Promise<GHLContact> => {
        console.log('[GHL MOCK] Creating contact:', data);
        // Simulate API latency
        await new Promise(resolve => setTimeout(resolve, 500));

        return {
            id: `ghl_${Math.random().toString(36).substr(2, 9)}`,
            email: data.email || '',
            firstName: data.firstName || '',
            lastName: data.lastName || '',
            phone: data.phone
        };
    },

    /**
     * Adds a note to a contact (e.g. "Booked Unit A-101")
     */
    addNote: async (contactId: string, note: string) => {
        console.log(`[GHL MOCK] Adding note to ${contactId}: ${note}`);
        await new Promise(resolve => setTimeout(resolve, 300));
        return true;
    },

    /**
     * Triggers a workflow webhook in GHL
     */
    triggerWorkflow: async (contactId: string, workflowId: string) => {
        console.log(`[GHL MOCK] Triggering workflow ${workflowId} for ${contactId}`);
        return true;
    }
}
