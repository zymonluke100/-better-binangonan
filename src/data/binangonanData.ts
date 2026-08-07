import { WeatherData, FuelPrice, TrafficReport, Announcement, EmergencyContact, BarangayInfo, MunicipalOffice, ResidentReport } from '../types';

export const INITIAL_WEATHER: WeatherData = {
  temp: 28,
  feelsLike: 31,
  condition: 'Partly Cloudy with Scattered Showers',
  description: 'Moderate breeze from Laguna de Bay. Occasional light drizzle near Talim Island.',
  humidity: 78,
  windSpeed: 12,
  rainChance: 40,
  uvIndex: 6,
  forecast: [
    { day: 'Today', temp: 28, icon: 'cloud-rain' },
    { day: 'Tomorrow', temp: 30, icon: 'sun' },
    { day: 'Sat', temp: 29, icon: 'cloud-sun' },
    { day: 'Sun', temp: 31, icon: 'sun' },
    { day: 'Mon', temp: 27, icon: 'cloud-lightning' },
  ]
};

export const INITIAL_FUEL_PRICES: FuelPrice[] = [
  { type: 'RON 91 Unleaded', price: 62.40, change: '-₱0.50 vs last week', isUp: false, station: 'Shell Manila East Rd, Calumpang' },
  { type: 'RON 95 Premium', price: 67.80, change: '-₱0.35 vs last week', isUp: false, station: 'Petron Darangan' },
  { type: 'Diesel Extra', price: 58.90, change: '+₱0.20 vs last week', isUp: true, station: 'Caltex Bilibiran' },
];

export const FOREX_RATES = {
  currency: 'USD - PHP',
  rate: 58.45,
  change: '-0.12 vs 7 days ago',
  isUp: false,
};

export const INITIAL_TRAFFIC: TrafficReport[] = [
  {
    id: 'tr-1',
    location: 'Manila East Road - Calumpang Junction',
    status: 'Moderate',
    reportedAt: '10 mins ago',
    notes: 'Slight congestion due to ongoing sidewalk improvement. Traffic enforcers deployed.',
    barangay: 'Calumpang'
  },
  {
    id: 'tr-2',
    location: 'Manila East Road - Darangan Highway',
    status: 'Smooth',
    reportedAt: '15 mins ago',
    notes: 'Flowing smoothly both north and southbound towards Angono boundary.',
    barangay: 'Darangan'
  },
  {
    id: 'tr-3',
    location: 'Quarry Road - Pantok Corner',
    status: 'Heavy',
    reportedAt: '5 mins ago',
    notes: 'Heavy truck traffic entering quarry sector. Drive with care.',
    barangay: 'Pantok'
  },
  {
    id: 'tr-4',
    location: 'Pila-pila Port Road (Ferry Station)',
    status: 'Smooth',
    reportedAt: '25 mins ago',
    notes: 'Passenger boats to Janosa & Subay operating normal loading.',
    barangay: 'Pila-pila'
  },
  {
    id: 'tr-5',
    location: 'Tagpos - Angono Coastal Boundary',
    status: 'Moderate',
    reportedAt: '12 mins ago',
    notes: 'Normal morning rush traffic.',
    barangay: 'Tagpos'
  },
  {
    id: 'tr-6',
    location: 'Limbon-limbon Coastal Road (Between Pila-pila & Ithan)',
    status: 'Smooth',
    reportedAt: '18 mins ago',
    notes: 'Smooth traffic along the coastal bypass road connecting Pila-pila and Ithan.',
    barangay: 'Limbon-limbon'
  }
];

