export interface Sector {
  slug: string;
  name: string;
  description: string;
  icon: string;
}

export const sectors: Sector[] = [
  { slug: "banking", name: "Banking", description: "Private and public sector banks, NBFC lenders and payments infrastructure.", icon: "banking" },
  { slug: "information-technology", name: "Information Technology", description: "Software services, product engineering and digital transformation leaders.", icon: "it" },
  { slug: "consumer", name: "Consumer", description: "Consumer discretionary, staples, retail and branded products.", icon: "consumer" },
  { slug: "consumer-durables", name: "Consumer Durables", description: "Appliances, consumer electronics and electrical equipment brands.", icon: "durables" },
  { slug: "retail", name: "Retail", description: "Organized retail chains across apparel, footwear and value formats.", icon: "retail" },
  { slug: "healthcare", name: "Healthcare", description: "Hospitals, diagnostics and healthcare services providers.", icon: "healthcare" },
  { slug: "pharmaceuticals", name: "Pharmaceuticals", description: "Formulations, generics, CDMO and API manufacturers.", icon: "pharma" },
  { slug: "capital-goods", name: "Capital Goods", description: "Electrical equipment, defence electronics and industrial machinery.", icon: "capital" },
  { slug: "industrials", name: "Industrials", description: "Bearings, logistics and precision engineering companies.", icon: "industrials" },
  { slug: "chemicals", name: "Chemicals", description: "Speciality chemicals, agrochemicals and industrial intermediates.", icon: "chemicals" },
  { slug: "automobiles", name: "Automobiles", description: "Passenger vehicles, two-wheelers and commercial vehicles.", icon: "automobiles" },
  { slug: "financial-services", name: "Financial Services", description: "Asset management, broking, cards and diversified NBFCs.", icon: "financial" },
  { slug: "insurance", name: "Insurance", description: "Life, general and health insurance franchises.", icon: "insurance" },
  { slug: "real-estate", name: "Real Estate", description: "Residential developers with premium land banks and brands.", icon: "realestate" },
  { slug: "energy", name: "Energy", description: "Renewables, power generation and transmission companies.", icon: "energy" },
  { slug: "oil-gas", name: "Oil & Gas", description: "Integrated energy majors, upstream E&P and city gas distribution.", icon: "oilgas" },
  { slug: "utilities", name: "Utilities", description: "Power generation, transmission and regulated utilities.", icon: "utilities" },
  { slug: "telecom", name: "Telecom", description: "Wireless operators, tower infrastructure and connectivity providers.", icon: "telecom" },
  { slug: "media", name: "Media", description: "Broadcasting, entertainment and digital media platforms.", icon: "media" },
  { slug: "metals", name: "Metals", description: "Steel, aluminium and non-ferrous metal producers.", icon: "metals" },
  { slug: "mining", name: "Mining", description: "Coal, iron ore and metal concentrate producers.", icon: "mining" },
  { slug: "textiles", name: "Textiles", description: "Apparel, yarn, fabric and home textile manufacturers.", icon: "textiles" },
  { slug: "infrastructure", name: "Infrastructure", description: "EPC, ports, airports and road infrastructure developers.", icon: "infrastructure" },
];

export function getSector(slug: string): Sector | undefined {
  return sectors.find((s) => s.slug === slug);
}

export const sectorName = (slug: string): string =>
  getSector(slug)?.name ?? slug;
