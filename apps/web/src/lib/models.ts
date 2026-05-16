import { Schema, model, models } from 'mongoose'

// ── Project Model ──
const ProjectSchema = new Schema(
  {
    slug: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true },
    tagline: String,
    location: { type: String, required: true },
    fullAddress: String,
    description: String,
    status: { type: String, enum: ['ongoing', 'completed', 'upcoming'], default: 'ongoing' },
    type: { type: String, enum: ['residential', 'commercial'], default: 'residential' },
    tag: String,
    heroImage: String,
    cardImage: String,
    unitTypes: String,
    startingPrice: String,
    priceRange: String,
    possession: String,
    rera: String,
    reraValid: String,
    landArea: String,
    totalUnits: String,
    totalArea: String,
    towers: String,
    openSpace: String,
    clubhouse: String,
    parking: String,
    specs: [{ key: String, value: String }],
    floorPlans: [{
      type: { type: String },
      variant: String,
      price: String,
      carpetArea: String,
      builtUpArea: String,
      bathrooms: String,
      balconies: String,
      parking: String,
      unitsAvailable: String,
      totalUnits: String,
      isFeatured: Boolean,
      planImageUrl: String,
      waMsg: String,
    }],
    amenities: [{ icon: String, name: String }],
    photos: [{
      url: String,
      caption: String,
      category: { type: String, enum: ['exterior','interior','amenity','construction','location'] },
    }],
    videos: [{
      youtubeId: String,
      title: String,
      subtitle: String,
      duration: String,
      thumbnail: String,
      isFeatured: Boolean,
    }],
    progress: [{ label: String, percentage: Number }],
    timeline: [{ label: String, date: String, done: Boolean }],
    nearbyCategories: [{
      icon: String,
      title: String,
      items: [{ name: String, distance: String }],
    }],
    faqs: [{ question: String, answer: String }],
    brochureUrl: String,
    mapEmbedUrl: String,
    isFeatured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
)

// ── Enquiry Model ──
const EnquirySchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: String,
    phone: { type: String, required: true },
    email: String,
    project: String,
    budget: String,
    message: String,
    source: { type: String, default: 'website' },
    status: { type: String, enum: ['new','contacted','site_visit','closed'], default: 'new' },
  },
  { timestamps: true }
)

// ── Testimonial Model ──
const TestimonialSchema = new Schema(
  {
    initials: String,
    name: { type: String, required: true },
    projectName: String,
    text: { type: String, required: true },
    rating: { type: Number, default: 5 },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
)

// ── Settings Model ──
const SettingsSchema = new Schema(
  {
    key: { type: String, unique: true, required: true },
    value: Schema.Types.Mixed,
  },
  { timestamps: true }
)

// ── Admin User Model ──
const AdminUserSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    name: { type: String, required: true },
    role: { type: String, enum: ['superadmin', 'editor'], default: 'editor' },
  },
  { timestamps: true }
)

export const ProjectModel = models.Project || model('Project', ProjectSchema)
export const EnquiryModel = models.Enquiry || model('Enquiry', EnquirySchema)
export const TestimonialModel = models.Testimonial || model('Testimonial', TestimonialSchema)
export const SettingsModel = models.Settings || model('Settings', SettingsSchema)
export const AdminUserModel = models.AdminUser || model('AdminUser', AdminUserSchema)