export const INITIAL_ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'ann-5',
    title: 'Mainland Coastal Outreach: Brgy. Limbon-limbon, Pila-pila & Ithan Mobile LGU Services',
    category: 'Community',
    summary: 'Mobile Mayor’s Office, LCR Civil Registry, and Health Consultations at Brgy. Limbon-limbon Covered Court.',
    content: 'The Office of the Municipal Mayor in coordination with LCR, MSWDO, and MHO will hold a mobile LGU service outreach at Barangay Limbon-limbon Covered Court (serving Limbon-limbon, Pila-pila, and Ithan) this Friday, 8:00 AM to 3:00 PM. Senior Citizen ID processing, Barangay clearance validation, and free medical consultations will be provided.',
    date: 'Aug 7, 2026',
    source: 'Office of the Municipal Mayor',
    important: true,
    badge: 'COASTAL OUTREACH'
  },
  {
    id: 'ann-1',
    title: 'LGU Advisory: Free Medical & Dental Mission at Barangay Bilibiran Gymnasium',
    category: 'Health',
    summary: 'Municipal Health Office will provide free checkups, basic medicine, and laboratory vouchers.',
    content: 'The Municipality of Binangonan in coordination with the MHO will hold a community medical outreach this Saturday, 8:00 AM at Brgy. Bilibiran Covered Court. Free check-ups, senior vitamin distribution, and dental extraction will be offered.',
    date: 'Aug 6, 2026',
    source: 'Binangonan MHO',
    important: true,
    badge: 'HEALTH MISSION'
  },
  {
    id: 'ann-2',
    title: 'Schedule of Garbage Collection for Week of August 6-12',
    category: 'LGU Advisory',
    summary: 'Waste management collection schedules for Mainland and Talim Island ports.',
    content: 'Biodegradable waste collection for Zone 1 (Bilibiran, Calumpang, Darangan, Layunan, Libis, Lunsad, Macamot) every Mon/Wed/Fri 6 AM. Non-biodegradable on Tue/Thu/Sat.',
    date: 'Aug 5, 2026',
    source: 'MENRO Binangonan',
    important: false,
    badge: 'MENRO WASTE'
  },
  {
    id: 'ann-3',
    title: 'Talim Island Ferry & Motorized Banca Safety Clearance Update',
    category: 'Community',
    summary: 'Coast Guard Sub-Station Binangonan issues travel advisory for passengers bound for Janosa & Rayap.',
    content: 'All motorized bancas operating from Pritil Port and Pila-pila Port are cleared for lake crossing. Passengers are reminded to wear life vests at all times while aboard.',
    date: 'Aug 6, 2026',
    source: 'PCG Sub-Station Binangonan',
    important: false,
    badge: 'LAKE SAFETY'
  },
  {
    id: 'ann-4',
    title: 'Road Maintenance Advisory: Manila East Road (Muzon-Pantok Stretch)',
    category: 'Traffic',
    summary: 'Asphalt overlay ongoing during night hours (10 PM - 4 AM) to minimize daytime delay.',
    content: 'DPWH Rizal 1st District Engineering Office will conduct night-time asphalt patching along Manila East Road. One lane open, please follow flagmen.',
    date: 'Aug 4, 2026',
    source: 'Binangonan Traffic Management Office',
    important: false,
    badge: 'ROAD WORK'
  }
];

