// src/features/fleet/data/vessels.ts
export interface VesselData {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  length: string;
  guests: string;
  badge: string;
  imageSrc: string;
  heroImage: string;
  specs: { length: string; tonnage: string; guests: string; decks: string };
}

export const VESSELS: VesselData[] = [
  {
    id: "serenity",
    title: "The Serenity",
    subtitle: "Premium Experience",
    description: "Our premier flagship offering the highest level of space and luxury at sea, featuring revolutionary ocean-view suites and personalized butler service.",
    length: "362m",
    guests: "5,400",
    badge: "Flagship",
    imageSrc: "https://lh3.googleusercontent.com/aida-public/AB6AXuDtNJgtd1USMUa5nZZumatCZ05sKe2au3FQlBVMsKD8LOQJyKFPUX0fSRWAeM_KA3pYqStmKmLvcfSyjFSGF-qSOKUKsP0HeN-tVz8t94nZareXttPswLsDJt6QjZmuXPQigHwHOtxnovgIguemQNVdHWHp2RcRa34hYyoF0TBBmrWAXOU9qcRbS275yu6rzIrjHujh73E4dt8vEkVOVc_jv1YJaNWRLk1SGFWzvATmDqDJRWlTR_bUtJ5IYBkYIDj5w7IFg_4SLlpk",
    heroImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuDtNJgtd1USMUa5nZZumatCZ05sKe2au3FQlBVMsKD8LOQJyKFPUX0fSRWAeM_KA3pYqStmKmLvcfSyjFSGF-qSOKUKsP0HeN-tVz8t94nZareXttPswLsDJt6QjZmuXPQigHwHOtxnovgIguemQNVdHWHp2RcRa34hYyoF0TBBmrWAXOU9qcRbS275yu6rzIrjHujh73E4dt8vEkVOVc_jv1YJaNWRLk1SGFWzvATmDqDJRWlTR_bUtJ5IYBkYIDj5w7IFg_4SLlpk",
    specs: { length: "82.5m", tonnage: "2,250t", guests: "12", decks: "5" }
  }
];