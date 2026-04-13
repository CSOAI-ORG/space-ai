/**
 * space_ai_compliance.ts — Part of @csoai MCP Ecosystem
 * Copyright (c) 2026 Terranova Defence Inc.. All rights reserved.
 * License: CC0-1.0 | Build: 2026-02-26T06:00:00Z
 * LEGAL NOTICE: Advisory only. Not legal or compliance advice.
 */

export interface handleSpaceAiComplianceResult {
  system_name: string;
  risk_classification: string;
  risk_level: string;
  dual_use_assessment: string;
  applicable_regulations: string[];
  itar_ear_determination: string;
  compliance_requirements: string[];
  technical_requirements: string[];
  space_debris_obligations: string[];
  spectrum_requirements: string[];
  remediation: string[];
  casa_tier: string;
}

export function handleSpaceAiCompliance(
  systemName: string,
  aiFunction: string,
  missionType: string,
  dualUseRisk: string,
  jurisdiction: string
): handleSpaceAiComplianceResult {
  const jurLower = jurisdiction.toLowerCase();
  const fnLower = aiFunction.toLowerCase();
  const missionLower = missionType.toLowerCase();
  const dualUseLower = dualUseRisk.toLowerCase();

  let riskClassification = "Standard — Civilian space AI with limited autonomy";
  let riskLevel = "MEDIUM";

  if (dualUseLower.includes("military") || dualUseLower.includes("intelligence")) {
    riskClassification = "CRITICAL — Military/intelligence space system subject to ITAR Category XV";
    riskLevel = "CRITICAL";
  } else if (dualUseLower.includes("dual-use") || dualUseLower.includes("dual use")) {
    riskClassification = "HIGH — Dual-use space tech subject to EAR Category 9 and Wassenaar Arrangement";
    riskLevel = "HIGH";
  } else if (fnLower.includes("autonomous") && (missionLower.includes("proximity") || missionLower.includes("rendezvous"))) {
    riskClassification = "HIGH — Autonomous proximity ops raise collision and weaponization concerns";
    riskLevel = "HIGH";
  } else if (fnLower.includes("debris") || fnLower.includes("active debris removal")) {
    riskClassification = "HIGH — Active debris removal has dual-use potential (ASAT capability)";
    riskLevel = "HIGH";
  } else if (fnLower.includes("earth observation") || fnLower.includes("remote sensing")) {
    riskClassification = "MEDIUM-HIGH — Remote sensing subject to resolution and distribution restrictions";
    riskLevel = "HIGH";
  }

  let dualUseAssessment = "LOW — System appears primarily civilian with minimal dual-use concerns.";
  if (riskLevel === "CRITICAL") {
    dualUseAssessment = "CRITICAL — Explicitly military/intelligence. Full ITAR compliance mandatory. No foreign national access without State Department approval (TAA/MLA). USML Category XV applies.";
  } else if (riskLevel === "HIGH") {
    dualUseAssessment = "HIGH — Dual-use characteristics. Subject to EAR Part 744, Wassenaar Category 9 (Aerospace), and MTCR if propulsion-related. BIS license may be required for export.";
  }

  const regulations: string[] = [];
  regulations.push("UN COPUOS Guidelines — Long-term Sustainability of Outer Space Activities (2019)");
  regulations.push("Outer Space Treaty (1967) — Articles VI/VII: State responsibility and liability");
  regulations.push("Registration Convention (1975) — Mandatory registration with UN OOSA");

  if (jurLower.includes("us") || jurLower.includes("faa")) {
    regulations.push("51 USC 50901-50923 (FAA/AST) — Launch and re-entry licensing");
    regulations.push("15 CFR Part 960 — NOAA remote sensing licensing (Kyl-Bingaman Amendment)");
    regulations.push("47 CFR Part 25 — FCC spectrum licensing for satellite comms");
    regulations.push("ITAR 22 CFR 120-130 — USML Category XV (Spacecraft Systems)");
    regulations.push("EAR 15 CFR Part 774 — CCL Category 9 (Aerospace)");
    regulations.push("SPD-3 (2018) — National Space Traffic Management Policy");
  }
  if (jurLower.includes("eu") || jurLower.includes("euspa")) {
    regulations.push("EU Space Programme Regulation 2021/696 — EUSPA governance");
    regulations.push("EU SST — Conjunction assessment obligations");
    regulations.push("EU AI Act — High-risk for safety-critical autonomous space systems");
    regulations.push("EU Dual-Use Regulation 2021/821 — Space tech export controls");
  }
  if (jurLower.includes("uk") || jurLower.includes("caa")) {
    regulations.push("Space Industry Act 2018 — UK CAA licensing for launch/orbital ops");
    regulations.push("UK Strategic Export Controls — Military/dual-use space licensing");
  }
  if (jurLower.includes("itu")) {
    regulations.push("ITU Radio Regulations — Spectrum coordination, orbital slot filing (Articles 9/11)");
  }

  let itarEar = "NOT ASSESSED — Provide dual-use classification for export control determination.";
  if (dualUseLower.includes("military") || dualUseLower.includes("intelligence")) {
    itarEar = "ITAR CONTROLLED — USML Category XV. Defense article. DDTC license required for ANY foreign disclosure. TAA for foreign national access. No data to PRC/Russia/Iran/DPRK under ANY circumstances.";
  } else if (dualUseLower.includes("dual-use") || dualUseLower.includes("dual use")) {
    itarEar = "EAR CONTROLLED — CCL 9A515 (Spacecraft). BIS license for controlled destinations. STA exception may apply for Wassenaar partners. Deemed export rules for foreign employees (15 CFR 734.13).";
  } else {
    itarEar = "LIKELY EAR99 — Civilian system, no apparent military application. File CJ with DDTC if uncertain.";
  }

  const compliance: string[] = [
    "AI safety assessment for mission-critical autonomy per NASA NPR 7150.2",
    "V&V per ECSS-E-ST-40C or NASA IV&V standards",
    "Software Assurance adapted from DO-178C/ED-12C for space",
    "Ground-commanded override for all autonomous functions (fail-safe to ground)",
    "AI decision logging for post-incident analysis and COPUOS/ITU reporting",
  ];
  if (riskLevel === "CRITICAL" || riskLevel === "HIGH") {
    compliance.push("ITAR/EAR Technology Control Plan (TCP) — restrict controlled data access");
    compliance.push("Facility Security Clearance (FCL) for classified programs");
    compliance.push("FOCI mitigation if applicable");
    compliance.push("Pre-launch conjunction assessment via US 18th SDS or EU SST");
  }
  if (fnLower.includes("constellation") || fnLower.includes("mega")) {
    compliance.push("ITU coordination filing (advance publication, coordination, notification)");
    compliance.push("Debris mitigation per NASA-STD-8719.14 / ISO 24113:2019");
    compliance.push("Post-mission disposal (25yr rule or 5yr accelerated per FCC 2022)");
  }

  const technical: string[] = [
    "Radiation-hardened AI hardware (TID >100 krad GEO, >30 krad LEO)",
    "SEU mitigation for AI model integrity in space radiation environment",
    "Autonomous collision avoidance (<48hr response to conjunction alerts)",
    "TT&C encryption per CCSDS 355.0-B (Space Data Link Security)",
    "AI model update with cryptographic integrity verification (code signing)",
    "Graceful degradation — safe mode fallback on anomalous AI outputs",
  ];
  if (fnLower.includes("earth observation") || fnLower.includes("remote sensing")) {
    technical.push("Resolution controls per Kyl-Bingaman Amendment (1.25m threshold for non-US imaging)");
    technical.push("Shutter control for national security restricted areas");
    technical.push("Distribution restrictions for non-US persons (15 CFR Part 960)");
  }

  const debrisObligations: string[] = [
    "NASA-STD-8719.14C — Process for Limiting Orbital Debris",
    "ISO 24113:2019 — Space debris mitigation (international standard)",
    "IADC Guidelines — Inter-Agency Space Debris Coordination Committee",
    "Post-mission disposal within 25yr (5yr accelerated per FCC 2022)",
    "Passivation of energy sources at end of mission",
    "Casualty risk <1:10,000 for uncontrolled re-entry",
  ];
  if (fnLower.includes("debris") || fnLower.includes("removal")) {
    debrisObligations.push("ADR authorization from launching state required");
    debrisObligations.push("Coordination with debris object owner (consent required)");
    debrisObligations.push("Dual-use assessment — ADR overlaps with ASAT capability");
  }

  const spectrumReqs: string[] = [
    "ITU Radio Regulations — advance publication and coordination (Articles 9/11)",
    "National spectrum license (FCC Part 25, Ofcom, BNetzA)",
    "Interference mitigation plan for adjacent operators",
    "GEO coordination with neighbors at +/-2 degrees longitude",
  ];
  if (missionLower.includes("leo") || fnLower.includes("constellation")) {
    spectrumReqs.push("EPFD limits to protect GEO systems per ITU Article 22");
    spectrumReqs.push("In-line interference assessment for mega-constellation coordination");
  }

  const remediation: string[] = [];
  if (riskLevel === "CRITICAL") {
    remediation.push("URGENT: Obtain ITAR license (DSP-5/DSP-73/TAA) before foreign disclosure");
    remediation.push("Establish ITAR-compliant facility with access controls and TCP");
    remediation.push("Engage DDTC-registered counsel for export compliance");
    remediation.push("CFIUS review if foreign investment involved");
  } else if (riskLevel === "HIGH") {
    remediation.push("File CJ request with DDTC to confirm ITAR vs EAR status");
    remediation.push("Implement deemed export controls for foreign employees");
    remediation.push("Develop ICP per BIS guidelines");
  }
  remediation.push("Register space objects with UN OOSA through national registry");
  remediation.push("Submit debris mitigation plan to licensing authority");
  remediation.push("Maintain conjunction assessment and maneuver coordination");
  remediation.push("Monitor COPUOS and ITU regulatory developments");

  let casaTier = "CASA Tier 1 — Startup ($5K-$25K/yr)";
  if (riskLevel === "CRITICAL") {
    casaTier = "CASA Tier 3 — Enterprise ($75K-$200K/yr) — Required for ITAR space AI";
  } else if (riskLevel === "HIGH") {
    casaTier = "CASA Tier 2 — Professional ($25K-$75K/yr) — Dual-use compliance included";
  }

  return {
    system_name: systemName,
    risk_classification: riskClassification,
    risk_level: riskLevel,
    dual_use_assessment: dualUseAssessment,
    applicable_regulations: regulations,
    itar_ear_determination: itarEar,
    compliance_requirements: compliance,
    technical_requirements: technical,
    space_debris_obligations: debrisObligations,
    spectrum_requirements: spectrumReqs,
    remediation,
    casa_tier: casaTier,
  };
}
