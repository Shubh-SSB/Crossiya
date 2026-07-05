const servers = ["Sarah", "Michael", "Emma", "David", "James", "Olivia"];

/**
 * Deterministically assigns a server name based on the order ID.
 * This ensures the same order always gets the same server assigned.
 */
export function getServerName(orderId: string): string {
    if (!orderId) return servers[0];
    
    // Simple hash function to convert string to number
    let hash = 0;
    for (let i = 0; i < orderId.length; i++) {
        hash = ((hash << 5) - hash) + orderId.charCodeAt(i);
        hash |= 0; // Convert to 32bit integer
    }
    
    // Use absolute value of hash to pick an index
    const index = Math.abs(hash) % servers.length;
    return servers[index];
}
