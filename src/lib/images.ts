export function unsplash(id: string, w = 1200, h = 800): string {
  return `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&q=80&auto=format`;
}

export function unsplashLoader({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality?: number;
}): string {
  const q = quality || 75;
  // Replace width/quality params in Unsplash URL
  return src.replace(/w=\d+/, `w=${width}`).replace(/q=\d+/, `q=${q}`);
}

export const STOCK = {
  // Hero / Featured
  hero1: "/images/projects/commercial/brash-fashion-scms/projects-bfscm-001.jpg",
  hero2: unsplash("1545093149-618ce3bcf49d", 1920, 1080),
  hero3: unsplash("1511818966892-d7d671e672a2", 1920, 1080),
  hero4: unsplash("1518005020951-eccb494ad742", 1920, 1080),

  // Projects
  p1: unsplash("1600585154340-be6161a56a0c", 1200, 800),
  p2: unsplash("1600607687939-ce8a6c25118c", 1200, 800),
  p3: unsplash("1486718448742-163732cd1544", 1200, 800),
  p4: unsplash("1600566753086-00f18fb6b3ea", 1200, 800),
  p5: unsplash("1618221195710-dd6b41faaea6", 1200, 800),
  p6: unsplash("1506905925346-21bda4d32df4", 1200, 800),
  p7: unsplash("1512917774080-9991f1c4c750", 1200, 800),
  p8: unsplash("1574958269340-fa927503f3dd", 1200, 800),
  p9: unsplash("1497366216548-37526070297c", 1200, 800),
  p10: unsplash("1600210492486-724fe5c67fb0", 1200, 800),

  // Project detail gallery extras
  d1: unsplash("1600573472592-401b489a3cdc", 1600, 900),
  d2: unsplash("1600585154526-990dced4db0d", 1600, 900),
  d3: unsplash("1600585154084-4e5fe7c39198", 1600, 900),
  d4: unsplash("1600566752355-35792bedcfea", 1600, 900),
  d5: unsplash("1496564203457-11bb12075d90", 1600, 900),

  // Categories
  catResidential: unsplash("1600585154340-be6161a56a0c", 800, 1000),
  catCultural: unsplash("1574958269340-fa927503f3dd", 800, 1000),
  catCommercial: unsplash("1486718448742-163732cd1544", 800, 1000),
  catInterior: unsplash("1618221195710-dd6b41faaea6", 800, 1000),
  catPublic: unsplash("1506905925346-21bda4d32df4", 800, 1000),

  // Studio / Team
  studio1: unsplash("1497366811353-6870744d04b2", 1200, 800),
  studio2: unsplash("1497366216548-37526070297c", 800, 1000),
  team1: unsplash("1560250097-0b93528c311a", 400, 500),
  team2: unsplash("1472099645785-5658abf4ff4e", 400, 500),
  team3: unsplash("1580489944761-15a19d654956", 400, 500),
  team4: unsplash("1507003211169-0a1dd7228f2d", 400, 500),
};
