/**
 * SAFEZONE AI - Data Model & Initial Demo Dataset
 * Smart Hazard Mapping & Relocation System
 */

// Configurable Risk Level Thresholds
export const RISK_THRESHOLDS = {
  LOW: { min: 0, max: 25, label: 'LOW', color: '#10b981', badgeClass: 'badge-low', alertLevel: 'info' },
  MEDIUM: { min: 26, max: 50, label: 'MEDIUM', color: '#eab308', badgeClass: 'badge-medium', alertLevel: 'warning' },
  HIGH: { min: 51, max: 75, label: 'HIGH', color: '#f97316', badgeClass: 'badge-high', alertLevel: 'danger' },
  EXTREME: { min: 76, max: 100, label: 'EXTREME', color: '#ef4444', badgeClass: 'badge-extreme', alertLevel: 'critical' }
};

// Reusable Risk Calculator Function
export function calculateRiskScore(factors) {
  const {
    environmental = 50,
    historical = 50,
    geographic = 50,
    population = 50,
    weather = 50,
    infrastructure = 50
  } = factors;

  // Weighted calculation formula
  const weightedScore = (
    (environmental * 0.20) +
    (weather * 0.25) +
    (geographic * 0.15) +
    (population * 0.20) +
    (infrastructure * 0.10) +
    (historical * 0.10)
  );

  const roundedScore = Math.min(100, Math.max(0, Math.round(weightedScore)));

  let level = 'LOW';
  if (roundedScore > RISK_THRESHOLDS.HIGH.min && roundedScore <= RISK_THRESHOLDS.EXTREME.max) {
    level = roundedScore >= RISK_THRESHOLDS.EXTREME.min ? 'EXTREME' : 'HIGH';
  } else if (roundedScore > RISK_THRESHOLDS.MEDIUM.min) {
    level = 'MEDIUM';
  }

  return {
    score: roundedScore,
    level: level,
    details: RISK_THRESHOLDS[level]
  };
}