export const EMERGENCY_CONTACTS: EmergencyContact[] = [
  {
    id: 'em-1',
    name: 'Binangonan MDRRMO (Disaster Risk Reduction & Rescue)',
    category: 'Disaster & Rescue',
    phonePrimary: '(02) 8652-1875',
    phoneSecondary: '0920-983-1234',
    address: 'Municipal Compound, Calumpang, Binangonan, Rizal',
    description: '24/7 Hotline for typhoon, flooding, vehicular accidents, emergency medical dispatch, and lake rescue operations.',
    is24_7: true
  },
  {
    id: 'em-2',
    name: 'Binangonan Police Station (PNP)',
    category: 'Police',
    phonePrimary: '(02) 8652-0123',
    phoneSecondary: '0998-598-5432',
    address: 'Calumpang, Binangonan, Rizal',
    description: 'Police emergency response, crime reporting, public safety, and traffic assistance.',
    is24_7: true
  },
  {
    id: 'em-3',
    name: 'Bureau of Fire Protection (BFP Binangonan)',
    category: 'Fire',
    phonePrimary: '(02) 8652-2345',
    phoneSecondary: '0915-123-4567',
    address: 'Manila East Road, Calumpang, Binangonan',
    description: 'Fire emergency response, hazardous material safety, rescue and fire inspection.',
    is24_7: true
  },
  {
    id: 'em-4',
    name: 'Margarito A. Duavit Memorial Hospital (Pag-asa District Hospital)',
    category: 'Medical',
    phonePrimary: '(02) 8652-0112',
    phoneSecondary: '(02) 8652-0888',
    address: 'National Road, Brgy. Pag-asa, Binangonan, Rizal',
    description: 'Main public municipal hospital with 24/7 Emergency Room, maternity ward, and ambulance service.',
    is24_7: true
  },
  {
    id: 'em-5',
    name: 'Binangonan Municipal Health Office (MHO)',
    category: 'Medical',
    phonePrimary: '(02) 8652-0345',
    address: 'Municipal Hall, Calumpang, Binangonan',
    description: 'Primary health consultations, vaccinations, animal bite clinic, and maternal care.',
    is24_7: false
  },
  {
    id: 'em-6',
    name: 'PCG Sub-Station Binangonan (Coast Guard - Lake Safety)',
    category: 'Disaster & Rescue',
    phonePrimary: '0917-888-9900',
    address: 'Pritil Port, Brgy. Libis, Binangonan',
    description: 'Maritime and lake safety enforcement for Laguna de Bay watercraft and Talim Island commuters.',
    is24_7: true
  },
  {
    id: 'em-8',
    name: 'Brgy. Limbon-limbon Emergency Post & Health Outpost',
    category: 'Disaster & Rescue',
    phonePrimary: '0917-101-0024',
    phoneSecondary: '0919-888-2341',
    address: 'Limbon-limbon Coastal Road (Between Pila-pila & Ithan), Binangonan, Rizal',
    description: 'Local barangay emergency hotline, first-aid response, and BDRRMC disaster team for Brgy. Limbon-limbon residents.',
    is24_7: true
  },
  {
    id: 'em-7',
    name: 'Meralco Emergency Line (Rizal Sector)',
    category: 'Utilities',
    phonePrimary: '16211',
    phoneSecondary: '(02) 8631-2222',
    address: 'Meralco Binangonan Business Center',
    description: 'Power outage reports, broken wires, transformer sparks, and power restoration.',
    is24_7: true
  },
  {
    id: 'em-8',
    name: 'Manila Water Customer Emergency Hotline',
    category: 'Utilities',
    phonePrimary: '1627',
    address: 'East Zone Operational Office',
    description: 'Water interruption, main line burst, water quality concerns.',
    is24_7: true
  }
];

