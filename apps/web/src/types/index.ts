// ── Project Types ──
export interface Photo {
    url: string
    caption: string
    category: 'exterior' | 'interior' | 'amenity' | 'construction' | 'location'
  }
  
  export interface Video {
    youtubeId: string
    title: string
    subtitle: string
    duration: string
    thumbnail: string
    isFeatured?: boolean
  }
  
  export interface FloorPlan {
    type: string          // "1 BHK", "2 BHK" etc
    price: string
    carpetArea: string
    builtUpArea: string
    bathrooms: string
    balconies: string
    parking: string
    unitsAvailable: string
    totalUnits: string
    isFeatured?: boolean
    planImageUrl?: string
    waMsg?: string
  }
  
  export interface ProgressItem {
    label: string
    percentage: number
  }
  
  export interface NearbyItem {
    name: string
    distance: string
  }
  
  export interface NearbyCategory {
    icon: string
    title: string
    items: NearbyItem[]
  }
  
  export interface Project {
    _id?: string
    slug: string
    name: string
    tagline: string
    location: string
    fullAddress: string
    description: string
    status: 'ongoing' | 'completed' | 'upcoming'
    type: 'residential' | 'commercial'
    tag: string
    heroImage: string
    cardImage: string
    unitTypes: string
    startingPrice: string
    priceRange?: string
    possession: string
    rera?: string
    reraValid?: string
    landArea?: string
    totalUnits?: string
    totalArea?: string
    towers?: string
    openSpace?: string
    clubhouse?: string
    parking?: string
    specs?: { key: string; value: string }[]
    floorPlans?: FloorPlan[]
    amenities?: { icon: string; name: string }[]
    photos?: Photo[]
    videos?: Video[]
    progress?: ProgressItem[]
    timeline?: { label: string; date: string; done: boolean }[]
    nearbyCategories?: NearbyCategory[]
    faqs?: { question: string; answer: string }[]
    mapEmbedUrl?: string
    isFeatured?: boolean
    order?: number
    createdAt?: string
    updatedAt?: string
  }
  
  // ── Enquiry Types ──
  export interface Enquiry {
    _id?: string
    firstName: string
    lastName?: string
    phone: string
    email?: string
    project?: string
    budget?: string
    message?: string
    source?: string
    status: 'new' | 'contacted' | 'site_visit' | 'closed'
    createdAt?: string
  }
  
  // ── Testimonial ──
  export interface Testimonial {
    _id?: string
    initials: string
    name: string
    projectName: string
    text: string
    rating: number
    order?: number
    isActive?: boolean
  }
  
  // ── Settings ──
  export interface SiteSettings {
    heroSlides?: { image: string; alt: string }[]
    marqueeItems?: string[]
    aboutImage?: string
    stats?: { prefix?: string; target: number; suffix: string; label: string }[]
    journeySteps?: { icon: string; head: string; body: string; badges: string[]; isLast?: boolean }[]
    phone?: string
    email?: string
    address?: string
    officeHours?: string
    socialLinks?: { platform: string; url: string }[]
    footerTagline?: string
    seo?: {
      title?: string
      description?: string
      ogImage?: string
    }
  }
  
  // ── Admin User ──
  export interface AdminUser {
    _id?: string
    email: string
    name: string
    role: 'superadmin' | 'editor'
  }
  
  // ── API Response ──
  export interface ApiResponse<T = unknown> {
    success: boolean
    data?: T
    error?: string
    message?: string
  }