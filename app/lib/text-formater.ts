/**
 * Takes a full name and returns the initials.
 * Example: "I Putu Agus Setiawan" -> "IA"
 * Example: "Agus" -> "AG"
 */
export const getInitials = (fullName: string | undefined | null): string => {
    // 1. Handle empty or non-string inputs
    if (!fullName || typeof fullName !== 'string') return 'U';

    const names = fullName.trim().split(/\s+/).filter(Boolean);
    const count = names.length;

    if (count === 0) return 'U';

    // Capture the first and last elements into constants
    // This "narrowing" tells TypeScript exactly what these objects are
    const first = names[0];
    const last = names[count - 1];

    // 2. Handle Single Name (e.g., "Agus")
    if (count === 1 && first) {
        return first.slice(0, 2).toUpperCase();
    }

    // 3. Handle Multiple Names (e.g., "I Putu Agus")
    if (first && last) {
        const firstInitial = first.charAt(0);
        const lastInitial = last.charAt(0);
        return (firstInitial + lastInitial).toUpperCase();
    }

    return 'U';
};