// Initial Demo Dataset
export const DEMO_DATA = {
  systemStatus: "ONLINE",
  isDemoMode: true,
  lastUpdate: new Date().toLocaleTimeString(),
  activeHazardsCount: 4,

  // Current System / EOC Operations Base Location
  eocLocation: {
    name: "Central EOC Command HQ",
    code: "EOC-ALPHA-HQ",
    lat: 28.6139,
    lng: 77.2090,
    coordinatesText: "28.6139° N, 77.2090° E",
    status: "ACTIVE COMMAND BASE",
    address: "National Emergency Response Sector 1"
  },

  // Danger Zone Vector Connections (High/Extreme Risk -> EOC Base & Safe Shelters)
  dangerConnections: [
    {
      id: "CONN-A-SHELTER1",
      fromZoneId: "ZONE-A",
      fromName: "Riverside Delta (Zone A - EXTREME)",
      toShelterId: "SHELTER-1",
      toName: "Safe Shelter Alpha",
      waypoints: [[28.6217, 77.2047], [28.6280, 77.2100], [28.6350, 77.2150]],
      color: "#ef4444",
      type: "PRIMARY_EVACUATION_VECTOR",
      status: "ACTIVE EMERGENCY DISPATCH"
    },
    {
      id: "CONN-C-SHELTER1",
      fromZoneId: "ZONE-C",
      fromName: "Central Valley (Zone C - HIGH)",
      toShelterId: "SHELTER-1",
      toName: "Safe Shelter Alpha",
      waypoints: [[28.5982, 77.2132], [28.6150, 77.2120], [28.6350, 77.2150]],
      color: "#f97316",
      type: "SECONDARY_EVACUATION_VECTOR",
      status: "MONITORING FLOW"
    },
    {
      id: "CONN-A-EOC",
      fromZoneId: "ZONE-A",
      fromName: "Riverside Delta (Zone A)",
      toShelterId: "EOC-HQ",
      toName: "Central EOC Command HQ",
      waypoints: [[28.6217, 77.2047], [28.6139, 77.2090]],
      color: "#06b6d4",
      type: "TELEMETRY_LINK",
      status: "LIVE DATA FEED"
    }
  ],

  // Zones GIS Data
  zones: [
    {
      id: "ZONE-A",
      name: "Riverside Delta (Zone A)",
      hazard: "Flood",
      coords: [[28.6139, 77.2090], [28.6250, 77.2200], [28.6300, 77.2000], [28.6180, 77.1900]],
      center: [28.6217, 77.2047],
      population: 2500,
      households: 650,
      vulnerabilityScore: 88,
      vulnerabilityLevel: "HIGH",
      priority: "IMMEDIATE",
      rank: 1,
      demographics: {
        children: 450,
        elderly: 320,
        disabled: 85,
        hospitals: 1,
        schools: 3
      },
      factors: {
        environmental: 85,
        historical: 78,
        geographic: 90,
        population: 88,
        weather: 92,
        infrastructure: 82
      },
      assignedShelterId: "SHELTER-1",
      recommendedAction: "Immediate mass evacuation to Safe Shelter Alpha. Deploy rescue boats along riverbank.",
      trend: "increasing"
    },
    {
      id: "ZONE-B",
      name: "Hillside Terrace (Zone B)",
      hazard: "Landslide",
      coords: [[28.6400, 77.2300], [28.6500, 77.2400], [28.6550, 77.2250], [28.6420, 77.2150]],
      center: [28.6467, 77.2275],
      population: 3000,
      households: 780,
      vulnerabilityScore: 65,
      vulnerabilityLevel: "MEDIUM",
      priority: "HIGH",
      rank: 3,
      demographics: {
        children: 520,
        elderly: 290,
        disabled: 60,
        hospitals: 2,
        schools: 4
      },
      factors: {
        environmental: 68,
        historical: 72,
        geographic: 75,
        population: 62,
        weather: 70,
        infrastructure: 55
      },
      assignedShelterId: "SHELTER-2",
      recommendedAction: "Prepare stage-1 evacuation. Monitor soil slope stability sensors.",
      trend: "stable"
    },
    {
      id: "ZONE-C",
      name: "Central Valley (Zone C)",
      hazard: "Extreme Rainfall / Flood",
      coords: [[28.5900, 77.2100], [28.6000, 77.2300], [28.6080, 77.2150], [28.5950, 77.1980]],
      center: [28.5982, 77.2132],
      population: 1800,
      households: 420,
      vulnerabilityScore: 78,
      vulnerabilityLevel: "HIGH",
      priority: "IMMEDIATE",
      rank: 2,
      demographics: {
        children: 310,
        elderly: 240,
        disabled: 45,
        hospitals: 1,
        schools: 2
      },
      factors: {
        environmental: 80,
        historical: 70,
        geographic: 85,
        population: 74,
        weather: 88,
        infrastructure: 70
      },
      assignedShelterId: "SHELTER-1",
      recommendedAction: "High water inflow expected. Dispatch emergency buses to Valley Center.",
      trend: "increasing"
    },
    {
      id: "ZONE-D",
      name: "Coastal Belt North (Zone D)",
      hazard: "Cyclone Risk",
      coords: [[28.5700, 77.2400], [28.5850, 77.2600], [28.5900, 77.2450], [28.5750, 77.2300]],
      center: [28.5800, 77.2438],
      population: 1200,
      households: 310,
      vulnerabilityScore: 47,
      vulnerabilityLevel: "MEDIUM",
      priority: "MEDIUM",
      rank: 4,
      demographics: {
        children: 190,
        elderly: 110,
        disabled: 25,
        hospitals: 0,
        schools: 1
      },
      factors: {
        environmental: 45,
        historical: 50,
        geographic: 52,
        population: 40,
        weather: 48,
        infrastructure: 40
      },
      assignedShelterId: "SHELTER-3",
      recommendedAction: "Issue advisory warning. High tide monitoring active.",
      trend: "decreasing"
    },
    {
      id: "ZONE-E",
      name: "Highland Heights (Zone E)",
      hazard: "Extreme Heat",
      coords: [[28.6500, 77.1800], [28.6650, 77.1950], [28.6700, 77.1800], [28.6580, 77.1700]],
      center: [28.6608, 77.1812],
      population: 900,
      households: 220,
      vulnerabilityScore: 22,
      vulnerabilityLevel: "LOW",
      priority: "LOW",
      rank: 5,
      demographics: {
        children: 110,
        elderly: 95,
        disabled: 12,
        hospitals: 1,
        schools: 1
      },
      factors: {
        environmental: 18,
        historical: 20,
        geographic: 15,
        population: 22,
        weather: 25,
        infrastructure: 10
      },
      assignedShelterId: "SHELTER-4",
      recommendedAction: "Normal operations. Hydration stations deployed.",
      trend: "stable"
    }
  ],

  // Designated Shelters Intelligence Data
  shelters: [
    {
      id: "SHELTER-1",
      name: "Safe Shelter Alpha (Northern Stadium)",
      lat: 28.6350,
      lng: 77.2150,
      distanceKm: 2.1,
      capacity: 1000,
      occupied: 300,
      available: 700,
      accessibility: "EXCELLENT",
      hazardExposure: "LOW",
      facilities: ["Emergency Medical Bay", "Backup Generators", "Helipad", "Water Filtration", "Clean Kitchen"],
      suitabilityScore: 94,
      isRecommended: true,
      recommendationReason: "Recommended because it has high available capacity (700 beds), zero hazard elevation exposure, excellent multi-lane accessibility, and an operational medical bay."
    },
    {
      id: "SHELTER-2",
      name: "Highland Community Dome (Shelter B)",
      lat: 28.6520,
      lng: 77.2050,
      distanceKm: 3.8,
      capacity: 800,
      occupied: 420,
      available: 380,
      accessibility: "GOOD",
      hazardExposure: "VERY LOW",
      facilities: ["Backup Power", "Basic First Aid", "Food Stockpile (7 days)"],
      suitabilityScore: 87,
      isRecommended: false,
      recommendationReason: "High safety score with solid structure, suitable secondary destination for Zone B & C overflow."
    },
    {
      id: "SHELTER-3",
      name: "East Side Civic Center (Shelter C)",
      lat: 28.5820,
      lng: 77.2250,
      distanceKm: 4.5,
      capacity: 500,
      occupied: 380,
      available: 120,
      accessibility: "MODERATE",
      hazardExposure: "MEDIUM",
      facilities: ["Temporary Shelter Tents", "Mobile Sanitation"],
      suitabilityScore: 71,
      isRecommended: false,
      recommendationReason: "Limited remaining capacity (120 beds). Suitable for localized non-extreme relocations."
    },
    {
      id: "SHELTER-4",
      name: "West Hill Secondary Complex",
      lat: 28.6650,
      lng: 77.1720,
      distanceKm: 6.2,
      capacity: 1200,
      occupied: 150,
      available: 1050,
      accessibility: "GOOD",
      hazardExposure: "LOW",
      facilities: ["Medical Wing", "Large Gymnasium", "Solar Grid"],
      suitabilityScore: 89,
      isRecommended: false,
      recommendationReason: "Large capacity hub for western sectors."
    }
  ],

  // Emergency Alerts
  alerts: [
    {
      id: "ALT-101",
      time: "11:15 AM",
      location: "Riverside Delta (Zone A)",
      hazard: "Flash Flood Warning",
      riskLevel: "EXTREME",
      status: "ACTIVE",
      source: "AI Hazard Engine & Hydraulic Sensors",
      message: "River water level exceeded threshold 4.8m. Immediate evacuation recommended for Zone A low-lying sectors."
    },
    {
      id: "ALT-102",
      time: "11:00 AM",
      location: "Central Valley (Zone C)",
      hazard: "Heavy Rainfall Accumulation",
      riskLevel: "HIGH",
      status: "ACTIVE",
      source: "Doppler Weather Radar",
      message: "Precipitation reached 115mm/h. Drain clogging risks detected along Valley Expressway."
    },
    {
      id: "ALT-103",
      time: "10:45 AM",
      location: "Hillside Terrace (Zone B)",
      hazard: "Landslide Susceptibility",
      riskLevel: "HIGH",
      status: "MONITORING",
      source: "Geological Slope Sensors",
      message: "Soil saturation levels at 82%. Geotechnical sensors triggering slope movement advisories."
    },
    {
      id: "ALT-104",
      time: "09:30 AM",
      location: "Coastal Belt North (Zone D)",
      hazard: "High Surge Tide",
      riskLevel: "MEDIUM",
      status: "MONITORING",
      source: "Maritime Buoy Network",
      message: "Wave heights expected +1.8m during peak high tide. Coastal roads restricted to emergency vehicles."
    },
    {
      id: "ALT-105",
      time: "08:15 AM",
      location: "Highland Heights (Zone E)",
      hazard: "Ambient Temperature Spike",
      riskLevel: "LOW",
      status: "RESOLVED",
      source: "Urban Thermal Sensors",
      message: "Heat advisory normalized following cloud cover arrival."
    }
  ],

  // Hazard Incident Timeline
  timeline: [
    { time: "08:00 AM", title: "Heavy Precipitation Commences", desc: "Regional weather radar registers continuous rainfall rate >45mm/hr.", severity: "LOW" },
    { time: "09:15 AM", title: "River Level Surge Detected", desc: "Hydraulic gauge Station-4 records 1.5m rapid elevation increase.", severity: "MEDIUM" },
    { time: "10:00 AM", title: "AI Pattern Match Triggered", desc: "ML Engine identifies 87% similarity with 2019 severe flood disaster vector.", severity: "HIGH" },
    { time: "10:30 AM", title: "Zone A Risk Upgraded to HIGH", desc: "Multi-factor risk score crosses 72/100. Automated advisories issued.", severity: "HIGH" },
    { time: "11:00 AM", title: "Zone A Risk Upgraded to EXTREME", desc: "Risk score reaches 90/100. Soil saturation 94%, water discharge peaking.", severity: "EXTREME" },
    { time: "11:15 AM", title: "Rescue Priority Engine Activated", desc: "Zone A designated as #1 Immediate Rescue Priority. Safe Shelter Alpha assigned.", severity: "EXTREME" }
  ],

  // Evacuation Routes
  evacuationRoutes: {
    "ZONE-A": {
      from: "Zone A (Riverside)",
      to: "Safe Shelter Alpha",
      distanceKm: 2.1,
      estimatedTimeMins: 8,
      routeCondition: "CLEAR - Primary Arterial Highway North",
      riskAlongRoute: "LOW (Elevated Overpass)",
      capacity: "1,200 Vehicles/hour",
      waypoints: [
        [28.6217, 77.2047],
        [28.6280, 77.2100],
        [28.6350, 77.2150]
      ]
    },
    "ZONE-C": {
      from: "Zone C (Central Valley)",
      to: "Safe Shelter Alpha",
      distanceKm: 4.2,
      estimatedTimeMins: 14,
      routeCondition: "CAUTION - Minor Water Accumulation near Exit 4",
      riskAlongRoute: "MODERATE",
      capacity: "800 Vehicles/hour",
      waypoints: [
        [28.5982, 77.2132],
        [28.6150, 77.2120],
        [28.6350, 77.2150]
      ]
    }
  }
};
