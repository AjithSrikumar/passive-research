export type Rating =
  | "Strong Buy"
  | "Buy"
  | "Accumulate"
  | "Hold"
  | "Reduce"
  | "Sell";

export interface Company {
  slug: string;
  name: string;
  legalName: string;
  ticker: string;
  sector: string;
  industry: string;
  logoColor: string;
  recommendation: Rating;
  currentPrice: number;
  targetPrice: number;
  upsidePct: number;
  marketCapCr: number;
  revenueCr: number;
  netProfitCr: number;
  revenueGrowthPct: number;
  ebitdaMarginPct: number;
  roePct: number;
  rocePct: number;
  fcfCr: number;
  pe: number | null;
  dividendYieldPct: number;
  debtEquity: number;
  shortThesis: string;
  updatedDate: string;
  author: string;
}

type Row = [
  name: string,
  ticker: string,
  sector: string,
  industry: string,
  color: string,
  rating: Rating,
  price: number,
  target: number,
  mcapCr: number,
  revenueCr: number,
  profitCr: number,
  growth: number,
  margin: number,
  roe: number,
  roce: number,
  fcfCr: number,
  pe: number | null,
  divYield: number,
  de: number,
  thesis: string,
];

const AUTHORS = [
  "Aarav Mehta",
  "Priya Sharma",
  "Rohan Iyer",
  "Ananya Krishnan",
  "Vikram Rao",
  "Sneha Patel",
  "Aditya Menon",
  "Ishita Gupta",
];