export const BARANGAYS_LIST: BarangayInfo[] = [
  // ----------------MAINLAND BARANGAYS (23)----------------
  { name: 'Bangad', captain: 'Hon. Roberto Santos', contact: '0917-101-0001', locationType: 'Mainland', populationEst: '8,500', hallAddress: 'Bangad Main Road, Binangonan' },
  { name: 'Bilibiran', captain: 'Hon. Manuel Reyes', contact: '0917-101-0002', locationType: 'Mainland', populationEst: '18,200', hallAddress: 'National Highway, Bilibiran' },
  { name: 'Binitagan', captain: 'Hon. Teresa Cruz', contact: '0917-101-0003', locationType: 'Mainland', populationEst: '4,100', hallAddress: 'Binitagan Coastal Road' },
  { name: 'Calumpang', captain: 'Hon. Fernando Duavit Jr.', contact: '0917-101-0004', locationType: 'Mainland', populationEst: '24,600', hallAddress: 'Calumpang Municipal Hall Compound' },
  { name: 'Calumpang Proper', captain: 'Hon. Jose Maria Ynares', contact: '0917-101-0022', locationType: 'Mainland', populationEst: '11,400', hallAddress: 'Town Center, Calumpang' },
  { name: 'Darangan', captain: 'Hon. Joseph Aragon', contact: '0917-101-0005', locationType: 'Mainland', populationEst: '29,400', hallAddress: 'Manila East Road, Darangan' },
  { name: 'Ithan', captain: 'Hon. Maria Flores', contact: '0917-101-0006', locationType: 'Mainland', populationEst: '6,200', hallAddress: 'Ithan Main Highway' },
  { name: 'Kalayaan', captain: 'Hon. Danilo Ramos', contact: '0917-101-0007', locationType: 'Mainland', populationEst: '12,800', hallAddress: 'Kalayaan Avenue, Phase 1' },
  { name: 'Layunan', captain: 'Hon. Pedro Garcia', contact: '0917-101-0008', locationType: 'Mainland', populationEst: '15,300', hallAddress: 'Santa Ursula St, Layunan' },
  { name: 'Libis (Pritil Port)', captain: 'Hon. Antonio Gonzales', contact: '0917-101-0009', locationType: 'Mainland', populationEst: '11,700', hallAddress: 'Pritil Port Road, Libis' },
  { name: 'Limbon-limbon', captain: 'Hon. Jose Unida', contact: '0917-101-0024', locationType: 'Mainland', populationEst: '3,850', hallAddress: 'Limbon-limbon Coastal Road (Between Pila-pila & Ithan), Binangonan' },
  { name: 'Lunsad', captain: 'Hon. Carmen Mendoza', contact: '0917-101-0010', locationType: 'Mainland', populationEst: '14,100', hallAddress: 'Lunsad Church Street' },
  { name: 'Macamot', captain: 'Hon. Ernesto Castro', contact: '0917-101-0011', locationType: 'Mainland', populationEst: '9,800', hallAddress: 'Macamot Main Road' },
  { name: 'Mahabang Parang', captain: 'Hon. Gabriel Aquial', contact: '0917-101-0012', locationType: 'Mainland', populationEst: '11,200', hallAddress: 'Mahabang Parang Hillside' },
  { name: 'Muzon', captain: 'Hon. Ricardo Bautista', contact: '0917-101-0013', locationType: 'Mainland', populationEst: '19,500', hallAddress: 'Muzon Highway Corner' },
  { name: 'Pag-asa', captain: 'Hon. Elena Villanueva', contact: '0917-101-0014', locationType: 'Mainland', populationEst: '22,100', hallAddress: 'Pag-asa Hospital Zone' },
  { name: 'Pantok', captain: 'Hon. Jaime Soriano', contact: '0917-101-0015', locationType: 'Mainland', populationEst: '17,400', hallAddress: 'Quarry Road, Pantok' },
  { name: 'Pila-pila', captain: 'Hon. Reynaldo Ynares', contact: '0917-101-0016', locationType: 'Mainland', populationEst: '13,900', hallAddress: 'Pila-pila Ferry Dock' },
  { name: 'Rayap (Mainland)', captain: 'Hon. Benigno Ocampo', contact: '0917-101-0017', locationType: 'Mainland', populationEst: '7,300', hallAddress: 'Rayap Boundary Road' },
  { name: 'San Carlos', captain: 'Hon. Victorino San Jose', contact: '0917-101-0018', locationType: 'Mainland', populationEst: '16,800', hallAddress: 'San Carlos Subd Phase 2' },
  { name: 'Santo Niño', captain: 'Hon. Rafael Santos', contact: '0917-101-0023', locationType: 'Mainland', populationEst: '8,900', hallAddress: 'Santo Niño Main Street' },
  { name: 'Tagpos', captain: 'Hon. Cynthia Mercado', contact: '0917-101-0019', locationType: 'Mainland', populationEst: '21,000', hallAddress: 'Tagpos Coastal Road' },
  { name: 'Tatala', captain: 'Hon. Rodrigo Pascual', contact: '0917-101-0020', locationType: 'Mainland', populationEst: '10,400', hallAddress: 'Tatala Valley Road' },
  { name: 'Tayuman', captain: 'Hon. Arlene Del Rosario', contact: '0917-101-0021', locationType: 'Mainland', populationEst: '18,900', hallAddress: 'Tayuman East Road' },

  // ----------------TALIM ISLAND BARANGAYS (17)----------------
  { name: 'Bantan', captain: 'Hon. Cristobal Raymundo', contact: '0917-102-0012', locationType: 'Talim Island', populationEst: '2,600', hallAddress: 'Bantan Wharf, Talim Island' },
  { name: 'Bombongan', captain: 'Hon. Mario Unida', contact: '0917-102-0001', locationType: 'Talim Island', populationEst: '3,200', hallAddress: 'Bombongan Seashore, Talim Island' },
  { name: 'Buhangin', captain: 'Hon. Leandro Francisco', contact: '0917-102-0013', locationType: 'Talim Island', populationEst: '2,100', hallAddress: 'Buhangin Waterfront, Talim Island' },
  { name: 'Ginoong San Jose', captain: 'Hon. Benjamin Antazo', contact: '0917-102-0014', locationType: 'Talim Island', populationEst: '3,800', hallAddress: 'Ginoong San Jose Chapel Street' },
  { name: 'Habagatan', captain: 'Hon. Juanito Cenidoza', contact: '0917-102-0002', locationType: 'Talim Island', populationEst: '2,900', hallAddress: 'Habagatan Island Dock' },
  { name: 'Janosa', captain: 'Hon. Alipio San Juan', contact: '0917-102-0003', locationType: 'Talim Island', populationEst: '6,800', hallAddress: 'Janosa Central Port (Mt. Tagapo Base)' },
  { name: 'Kalinawan', captain: 'Hon. Silvestre Paralejas', contact: '0917-102-0015', locationType: 'Talim Island', populationEst: '2,300', hallAddress: 'Kalinawan Island Coast' },
  { name: 'Kasagpan', captain: 'Hon. Noel Arambulo', contact: '0917-102-0004', locationType: 'Talim Island', populationEst: '2,400', hallAddress: 'Kasagpan Waterfront' },
  { name: 'Kaytitinga', captain: 'Hon. Andres Discutido', contact: '0917-102-0016', locationType: 'Talim Island', populationEst: '1,800', hallAddress: 'Kaytitinga Hillside, Talim Island' },
  { name: 'Kinaboogan', captain: 'Hon. Sofia Cequeña', contact: '0917-102-0005', locationType: 'Talim Island', populationEst: '3,100', hallAddress: 'Kinaboogan Seawall' },
  { name: 'Malakaban', captain: 'Hon. Francisca Gil', contact: '0917-102-0006', locationType: 'Talim Island', populationEst: '2,800', hallAddress: 'Malakaban Bamboo Wharf' },
  { name: 'Pinagdilawan', captain: 'Hon. Gregorio Cervo', contact: '0917-102-0007', locationType: 'Talim Island', populationEst: '1,900', hallAddress: 'Pinagdilawan Cove' },
  { name: 'Pipindan', captain: 'Hon. Honorio Cenidoza', contact: '0917-102-0017', locationType: 'Talim Island', populationEst: '4,100', hallAddress: 'Pipindan Point Light Station' },
  { name: 'Rayap (Island)', captain: 'Hon. Domingo Antazo', contact: '0917-102-0008', locationType: 'Talim Island', populationEst: '3,500', hallAddress: 'Rayap Island Chapel Street' },
  { name: 'San Andres', captain: 'Hon. Teodoro Paralejas', contact: '0917-102-0009', locationType: 'Talim Island', populationEst: '4,200', hallAddress: 'San Andres Fishermen Wharf' },
  { name: 'Subay', captain: 'Hon. Orlando San Pedro', contact: '0917-102-0010', locationType: 'Talim Island', populationEst: '5,100', hallAddress: 'Subay Bamboo Craft & Fishing Center' },
  { name: 'Tabon', captain: 'Hon. Marilou Discutido', contact: '0917-102-0011', locationType: 'Talim Island', populationEst: '3,700', hallAddress: 'Tabon Seawall Road' },
];

