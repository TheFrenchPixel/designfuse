export interface Brief {
  id: string;
  title: string;
  overview: string;
  productType: string;
  brand: string;
  targetAudience: string;
  designRequirements: string[];
  timeline: string;
  creativeSpark: string;
  createdAt: Date;
}

export interface Design {
  id: string;
  name: string;
  file: File;
  uploadedAt: Date;
}

interface StoredBrief {
  id: string;
  title: string;
  overview: string;
  productType: string;
  brand: string;
  targetAudience: string;
  designRequirements: string[];
  timeline: string;
  creativeSpark: string;
  createdAt: string;
}

interface StoredDesign {
  id: string;
  name: string;
  file: File;
  uploadedAt: string;
}

export const saveBrief = (brief: Brief): void => {
  const briefs = getBriefs();
  briefs.push(brief);
  localStorage.setItem('briefs', JSON.stringify(briefs));
};

export const getBriefs = (): Brief[] => {
  const stored = localStorage.getItem('briefs');
  if (!stored) return [];
  return JSON.parse(stored).map((brief: StoredBrief) => ({
    ...brief,
    createdAt: new Date(brief.createdAt)
  }));
};

export const saveDesign = (design: Omit<Design, 'id' | 'uploadedAt'>): void => {
  const designs = getDesigns();
  const newDesign: Design = {
    ...design,
    id: Date.now().toString(),
    uploadedAt: new Date()
  };
  designs.push(newDesign);
  localStorage.setItem('designs', JSON.stringify(designs));
};

export const getDesigns = (): Design[] => {
  const stored = localStorage.getItem('designs');
  if (!stored) return [];
  return JSON.parse(stored).map((design: StoredDesign) => ({
    ...design,
    uploadedAt: new Date(design.uploadedAt)
  }));
};

export const shareContent = async (title: string, text: string, url?: string): Promise<void> => {
  if (navigator.share) {
    try {
      await navigator.share({
        title,
        text,
        url: url || window.location.href
      });
    } catch (error) {
      // Fallback to clipboard
      await navigator.clipboard.writeText(`${title}\n\n${text}\n\n${url || window.location.href}`);
      alert('Content copied to clipboard!');
    }
  } else {
    // Fallback for unsupported browsers
    await navigator.clipboard.writeText(`${title}\n\n${text}\n\n${url || window.location.href}`);
    alert('Content copied to clipboard! Share it on your favorite platform.');
  }
};