const ROWS: Row[] = [
  // ---------- Banking ----------
  ["HDFC Bank", "HDFCBANK", "banking", "Private Sector Banks", "#1a5bbf", "Buy", 837, 1040, 1280000, 370055, 74671, 6.9, 52, 14.1, 1.9, 48000, 17, 0.6, 2.3, "India's largest private bank; post-merger NIM trough holding, cleanest asset quality, ~11% PAT CAGR."],
["ICICI Bank", "ICICIBANK", "banking", "Private Sector Banks", "#f58220", "Buy", 1420, 1680, 998000, 230000, 50747, 14, 54, 17.2, 7.1, 52000, 19.7, 0.7, 2.1, "Best-in-class NIM, fee growth and asset quality; FT26 standalone PAT ₹50,747 Cr."],
  ["State Bank of India", "SBIN", "banking", "Public Sector Banks", "#2b5fa5", "Buy", 1098, 1230, 998000, 440000, 80032, 12.9, 48, 17.8, 6.8, 90000, 12.5, 1.1, 3.2, "India's largest bank; ~9x FY27E earnings, ~1.5x book, GNPA 1.2% at cyclicals low."],
  ["Kotak Mahindra Bank", "KOTAKBANK", "banking", "Private Sector Banks", "#9d0b0b", "Accumulate", 385, 460, 390000, 108000, 17500, 17, 55, 14.2, 6.9, 25000, 22, 0.4, 1.8, "Sector-best 4.5% NIM with clean book; growth resumption is the re-rating trigger."],
  ["Axis Bank", "AXISBANK", "banking", "Private Sector Banks", "#8b1e41", "Accumulate", 1102, 1350, 340000, 139000, 27400, 15, 50, 14.6, 6.5, 32000, 12.4, 0.7, 2.4, "Citi merger synergies + retail momentum; P/B ~1.4x supports re-rating."],
  ["IndusInd Bank", "INDUSINDBK", "banking", "Private Sector Banks", "#003b7a", "Hold", 980, 1010, 76300, 67000, 8900, 10, 48, 11.9, 6.2, 14000, 8.6, 1.2, 2.8, "Asset quality watch continues; vehicle finance recovery is key catalyst."],

  // ---------- Information Technology ----------
  ["Tata Consultancy Services", "TCS", "information-technology", "IT Services", "#1a4f9c", "Buy", 2455, 2650, 887000, 267021, 49855, 4.6, 28, 53, 62, 41000, 17.2, 4.5, 0.05, "AI-first IT bellwether; FY26 revenue ₹2.67 lakh Cr, OM 24%, record dividend ₹111."],
  ["Infosys", "INFY", "information-technology", "IT Services", "#0071c5", "Buy", 1175, 1320, 486000, 171000, 31200, 4.6, 21.1, 33, 41, 28000, 15.2, 4.3, 0.04, "Large-cap IT with AI/cloud pipeline; 21% margin floor and 4.3% dividend."],
  ["HCL Technologies", "HCLTECH", "information-technology", "IT Services", "#2b5fa5", "Accumulate", 1356.6, 1500, 368500, 130634, 18361, 11.2, 21.4, 28, 34, 16000, 20, 4.4, 0.1, "Software and engineering R&D IT major; FY26 revenue ₹1.31 lakh Cr, margin 21.4%."],
  ["Wipro", "WIPRO", "information-technology", "IT Services", "#4a9b2f", "Hold", 305, 315, 159000, 89000, 11600, 5, 18, 15, 18, 9800, 13.7, 0.2, 0.2, "Turnaround play; order bookings improvement yet to translate into revenue growth."],
  ["LTIMindtree", "LTIMIND", "information-technology", "IT Services", "#7a3e9d", "Buy", 5700, 6300, 169000, 37500, 5900, 9, 20, 24, 28, 4900, 28.6, 2.0, 0.1, "Engineering-led digital transformation pure play with consistent delivery quality."],
  ["Tech Mahindra", "TECHM", "information-technology", "IT Services", "#7b1fa2", "Reduce", 1780, 1600, 174000, 54500, 3800, 6, 15, 12, 15, 3100, 45.8, 1.8, 0.1, "Margin repair underway but growth lags peers; execution risk remains elevated."],

  // ---------- Consumer ----------
  ["Titan", "TITAN", "consumer", "Luxury Jewellery", "#b8860b", "Accumulate", 4905, 5100, 435000, 76078, 5073, 33, 10.6, 24, 28, 2100, 86, 0.3, 0.1, "Luxury jewellery market leader; FY26 income ex-bullion +33%, PAT +52%, EBIT margin 10.6%."],
  ["Trent", "TRENT", "consumer", "Retail & Fashion", "#e0115f", "Strong Buy", 4376, 5200, 155600, 20074, 1721, 17, 13.5, 24, 36.5, 700, 90, 0.1, 0.2, "Zudio's value-fashion engine compounding store count and same-store growth; 36.5% operating ROCE."],
  ["Avenue Supermarts", "DMART", "consumer", "Retail", "#e21837", "Accumulate", 3852, 4500, 251000, 66968, 3224, 15.9, 7.8, 16, 14, 2600, 78, 0, 0.1, "Everyday-low-price grocery retailing; FY26 EBITDA 7.8%, 503 stores, no dividend ever."],
  ["Jubilant FoodWorks", "JUBLFOOD", "consumer", "Quick Service Restaurants", "#e31837", "Hold", 720, 780, 47500, 7900, 700, 10, 15, 14, 17, 550, 68, 0.1, 0.9, "Dominican Pizza master franchisee; near-term demand softness, long-term rollout intact."],
  ["Varun Beverages", "VBL", "consumer", "Beverages", "#0d47a1", "Buy", 620, 730, 161000, 21300, 2900, 21, 24, 28, 24, 1600, 55, 0.2, 0.6, "PepsiCo franchise bottler riding India's beverage penetration tailwind."],
  ["Nestle India", "NESTLEIND", "consumer", "FMCG", "#b02418", "Accumulate", 1535, 1592, 289000, 23113, 3499, 14.7, 22, 30, 45, 2200, 75.9, 0.9, 0.1, "Premium FMCG powerhouse with irreplaceable brands; Q1 FY27 profit +48%."],
  ["Britannia Industries", "BRITANNIA", "consumer", "FMCG", "#1a2f6e", "Hold", 5650, 6000, 136000, 17900, 2350, 6, 17, 30, 40, 1700, 58, 1.6, 0.1, "Biscuit market leader defending share; competitive intensity caps margin gains."],
  ["Hindustan Unilever", "HINDUNILVR", "consumer", "FMCG", "#3b3b3b", "Accumulate", 2078, 2260, 488000, 61331, 10876, 5, 23, 20, 26, 8400, 46, 1.7, 0.02, "Staples bellwether; Q1 FY27 volumes +6% with margin +80 bps — modest de-rating valid."],
  ["Marico", "MARICO", "consumer", "FMCG", "#00529b", "Buy", 690, 780, 89000, 10800, 1550, 9, 19, 31, 42, 1250, 57, 1.9, 0.05, "Coconut oil and foods portfolio compounding with strong digital-first play."],
  ["ITC", "ITC", "consumer", "Diversified FMCG", "#6b1d1d", "Accumulate", 289, 320, 362000, 81640, 20286, 10, 29, 30, 34, 17000, 17.8, 3.0, 0.05, "Cigarette cash machine + FMCG/hotels; ~18x TTM with strong payout floor."],

  // ---------- Consumer Durables ----------
  ["Dixon Technologies", "DIXON", "consumer-durables", "Consumer Electronics", "#1e88e5", "Strong Buy", 14800, 17500, 88500, 24500, 1000, 35, 6, 19, 21, 300, 88, 0.1, 0.5, "India's electronics EMS champion riding the China+1 manufacturing wave."],
  ["Voltas", "VOLTAS", "consumer-durables", "Air Conditioning", "#b91c1c", "Accumulate", 1620, 1800, 53600, 11300, 850, 18, 9, 11, 12, 450, 63, 0.5, 0.1, "AC market leader; volume growth strong though margin mix under pressure."],
  ["Havells India", "HAVELLS", "consumer-durables", "Electricals", "#e4002b", "Buy", 1810, 2000, 113000, 24100, 1550, 13, 11, 19, 22, 1300, 73, 1.0, 0.05, "Premium electrical goods portfolio with durable brand and distribution moat."],
  ["Crompton Greaves", "CROMPTON", "consumer-durables", "Electricals", "#004c97", "Buy", 450, 505, 28800, 7900, 560, 11, 12, 15, 17, 420, 51, 1.2, 0.1, "Fans and pumps franchise; water-heating growth to lift mix."],
  ["Polycab India", "POLYCAB", "consumer-durables", "Cables & Wires", "#0a7d3c", "Buy", 7150, 8000, 107000, 21800, 2050, 17, 14, 23, 25, 1600, 52, 0.7, 0.1, "Cables leader capturing electrification and infrastructure spend tailwinds."],
  ["Blue Star", "BLUESTARCO", "consumer-durables", "Air Conditioning", "#0033a0", "Buy", 1910, 2200, 39300, 10900, 680, 22, 10, 17, 19, 500, 58, 0.8, 0.2, "AC and commercial refrigeration leader scaling capacity ahead of demand."],

  // ---------- Retail ----------
  ["Shoppers Stop", "SHOPERSTOP", "retail", "Department Stores", "#0b1f3a", "Hold", 750, 800, 8250, 5600, 160, 8, 10, 8, 10, 150, 52, 0.2, 0.9, "Omnichannel department store operator; beauty and premium expansion underway."],
  ["V-Mart Retail", "VMART", "retail", "Value Retail", "#d32f2f", "Accumulate", 2950, 3350, 5850, 3400, 90, 14, 8, 5, 6, 120, 65, 0.1, 1.2, "Tier-2/3 value retail play; store expansion pace defines earnings trajectory."],
  ["Metro Brands", "METROBRAND", "retail", "Footwear", "#1a1a2e", "Buy", 1250, 1400, 17000, 3100, 460, 14, 20, 16, 18, 280, 37, 0.8, 0.2, "Premium footwear retail leader with multi-brand portfolio and strong AOV growth."],
  ["Bata India", "BATAINDIA", "retail", "Footwear", "#c8102e", "Reduce", 1420, 1300, 18250, 3600, 260, 4, 14, 12, 13, 220, 70, 1.0, 0.1, "Legacy footwear brand ceding share; store rationalisation yet to pay off."],

  // ---------- Healthcare ----------
  ["Apollo Hospitals", "APOLLOHOSP", "healthcare", "Hospitals", "#004b93", "Buy", 7100, 8000, 102000, 21000, 1400, 15, 13, 11, 12, 900, 73, 0.2, 0.8, "India's largest hospital network with unmatched clinical brand and scale."],
  ["Max Healthcare", "MAXHEALTH", "healthcare", "Hospitals", "#00a19a", "Buy", 1080, 1250, 105000, 7200, 1150, 20, 25, 14, 16, 700, 91, 0.2, 0.3, "North India hospital leader with premium payor mix and margin outperformance."],
  ["Fortis Healthcare", "FORTIS", "healthcare", "Hospitals", "#003d7c", "Accumulate", 720, 800, 54400, 7900, 1050, 13, 22, 16, 18, 550, 52, 0.2, 0.2, "Hospital turnaround story; debt-free balance sheet and rising occupancy."],
  ["Narayana Hrudayalaya", "NH", "healthcare", "Hospitals", "#e4002b", "Buy", 1850, 2100, 37800, 5600, 680, 14, 19, 15, 15, 400, 56, 0.1, 0.3, "Value healthcare pioneer delivering affordable tertiary care at scale."],

  // ---------- Pharmaceuticals ----------
  ["Sun Pharmaceutical", "SUNPHARMA", "pharmaceuticals", "Pharmaceuticals", "#f8b800", "Buy", 1946, 2167, 468000, 58600, 11479, 11.9, 32, 17, 16, 7500, 40.8, 0.8, 0.1, "India's largest pharma; specialty portfolio drives margin expansion to ~32%."],
  ["Dr. Reddy's Laboratories", "DRREDDY", "pharmaceuticals", "Pharmaceuticals", "#c41230", "Accumulate", 1290, 1400, 215000, 29300, 5700, 8, 26, 21, 22, 4800, 38, 1.1, 0.1, "Quality-conscious pharma major; US generics pricing remains the swing factor."],
  ["Cipla", "CIPLA", "pharmaceuticals", "Pharmaceuticals", "#0057a7", "Buy", 1520, 1750, 123000, 27100, 3800, 11, 23, 17, 19, 3600, 32, 1.0, 0.1, "Respiratory and inhaled-therapy leader with strong India franchise."],
  ["Divi's Laboratories", "DIVISLAB", "pharmaceuticals", "Pharmaceuticals", "#1f4e79", "Accumulate", 6100, 6700, 162000, 8500, 2200, 9, 35, 20, 22, 1900, 74, 1.5, 0.02, "High-quality API/CDMO pure play with oligopolistic niche positions."],
  ["Lupin", "LUPIN", "pharmaceuticals", "Pharmaceuticals", "#00843d", "Buy", 2140, 2450, 97600, 21300, 2400, 12, 19, 18, 18, 1800, 41, 0.6, 0.3, "Complex generics pipeline and India growth underpin earnings recovery."],
  ["Torrent Pharmaceuticals", "TORNTPHARM", "pharmaceuticals", "Pharmaceuticals", "#7a2e2e", "Accumulate", 3450, 3750, 117000, 12500, 2100, 10, 28, 18, 17, 1600, 56, 1.4, 0.1, "Domestic-focused chronic therapy leader with resilient cash flows."],

  // ---------- Capital Goods ----------
  ["Siemens India", "SIEMENS", "capital-goods", "Electrical Equipment", "#009999", "Accumulate", 3938, 4300, 141000, 16787, 1587, 11, 10, 22, 24, 4000, 56, 0.4, 0.05, "Electrification super-cycle; order backlog ₹45k Cr; 18-month FY26 base."],
  ["ABB India", "ABB", "capital-goods", "Electrical Equipment", "#e4002b", "Buy", 7900, 9000, 167000, 12900, 1700, 20, 18, 25, 28, 1400, 98, 0.8, 0.05, "High-margin electrification franchise with strong data-centre and grid orders."],
  ["Bharat Electronics", "BEL", "capital-goods", "Defence Electronics", "#0070b8", "Buy", 390, 465, 285000, 27480, 6048, 16.2, 25.8, 24, 27, 3400, 47.1, 0.7, 0.6, "Defence electronics; order book ₹72,258 Cr, Q1 revenue +25%."],
  ["Thermax", "THERMAX", "capital-goods", "Energy & Environment", "#e31837", "Accumulate", 4800, 5350, 57200, 9700, 730, 14, 10, 14, 16, 550, 78, 1.2, 0.1, "Energy transition beneficiary; order inflows strong, margins recovering."],
  ["Cummins India", "CUMMINSIND", "capital-goods", "Engines", "#1f3460", "Buy", 3900, 4400, 108000, 9900, 1550, 12, 19, 22, 25, 1300, 70, 1.8, 0.05, "Power-generation engine leader; data-centre demand creates structural tailwind."],

  // ---------- Industrials ----------
  ["Timken India", "TIMKEN", "industrials", "Bearings", "#00529b", "Accumulate", 3900, 4300, 29300, 3500, 430, 11, 20, 18, 20, 280, 68, 0.6, 0.05, "Bearings franchise leveraged to rail, wind and industrial capex cycles."],
  ["SKF India", "SKFINDIA", "industrials", "Bearings", "#008cd7", "Hold", 6100, 6400, 30200, 4600, 480, 8, 17, 15, 17, 300, 63, 0.9, 0.05, "Premium bearings supplier; industrial recovery needed for re-rating."],
  ["Schaeffler India", "SCHAEFFLER", "industrials", "Bearings", "#00539f", "Accumulate", 5100, 5600, 79700, 9000, 1050, 10, 18, 20, 22, 800, 76, 1.0, 0.02, "Auto-component and industrial bearings leader with consistent ROE."],
  ["Honeywell Automation", "HONAUT", "industrials", "Automation", "#da291c", "Hold", 54000, 57000, 47700, 3200, 520, 8, 21, 17, 18, 350, 92, 0.5, 0.02, "Building and process automation leader; high-quality but fully valued."],
  ["Blue Dart Express", "BLUEDART", "industrials", "Logistics", "#00a8e1", "Accumulate", 5800, 6300, 13750, 5600, 380, 9, 11, 12, 13, 380, 36, 1.0, 0.02, "Domestic air express leader; e-commerce volumes drive utilisation gains."],

  // ---------- Chemicals ----------
  ["UPL", "UPL", "chemicals", "Agrochemicals", "#007a33", "Reduce", 600, 560, 45000, 21500, 1800, 3, 13, 7, 8, 1100, 25, 0.4, 2.1, "Global agrochemical major; de-leveraging and pricing pressure cap returns."],
  ["PI Industries", "PIIND", "chemicals", "Agrochemicals", "#0055a5", "Strong Buy", 4300, 5100, 65200, 9100, 1900, 14, 27, 21, 23, 1200, 34, 0.8, 0.05, "India's pre-eminent agrochemical CDMO with sticky global innovator relationships."],
  ["SRF", "SRF", "chemicals", "Chemicals", "#0a3d62", "Accumulate", 2600, 2900, 77100, 14300, 1700, 9, 21, 13, 15, 1100, 45, 0.7, 0.7, "Diversified chemicals and packaging leader; new capacities to drive growth."],
  ["Deepak Nitrite", "DEEPAKNTR", "chemicals", "Chemicals", "#e31e24", "Buy", 3000, 3450, 40900, 9800, 1100, 12, 18, 16, 17, 800, 37, 0.4, 0.1, "Phenol-chain chemical leader with integrated, cost-advantaged manufacturing."],
  ["Aarti Industries", "AARTIIND", "chemicals", "Speciality Chemicals", "#0057a7", "Buy", 530, 610, 19200, 8100, 760, 13, 17, 15, 17, 500, 25, 0.4, 0.8, "Speciality chemical manufacturer with long-term supply agreements with MNCs."],
  ["Vinati Organics", "VINATIORGA", "chemicals", "Speciality Chemicals", "#0f4d92", "Accumulate", 1950, 2200, 20100, 1900, 480, 10, 34, 22, 24, 350, 42, 0.7, 0.05, "Global leader in niche specialty molecules with pricing power and high margins."],

  // ---------- Automobiles ----------
  ["Maruti Suzuki", "MARUTI", "automobiles", "Passenger Vehicles", "#2c3e50", "Accumulate", 13984, 16000, 440000, 174369, 14500, 20.2, 8.2, 17, 18, 9000, 29, 1.1, 0.02, "PV volume leader; Q1 FY27 margin compressed to 8.2%, recovery expected H2 FY27."],
  ["Tata Motors", "TATAMOTORS", "automobiles", "Passenger & CV", "#4863a8", "Buy", 345.9, 420, 127000, 339000, 12715, 8, 11, 33, 24, 19000, 9.1, 0.9, 1.2, "Post-demerger TMPV: JLR+PV compounding; TMPV trades ~₹345.9."],
  ["Mahindra & Mahindra", "M&M", "automobiles", "SUV & Tractors", "#f58220", "Buy", 3468.3, 4100, 432000, 172000, 18200, 20, 13, 20, 18, 8500, 23.7, 0.5, 0.4, "SUV share gains + farm margins; Q1 FY27 PAT +34% YoY."],
  ["Bajaj Auto", "BAJAJ-AUTO", "automobiles", "Two-Wheelers", "#d70000", "Accumulate", 11856, 12500, 331000, 56000, 10990, 37, 20, 30, 32, 6800, 30, 1.9, 0.02, "Export champion with ~20% margins; Q1 FY27 revenue +37% YoY."],
  ["Eicher Motors", "EICHERMOT", "automobiles", "Two-Wheelers", "#0074b7", "Buy", 5100, 5700, 140000, 18500, 3000, 11, 22, 21, 23, 2300, 47, 1.1, 0.02, "Royal Enfield franchise delivers consistent returns with global expansion runway."],
  ["Hero MotoCorp", "HEROMOTOCO", "automobiles", "Two-Wheelers", "#0071b9", "Hold", 5200, 5450, 104000, 38500, 4150, 7, 14, 22, 24, 3200, 25, 2.8, 0.02, "Volume leader facing premiumisation headwinds; EV strategy a key monitorable."],
  ["TVS Motor", "TVSMOTOR", "automobiles", "Two-Wheelers", "#0b6db3", "Buy", 2500, 2850, 119000, 33500, 2600, 12, 12, 28, 25, 2200, 46, 1.0, 0.5, "Multi-product two-wheeler platform expanding in India and emerging markets."],
  ["Ashok Leyland", "ASHOKLEY", "automobiles", "Commercial Vehicles", "#003da5", "Accumulate", 300, 330, 88000, 43000, 3800, 9, 12, 25, 20, 2800, 23, 1.5, 0.7, "CV cycle recovery and LCV foray support earnings; demand cyclicality persists."],

  // ---------- Financial Services ----------
  ["Bajaj Finance", "BAJFINANCE", "financial-services", "NBFC", "#7a1f5f", "Buy", 1060, 1175, 658000, 88000, 19332, 24, 62, 19.5, 9.5, 30000, 34, 0.3, 5.2, "Best-managed consumer financier; AUM +24% to ₹5.47 lakh Cr, Q1 PAT +28%."],
  ["Bajaj Finserv", "BAJAJFINSV", "financial-services", "Diversified Financials", "#7a1f5f", "Buy", 2004, 2362, 333000, 150000, 9801, 18, 19, 13, 8.5, 9000, 34, 0.4, 4.5, "Financial conglomerate — BFinance + insurance; Q1 income +18%."],
  ["HDFC Asset Management", "HDFCAMC", "financial-services", "Asset Management", "#004c8f", "Buy", 4600, 5200, 98300, 3400, 1600, 24, 62, 31, 51, 1450, 61, 1.3, 0.02, "Leading fund house leveraging equity-market penetration and SIP flows."],
  ["SBI Cards", "SBICARD", "financial-services", "Payments", "#2b5fa5", "Accumulate", 720, 800, 68300, 18700, 2800, 12, 38, 17, 8, 9000, 24, 0.7, 4.0, "Credit card franchise with high-spend affluent base; asset quality normalising."],
  ["Cholamandalam Investment", "CHOLAFIN", "financial-services", "NBFC", "#003da5", "Buy", 1650, 1900, 155000, 35500, 5100, 22, 56, 19, 9, 15000, 30, 0.5, 4.8, "Vehicle and SME financier with best-in-class growth and risk management."],
  ["Shriram Finance", "SHRIRAMFIN", "financial-services", "NBFC", "#e31e24", "Buy", 690, 800, 130000, 26500, 6300, 17, 58, 18, 9, 12000, 21, 0.8, 4.2, "Large-vehicle financier merging scale with improving cost of funds."],
  ["Angel One", "ANGELONE", "financial-services", "Broking", "#1a1a2e", "Buy", 2600, 3100, 21800, 5200, 1100, 18, 30, 31, 28, 900, 20, 0.8, 1.5, "Digital broking leader compounding client acquisition in retail markets."],

  // ---------- Insurance ----------
  ["HDFC Life", "HDFCLIFE", "insurance", "Life Insurance", "#004c8f", "Accumulate", 700, 770, 150000, 93000, 1950, 15, 8, 14.5, 7, 4000, 77, 0.1, 0.4, "Leading private life insurer; protection mix improvement drives value growth."],
  ["ICICI Lombard", "ICICIGI", "insurance", "General Insurance", "#f58220", "Buy", 2050, 2350, 101000, 27800, 2050, 16, 11, 20, 9, 5200, 49, 0.6, 0.3, "Tech-enabled general insurer with superior underwriting discipline."],
  ["SBI Life", "SBILIFE", "insurance", "Life Insurance", "#2b5fa5", "Accumulate", 1550, 1720, 155000, 115000, 2400, 18, 7, 16, 6.5, 3200, 65, 0.2, 0.3, "Bank-assurance distribution strength drives consistent protection growth."],
  ["Star Health", "STARHEALTH", "insurance", "Health Insurance", "#f68b1e", "Buy", 430, 500, 25000, 15000, 500, 14, 8, 11, 6, 700, 50, 0, 0.4, "Specialist health insurer with large retail health franchise."],
  ["PB Fintech", "POLICYBZR", "insurance", "Insurtech", "#00a19a", "Buy", 1700, 2200, 77300, 3200, 250, 35, 9, 3, 3, 400, 310, 0, 0.2, "Policybazaar/Paisabazaar platform monetising insurance and credit distribution."],

  // ---------- Real Estate ----------
  ["DLF", "DLF", "real-estate", "Real Estate", "#8d1b3d", "Buy", 820, 950, 203000, 7600, 3300, 14, 35, 10, 8, -900, 62, 0.7, 0.5, "India's most valuable real estate franchise with premium land bank."],
  ["Godrej Properties", "GODREJPROP", "real-estate", "Real Estate", "#c8102e", "Buy", 2650, 3050, 73700, 7400, 1600, 25, 14, 12, 9, -1200, 46, 0.3, 1.0, "National residential developer scaling sales with strong brand trust."],
  ["Oberoi Realty", "OBEROIRLTY", "real-estate", "Real Estate", "#1a1a1a", "Buy", 1950, 2300, 70900, 5300, 1950, 18, 42, 15, 12, 600, 36, 1.1, 0.3, "Premium Mumbai developer with the industry's best balance sheet."],
  ["Prestige Estates", "PRESTIGE", "real-estate", "Real Estate", "#002d72", "Accumulate", 1750, 1980, 70100, 10300, 1400, 22, 20, 14, 10, -1500, 50, 0.4, 1.4, "Bengaluru-led developer expanding into commercial and retail assets."],
  ["Macrotech Developers", "LODHA", "real-estate", "Real Estate", "#e30613", "Strong Buy", 1350, 1650, 134000, 12100, 2300, 20, 27, 15, 10, -800, 58, 0.5, 1.2, "Mumbai real estate leader with industry-leading pre-sales momentum."],
  ["Brigade Enterprises", "BRIGADE", "real-estate", "Real Estate", "#003865", "Accumulate", 1300, 1450, 30100, 5200, 700, 18, 20, 13, 9, -500, 43, 0.3, 1.3, "South India developer with diversified residential-hospitality portfolio."],

  // ---------- Energy ----------
  ["Tata Power", "TATAPOWER", "energy", "Power Generation", "#0055a5", "Accumulate", 390, 440, 125000, 64000, 2900, 15, 22, 14, 10, 4800, 43, 0.9, 1.9, "Integrated power utility pivoting to renewables and transmission."],
  ["Adani Green Energy", "ADANIGREEN", "energy", "Renewables", "#0f5c2e", "Buy", 1000, 1250, 158000, 9700, 1300, 30, 78, 18, 10, -3500, 121, 0.2, 4.5, "World's largest solar-plus-wind developer with massive capacity pipeline."],
  ["JSW Energy", "JSWENERGY", "energy", "Power Generation", "#003366", "Accumulate", 650, 730, 114000, 13500, 1900, 19, 44, 11, 8, -1200, 60, 0.3, 1.8, "Transitioning thermal portfolio toward renewables; capacity CAGR visible."],
  ["NHPC", "NHPC", "energy", "Hydro Power", "#003da5", "Accumulate", 97, 108, 97500, 9600, 3600, 7, 66, 10, 6.5, 3000, 27, 2.5, 1.4, "India's largest hydropower generator; capacity expansion supported by policy."],
  ["Adani Energy Solutions", "ADANIENSOL", "energy", "Transmission", "#003366", "Buy", 800, 950, 140000, 18500, 2300, 22, 35, 11, 8, -2000, 61, 0.1, 3.2, "Transmission and smart-metering platform enabling the green grid transition."],
  ["Suzlon Energy", "SUZLON", "energy", "Renewables", "#00a19a", "Accumulate", 88, 100, 120000, 14000, 1400, 35, 18, 21, 17, 900, 86, 0, 0.6, "Wind turbine OEM recovering with strong order book and margin turnaround."],

  // ---------- Oil & Gas ----------
  ["Reliance Industries", "RELIANCE", "oil-gas", "Integrated Energy", "#0055a5", "Strong Buy", 1309, 1700, 1770000, 1175919, 95610, 9.8, 17.7, 24, 28, 58000, 18.5, 0.46, 0.9, "India's largest conglomerate; FY26 revenue ₹11.76 lakh Cr, PAT ₹95,610 Cr, Jio IPO next."],
  ["ONGC", "ONGC", "oil-gas", "Oil Exploration", "#004c8f", "Buy", 237.3, 295, 299000, 152000, 39000, 6, 36, 14, 12, 25000, 7.7, 5.6, 0.3, "Crude-realisations upcycle; ~6.9x earnings, ~5.6% yield."],
  ["Indian Oil Corporation", "IOC", "oil-gas", "Oil Refining", "#e4002b", "Accumulate", 140, 152, 198000, 665000, 30000, 5, 6.5, 15, 12, 18000, 6.6, 4.2, 0.9, "India's largest refiner; refining and fuel-marketing margins normalising."],
  ["BPCL", "BPCL", "oil-gas", "Oil Refining", "#0033a0", "Buy", 300, 340, 130000, 470000, 24000, 7, 7, 18, 15, 12000, 5.4, 3.5, 1.2, "Fuel-marketing major with strong distribution network; margins recovering."],
  ["GAIL", "GAIL", "oil-gas", "Gas Distribution", "#003d7c", "Buy", 200, 235, 131000, 133000, 11500, 10, 12, 12, 10, 9000, 11.4, 2.4, 0.7, "Gas transmission monopoly plays the structural gas-penetration story."],
  ["Petronet LNG", "PETRONET", "oil-gas", "LNG", "#00529b", "Accumulate", 320, 355, 48000, 52000, 3400, 9, 8.5, 17, 15, 2800, 14.1, 2.9, 1.1, "India's LNG import terminal leader with stable take-or-pay volumes."],
  ["Adani Total Gas", "ATGL", "oil-gas", "City Gas", "#003366", "Accumulate", 680, 760, 74800, 15000, 1600, 16, 20, 12, 9, 1300, 47, 0.2, 1.7, "City gas distribution player expanding into EV charging and bio-CNG."],
  ["Indraprastha Gas", "IGL", "oil-gas", "City Gas", "#00529b", "Hold", 320, 335, 44800, 16300, 2300, 8, 18, 18, 14, 2100, 19.5, 3.4, 0.6, "Delhi-NCR gas distributor; CNG penetration growth but price sensitive."],

  // ---------- Utilities ----------
  ["NTPC", "NTPC", "utilities", "Power Generation", "#003366", "Accumulate", 344.3, 400, 334000, 178000, 20500, 11.9, 22, 12, 8.5, 12000, 16.3, 1.7, 1.6, "Largest thermal generator; EBITDA +20.5% Q1, 30+ GW green pipeline."],
  ["Power Grid Corporation", "POWERGRID", "utilities", "Transmission", "#003da5", "Buy", 271.6, 325, 255000, 48843, 16300, 9, 26, 19.5, 10, 9500, 15.6, 3.9, 2.5, "Transmission monopoly; ₹37k Cr/yr capex, regulated ROE, ~4% yield."],
  ["Adani Power", "ADANIPOWER", "utilities", "Power Generation", "#0a3d62", "Accumulate", 209, 252, 81000, 54241, 12775, 8, 44, 24, 13, 8000, 28.1, 0.3, 2.0, "Thermal IPP; Q1 PAT +47%; 4.89 GW under construction."],
  ["Torrent Power", "TORNTPOWER", "utilities", "Power Generation", "#0071ce", "Accumulate", 1850, 2050, 88900, 24500, 4600, 10, 28, 18, 12, 4200, 19, 1.6, 1.2, "Vertically integrated power utility with strong distribution franchise."],

  // ---------- Telecom ----------
  ["Bharti Airtel", "BHARTIARTL", "telecom", "Telecom Services", "#e4002b", "Buy", 1950, 2330, 1220000, 210973, 26700, 22, 56.7, 22.7, 24.7, 22000, 44, 0.31, 2.4, "Premium telecom operator; ARPU ₹264 and rising, 19 straight profitable quarters, Africa >79% owned."],
  ["Vodafone Idea", "IDEA", "telecom", "Telecom Services", "#e4002b", "Sell", 10, 8, 70000, 43000, -30000, 3, 38, -25, -8, -8000, null, 0, 0, "Balance-sheet stress and tariff-led competition leave limited equity upside."],
  ["Indus Towers", "INDUSTOWER", "telecom", "Tower Infrastructure", "#004c97", "Buy", 380, 440, 102000, 30500, 7400, 9, 58, 24, 13, 7200, 13.8, 1.8, 2.2, "Tower infrastructure leader with high operating leverage and rising yields."],
  ["Tata Communications", "TATACOMM", "telecom", "Telecom Services", "#003d7c", "Accumulate", 1750, 1950, 49900, 24500, 2100, 12, 28, 17, 14, 2500, 24, 1.3, 0.7, "Global digital infrastructure provider pivoting to cloud and IoT."],
  ["Bharti Hexacom", "BHARTIHEXA", "telecom", "Telecom Services", "#e4002b", "Buy", 1200, 1400, 60000, 13000, 2200, 14, 50, 24, 15, 1900, 27, 0.5, 2.8, "Emerging-market telecom growth play within the Airtel ecosystem."],

  // ---------- Media ----------
  ["Zee Entertainment", "ZEEL", "media", "Broadcasting", "#1a237e", "Reduce", 140, 150, 13450, 7900, 800, 4, 14, 6, 8, 700, 17, 0.3, 0.1, "Broadcasting major facing ad-market softness and management overhang."],
  ["PVR Inox", "PVRINOX", "media", "Cinema Exhibition", "#e4002b", "Accumulate", 1080, 1220, 10400, 6600, 250, 9, 17, 3, 4, 700, 42, 0, 1.8, "India's largest cinema chain; content pipeline and premium formats support occupancy."],
  ["Saregama", "SAREGAMA", "media", "Music & Entertainment", "#b8860b", "Accumulate", 530, 600, 10100, 850, 180, 15, 28, 14, 15, 150, 56, 0.4, 0.05, "Music-copyright owner with royalty tailwinds and Carvaan franchise."],
  ["Sun TV Network", "SUNTV", "media", "Broadcasting", "#d71920", "Hold", 760, 800, 30000, 4500, 1600, 5, 52, 23, 26, 1200, 18.8, 3.5, 0.02, "South-India broadcasting monopoly with exceptional margins and dividends."],
  ["Nazara Technologies", "NAZARA", "media", "Gaming", "#e30613", "Accumulate", 1050, 1200, 13700, 2600, 250, 18, 14, 9, 11, 200, 55, 0, 0.2, "Gaming and esports platform with diverse content portfolio."],

  // ---------- Metals ----------
  ["Tata Steel", "TATASTEEL", "metals", "Steel", "#00529b", "Accumulate", 128, 145, 160000, 225000, 10000, 6, 15, 9, 11, 8000, 16, 1.8, 0.9, "Global steel major; India expansion and Europe restructuring drive cycle."],
  ["JSW Steel", "JSWSTEEL", "metals", "Steel", "#0072ce", "Accumulate", 1298, 1378, 318000, 170000, 16200, 17, 20, 10, 9, 5500, 12.9, 0.5, 1.3, "India's largest private steelmaker; Q1 EBITDA margin ~20%, deleveraging."],
  ["Hindalco Industries", "HINDALCO", "metals", "Aluminium", "#0b3d91", "Buy", 675, 780, 150000, 220000, 11500, 8, 13, 13, 11, 7000, 13, 0.7, 0.8, "Aluminium leader with world-class Novelis downstream franchise."],
  ["Vedanta", "VEDL", "metals", "Diversified Metals", "#e4002b", "Buy", 490, 580, 182000, 143000, 15000, 6, 25, 22, 17, 9500, 12, 4.5, 1.5, "Diversified natural-resources conglomerate with high dividend yields."],
  ["Jindal Steel & Power", "JINDALSTEL", "metals", "Steel", "#003366", "Accumulate", 880, 980, 90000, 50500, 4500, 7, 18, 12, 10, 3200, 20, 1.0, 0.9, "North India steelmaker with low-cost iron ore linkage and capacity expansion."],
  ["Steel Authority of India", "SAIL", "metals", "Steel", "#d9001a", "Hold", 125, 130, 51600, 100000, 2300, 5, 10, 4.5, 4, 1500, 22, 1.2, 1.0, "PSU steelmaker; modernisation capex yet to translate into returns."],
  ["APL Apollo Tubes", "APLAPOLLO", "metals", "Steel Tubes", "#e11d48", "Strong Buy", 1850, 2150, 25700, 31000, 750, 14, 7, 19, 22, 700, 34, 0.3, 0.4, "Organised steel-pipe leader consolidating a fragmented, growing market."],

  // ---------- Mining ----------
  ["Coal India", "COALINDIA", "mining", "Coal Mining", "#003366", "Accumulate", 413.65, 460, 255000, 168000, 31070, 7.8, 19, 30, 33, 28000, 8.2, 6.4, 0.02, "World's largest coal producer; Q1 PAT ₹8,850 Cr, yield ~6.4%."],
  ["NMDC", "NMDC", "mining", "Iron Ore Mining", "#006a4e", "Accumulate", 200, 225, 61300, 20500, 5600, 7, 34, 17, 19, 4200, 11, 5.4, 0.02, "India's largest iron-ore miner; volumes and prices support earnings."],
  ["Hindustan Zinc", "HINDZINC", "mining", "Zinc Mining", "#003d7c", "Accumulate", 470, 520, 199000, 33000, 9500, 8, 42, 26, 28, 8000, 21, 4.0, 0.05, "World-class integrated zinc producer with superior cost curves."],

  // ---------- Textiles ----------
  ["Page Industries", "PAGEIND", "textiles", "Apparel", "#1a1a2e", "Accumulate", 41000, 45000, 45700, 4700, 520, 7, 15, 16, 17, 380, 88, 1.0, 0.05, "Jockey licensee with premium innerwear brand and industry-leading margins."],
  ["KPR Mill", "KPRMILL", "textiles", "Textiles", "#003366", "Buy", 1150, 1320, 39300, 8200, 1100, 12, 20, 18, 20, 800, 36, 1.0, 0.1, "Vertically integrated knitwear manufacturer with strong export traction."],
  ["Vardhman Textiles", "VTL", "textiles", "Textiles", "#0a3d62", "Accumulate", 510, 560, 14700, 9800, 950, 8, 16, 13, 13, 900, 15.5, 1.4, 0.3, "India's largest textile producer; cotton-cost tailwinds and capacity expansion."],
  ["Trident", "TRIDENT", "textiles", "Textiles", "#007a33", "Hold", 30, 31, 15300, 7800, 700, 6, 18, 11, 12, 800, 22, 1.5, 0.7, "Home-textiles player; export demand recovery is the key swing factor."],
  ["Welspun India", "WELSPUNIND", "textiles", "Home Textiles", "#004b93", "Accumulate", 560, 620, 16400, 10300, 900, 12, 16, 17, 18, 700, 18, 0.5, 0.8, "Home-textile exporter with US retail relationships and brand diversification."],

  // ---------- Infrastructure ----------
  ["Larsen & Toubro", "LT", "infrastructure", "EPC & Engineering", "#003f87", "Accumulate", 4040, 4497, 557000, 292000, 16084, 12.2, 12, 17, 12, 6500, 34.6, 0.9, 0.5, "Record ₹5.3 lakh Cr order book; FY27 guide +15% inflows and revenue."],
  ["Adani Ports", "ADANIPORTS", "infrastructure", "Ports", "#e30613", "Buy", 1690, 1950, 364000, 38000, 13000, 15, 60, 15, 11, 5800, 28, 0.5, 1.3, "India's largest private port-logistics network; Q1 cargo +15%."],
  ["GMR Airports", "GMRAIRPORT", "infrastructure", "Airports", "#003399", "Accumulate", 90, 102, 54300, 10500, 1000, 21, 38, 8, 6.5, -800, 54, 0, 2.8, "Delhi and Hyderabad airport operator monetising air-traffic recovery."],
  ["IRB Infrastructure", "IRB", "infrastructure", "Roads", "#00529b", "Accumulate", 55, 62, 33200, 8900, 950, 13, 39, 15, 10, 1800, 35, 0.4, 2.0, "Largest private road developer; toll traffic growth and HAM resolution."],
  ["KEC International", "KEC", "infrastructure", "EPC", "#004b93", "Buy", 950, 1100, 24400, 21500, 700, 16, 9, 13, 12, 600, 35, 0.4, 1.1, "Transmission EPC leader with strong domestic and international order book."],
  ["NCC", "NCC", "infrastructure", "Construction", "#003366", "Accumulate", 290, 325, 18200, 22000, 800, 12, 8, 14, 11, 900, 23, 0.7, 0.8, "Diversified construction player with improving execution and order inflow."],
];

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function legalName(name: string): string {
  const noSuffix = [
    "State Bank of India",
    "ONGC",
    "IOC",
    "Hindustan Zinc",
    "Coal India",
    "NMDC",
    "NTPC",
    "GAIL",
    "BEL",
  ];
  if (noSuffix.includes(name)) return name;
  if (name.endsWith("Bank")) return `${name} Limited`;
  if (name.includes("&")) return `${name} Limited`;
  return `${name} Limited`;
}