export const MUNICIPAL_OFFICES: MunicipalOffice[] = [
  {
    id: 'off-1',
    name: 'Office of the Municipal Mayor',
    head: 'Hon. Cesar M. Ynares',
    location: '2nd Floor, Executive Building, Calumpang Municipal Hall',
    contact: '(02) 8652-0163 / (02) 8652-0089',
    email: 'mayor@binangonan.gov.ph',
    services: ['Executive Approvals', 'Resident Petitions', 'Scholarship Endorsements', 'Community Assistance']
  },
  {
    id: 'off-1b',
    name: 'Office of the Vice Mayor & Sangguniang Bayan',
    head: 'Hon. Cecilio Hernandez',
    location: '3rd Floor, Legislative Wing, Municipal Hall',
    contact: '(02) 8652-0177',
    email: 'vice-mayor@binangonan.gov.ph',
    services: ['Municipal Ordinances', 'Barangay Ordinance Review', 'Public Hearings', 'Community Petitions']
  },
  {
    id: 'off-2',
    name: 'Business Permits and Licensing Office (BPLO)',
    head: 'Atty. Maria Theresa Duavit',
    location: 'Ground Floor, Municipal Hall Annex',
    contact: '(02) 8652-0240',
    email: 'bplo@binangonan.gov.ph',
    services: ['New Business Permit Application', 'Permit Renewal', 'Special Event Permits', 'Occupational Permits']
  },
  {
    id: 'off-3',
    name: 'Municipal Treasury & Assessor Office',
    head: 'Mr. Ricardo San Felipe',
    location: 'Ground Floor, Main Municipal Hall',
    contact: '(02) 8652-0311',
    email: 'treasury@binangonan.gov.ph',
    services: ['Real Property Tax (Ampt) Payment', 'Community Tax Certificate (Cedula)', 'Traffic Fine Payments', 'Transfer Tax']
  },
  {
    id: 'off-4',
    name: 'Municipal Social Welfare and Development Office (MSWDO)',
    head: 'Mrs. Corazon Dela Cruz',
    location: 'Social Services Building, Calumpang',
    contact: '(02) 8652-0455',
    email: 'mswdo@binangonan.gov.ph',
    services: ['Senior Citizen ID & Booklets', 'Solo Parent Certification', 'AICS Financial Aid', 'Persons with Disability (PWD) ID']
  },
  {
    id: 'off-5',
    name: 'Municipal Environment & Natural Resources Office (MENRO)',
    head: 'Engr. Danilo Ocampo',
    location: 'MENRO Compound, Calumpang',
    contact: '(02) 8652-0890',
    email: 'menro@binangonan.gov.ph',
    services: ['Solid Waste Collection Schedule', 'Environmental Compliance Certificate', 'Tree Cutting Permit Inspection']
  },
  {
    id: 'off-6',
    name: 'Municipal Disaster Risk Reduction & Management Office (MDRRMO)',
    head: 'Dr. Jerry Cequeña',
    location: 'Disaster Command Center, Brgy. Calumpang',
    contact: '(02) 8652-1875 / 0920-983-1234',
    email: 'mdrrmo@binangonan.gov.ph',
    services: ['24/7 Emergency Dispatch', 'Ambulance Request', 'Typhoon & Lake Flood Warnings', 'Rescue Operations']
  },
  {
    id: 'off-7',
    name: 'Municipal Health Office (MHO) & Animal Bite Center',
    head: 'Dr. Maria Rosario Ynares',
    location: 'Calumpang Health Center & Pag-asa District Annex',
    contact: '(02) 8652-0345',
    email: 'mho@binangonan.gov.ph',
    services: ['Free Medical Consultation', 'Anti-Rabies Vaccines', 'Maternal & Child Care', 'Laboratory Vouchers']
  },
  {
    id: 'off-8',
    name: 'Local Civil Registrar (LCR Binangonan)',
    head: 'Ms. Consolacion Santos',
    location: 'Ground Floor, Calumpang Municipal Hall',
    contact: '(02) 8652-0512',
    email: 'civilregistry@binangonan.gov.ph',
    services: ['Birth Certificate Registration', 'Marriage License Application', 'Death Certificate Issuance', 'Legal Corrections']
  },
  {
    id: 'off-9',
    name: 'Public Employment Service Office (PESO)',
    head: 'Mr. Ferdinand Mercado',
    location: 'PESO Center, 2nd Floor Municipal Hall Annex',
    contact: '(02) 8652-0688',
    email: 'peso@binangonan.gov.ph',
    services: ['Local Job Fairs', 'Special Program for Employment of Students (SPES)', 'Overseas Worker Assistance', 'TESDA Training Vouchers']
  },
  {
    id: 'off-10',
    name: 'Municipal Agriculture & Fisheries Office (MAO)',
    head: 'Engr. Roberto Discutido',
    location: 'Agricultural Extension Office, Brgy. Libis',
    contact: '(02) 8652-0922',
    email: 'agriculture@binangonan.gov.ph',
    services: ['Fisherfolk Registration (FishR)', 'Motorboat / Banca Registration', 'Seedling & Fertilizer Distribution', 'Laguna de Bay Fishery Permits']
  }
];

