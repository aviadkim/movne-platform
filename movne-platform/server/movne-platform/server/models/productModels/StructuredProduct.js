/**
 * Structured Product model - represents financial instruments like:
 * - Capital protected notes
 * - Barrier reverse convertibles
 * - Autocallables
 * - Structured deposits
 */
const structuredProductSchema = {
  name: { type: String, required: true },
  issuer: { type: String, required: true },
  type: { 
    type: String, 
    enum: ['CAPITAL_PROTECTED', 'YIELD_ENHANCEMENT', 'PARTICIPATION', 'LEVERAGE', 'OTHER'],
    required: true 
  },
  underlyingAssets: [{ 
    assetType: String, 
    ticker: String,
    name: String,
    weight: Number
  }],
  maturityDate: { type: Date, required: true },
  issueDate: { type: Date, required: true },
  currency: { type: String, required: true },
  notionalAmount: { type: Number, required: true },
  minimumInvestment: { type: Number, required: true },
  distributorFee: { type: Number },
  issuerFee: { type: Number },
  potentialYield: { type: Number },
  protectionLevel: { type: Number },
  knockInBarrier: { type: Number },
  earlyRedemptionFeatures: {
    hasAutocall: { type: Boolean, default: false },
    autocallObservationDates: [Date],
    autocallTriggerLevel: Number,
    autocallPayment: Number
  },
  riskLevel: { 
    type: String, 
    enum: ['LOW', 'MEDIUM_LOW', 'MEDIUM', 'MEDIUM_HIGH', 'HIGH'],
    required: true 
  },
  liquidityProfile: { 
    type: String, 
    enum: ['DAILY', 'WEEKLY', 'MONTHLY', 'QUARTERLY', 'ILLIQUID'],
    required: true 
  },
  documents: [{
    name: String,
    type: { type: String, enum: ['TERM_SHEET', 'KID', 'PROSPECTUS', 'PRICING_SUPPLEMENT', 'MARKETING'] },
    fileUrl: String,
    uploadDate: Date
  }],
  targetClients: [{
    type: String,
    enum: ['RETAIL', 'PROFESSIONAL', 'ELIGIBLE_COUNTERPARTY', 'QUALIFIED_INVESTOR']
  }],
  status: {
    type: String,
    enum: ['ACTIVE', 'MATURED', 'CALLED', 'WITHDRAWN'],
    default: 'ACTIVE'
  },
  highlights: [String],
  risks: [String],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
};

module.exports = structuredProductSchema;
