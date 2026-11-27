export function unsplash(id: string, w = 1200, h = 800): string {
  return `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&q=80&auto=format`;
}

// Stock photos still standing in for the studio's own.
export const STOCK = {
  studio1: unsplash("1497366811353-6870744d04b2", 1200, 800),
};