export const INITIAL_CITIZEN_REPORTS: ResidentReport[] = [
  {
    id: 'rep-1',
    category: 'Traffic Jam',
    barangay: 'Pantok',
    locationDetail: 'Near Quarry Entrance along Quarry Road',
    description: 'Heavy queue of dump trucks blocking 1 lane heading towards Manila East Road. Traffic moving very slowly.',
    timestamp: '25 mins ago',
    upvotes: 14,
    status: 'In Progress',
    reporterName: 'Kuya Ben (Commuter)'
  },
  {
    id: 'rep-2',
    category: 'Flooding',
    barangay: 'Bilibiran',
    locationDetail: 'Low-lying section near Bilibiran Elementary School',
    description: 'Ankle-deep rain runoff after 30-minute heavy downpour. Passable to all vehicles, but slow down for pedestrians.',
    timestamp: '1 hour ago',
    upvotes: 9,
    status: 'Resolved',
    reporterName: 'Aling Nena'
  },
  {
    id: 'rep-3',
    category: 'Power Interruption',
    barangay: 'Janosa (Talim Island)',
    locationDetail: 'Sitio Mount Tagapo trailhead area',
    description: 'Brief power flickers reported. Meralco crew dispatched to check transformer line.',
    timestamp: '2 hours ago',
    upvotes: 21,
    status: 'In Progress',
    reporterName: 'Marco S.'
  },
  {
    id: 'rep-4',
    category: 'General',
    barangay: 'Limbon-limbon (Mainland)',
    locationDetail: 'Limbon-limbon Coastal Walkway (Between Pila-pila & Ithan)',
    description: 'Solar streetlights along the coastal walkway scheduled for bulb replacement. Barangay council already notified.',
    timestamp: '45 mins ago',
    upvotes: 18,
    status: 'In Progress',
    reporterName: 'Pedro Unida (Limbon Resident)'
  }
];

