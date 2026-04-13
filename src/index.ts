/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * @csoai/space-ai
 * ═══════════════════════════════════════════════════════════════════════════════
 *
 * Copyright (c) 2026 Terranova Defence Inc.. All rights reserved.
 * Part of the CSGA Global MCP Ecosystem.
 *
 * LEGAL NOTICE: This software is provided for informational and advisory
 * purposes only. It does not constitute legal, regulatory, or professional
 * compliance advice. Users should consult qualified legal counsel for
 * jurisdiction-specific compliance requirements.
 *
 * License: CC0-1.0 (Creative Commons Zero v1.0 Universal)
 * SPDX-License-Identifier: CC0-1.0
 *
 * Build Timestamp: 2026-02-26T06:00:00Z
 * Last Modified:   2026-02-26T06:00:00Z
 * ═══════════════════════════════════════════════════════════════════════════════
 */

import { z } from "zod";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { handleSpaceAiCompliance } from "./tools/space-ai-compliance.js";

const server = new McpServer({
  name: "csoai-space-ai-mcp",
  version: "1.0.0"
});

// Schemas extracted to avoid TS2589 deep instantiation
const SpaceAiComplianceShape = {
  system_name: z.string().describe("Name of space AI system"),
  ai_function: z.string().describe("Function (autonomous navigation, debris tracking, constellation management, Earth observation, launch safety)"),
  mission_type: z.string().describe("Mission type (LEO, GEO, deep space, launch, re-entry, proximity ops)"),
  dual_use_risk: z.string().describe("Dual-use potential (civilian only, dual-use, military, intelligence)"),
  jurisdiction: z.string().describe("Operating jurisdiction (US/FAA-AST, EU/EUSPA, UK/CAA, ITU, COPUOS)"),
};

// ─── Tool 1: space_ai_compliance ───
(server.tool as any)(
  "space_ai_compliance",
  "Assess compliance for AI in space operations. Covers autonomous navigation, debris avoidance, spectrum management, and dual-use restrictions.",
  SpaceAiComplianceShape,
  async (args: any) => {
    const result = handleSpaceAiCompliance(args.system_name, args.ai_function, args.mission_type, args.dual_use_risk, args.jurisdiction);
    return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
  }
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch(console.error);
