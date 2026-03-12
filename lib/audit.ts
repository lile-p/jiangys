import type { AuditRecord } from "./types"
const mem: AuditRecord[] = []
export function addAudit(r: AuditRecord) { mem.unshift(r) }
export function getAudits() { return mem.slice(0, 200) }