function formatDate(daysAgo: number): string {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  return d.toISOString().slice(0, 10);
}

function hashCode(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (Math.imul(31, h) + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

export const companies: Company[] = ROWS.map((row) => {
  const [
    name, ticker, sector, industry, color, recommendation,
    price, target, mcap, revenue, profit, growth, margin, roe, roce,
    fcf, pe, divYield, de, thesis,
  ] = row;

  const ups = Math.round(((target - price) / price) * 1000) / 10;
  const author = AUTHORS[hashCode(name) % AUTHORS.length];
  const updatedDate =
    [
      "Trent", "Titan", "Avenue Supermarts", "Reliance Industries", "HDFC Bank", "Bharti Airtel",
      "Tata Consultancy Services", "Infosys", "State Bank of India", "ICICI Bank", "Kotak Mahindra Bank",
      "Axis Bank", "HCL Technologies", "Maruti Suzuki", "Sun Pharmaceutical", "Tata Motors",
      "Mahindra & Mahindra", "Bajaj Auto", "Bajaj Finance", "Bajaj Finserv", "Nestle India",
      "Hindustan Unilever", "ITC", "Larsen & Toubro", "NTPC", "ONGC", "Power Grid Corporation",
      "Adani Ports", "Coal India", "Siemens India", "Bharat Electronics", "Adani Power", "JSW Steel",
    ].includes(name)
      ? "2026-08-07"
      : formatDate(hashCode(name) % 5);

  return {
    slug: slugify(name),
    name,
    legalName: legalName(name),
    ticker,
    sector,
    industry,
    logoColor: color,
    recommendation,
    currentPrice: price,
    targetPrice: target,
    upsidePct: ups,
    marketCapCr: mcap,
    revenueCr: revenue,
    netProfitCr: profit,
    revenueGrowthPct: growth,
    ebitdaMarginPct: margin,
    roePct: roe,
    rocePct: roce,
    fcfCr: fcf,
    pe: pe ?? (profit > 0 ? Math.round((mcap / profit) * 10) / 10 : null),
    dividendYieldPct: divYield,
    debtEquity: de,
    shortThesis: thesis,
    updatedDate,
    author,
  };
});

export function getCompany(slug: string): Company | undefined {
  return companies.find((c) => c.slug === slug);
}

export function getCompaniesBySector(sectorSlug: string): Company[] {
  return companies.filter((c) => c.sector === sectorSlug);
}

export function getPeers(company: Company, count = 5): Company[] {
  return companies
    .filter((c) => c.sector === company.sector && c.slug !== company.slug)
    .sort((a, b) => b.marketCapCr - a.marketCapCr)
    .slice(0, count);
}

export function sectorCompanyCount(sectorSlug: string): number {
  return companies.filter((c) => c.sector === sectorSlug).length;
}

export function latestSectorUpdate(sectorSlug: string): string {
  const list = getCompaniesBySector(sectorSlug);
  if (list.length === 0) return "";
  return [...list].sort((a, b) => b.updatedDate.localeCompare(a.updatedDate))[0]
    .updatedDate;
}

export const ratingOrder: Record<Rating, number> = {
  "Strong Buy": 0,
  Buy: 1,
  Accumulate: 2,
  Hold: 3,
  Reduce: 4,
  Sell: 5,
};

export function sortByRating(list: Company[]): Company[] {
  return [...list].sort(
    (a, b) => ratingOrder[a.recommendation] - ratingOrder[b.recommendation]
  );
}

export function formatUpdated(dateStr: string): string {
  const diff = Math.round(
    (Date.now() - new Date(dateStr + "T00:00:00Z").getTime()) / 86400000
  );
  if (diff <= 0) return "Today";
  if (diff === 1) return "Yesterday";
  if (diff < 7) return `${diff} days ago`;
  return new Date(dateStr + "T00:00:00Z").toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function formatIndian(n: number): string {
  const sign = n < 0 ? "-" : "";
  const s = Math.abs(Math.round(n)).toString();
  const last3 = s.slice(-3);
  const rest = s.slice(0, -3);
  const grouped = rest
    ? rest.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + "," + last3
    : last3;
  return sign + grouped;
}

export function formatCr(n: number): string {
  return `₹${formatIndian(n)} Cr`;
}

export function formatPrice(n: number): string {
  return `₹${formatIndian(n)}`;
}