export const CITY_HISTORY_INFO = {
  title: 'Discover Binangonan, Rizal',
  subtitle: 'The Gateway to Talim Island & Cultural Gem of Laguna de Bay',
  foundedYear: '1621',
  patronSaint: 'Santa Ursula',
  description: 'Binangonan is a 1st class municipality in the province of Rizal, Philippines, situated on the eastern shores of Laguna de Bay. Known for its rich fishing heritage, bamboo craftsmanship, quarry industries, and scenic views of Mount Tagapo on Talim Island.',
  keyHighlights: [
    { title: 'Santa Ursula Parish Church', text: 'Built in 1621 by Franciscan missionaries, famous for its historic bell tower and Carabaos festival during October feast.' },
    { title: 'Talim Island & Mt. Tagapo', text: 'An island in Laguna de Bay shared between Binangonan and Cardona. Mount Tagapo (352m) offers 360-degree views of Metro Manila and Southern Luzon.' },
    { title: 'Pritil Port & Lake Ferries', text: 'The vital lifeline connecting mainland Binangonan to island barangays like Janosa, Subay, and Rayap via colorful motorized wooden bancas.' },
    { title: 'Angono-Binangonan Petroglyphs', text: 'The oldest known artwork in the Philippines located on the boundary of Binangonan, dating back to 3000 BC carved into rock walls.' }
  ]
};
