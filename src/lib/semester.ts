/**
 * Determine the current semester based on a given date.
 * Jan-May = Spring, Jun-Aug = Summer, Sep-Dec = Fall
 */
export function getSemester(date: Date): string {
  const month = date.getMonth() + 1; // 1-12
  if (month >= 1 && month <= 5) return "Spring";
  if (month >= 6 && month <= 8) return "Summer";
  return "Fall";
}

/**
 * Get the full semester label, e.g. "Fall 2026"
 */
export function getSemesterLabel(date: Date): string {
  return `${getSemester(date)} ${date.getFullYear()}`;
}

/**
 * Get academic year string, e.g. "2025-2026"
 */
export function getAcademicYear(date: Date): string {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  if (month >= 9) return `${year}-${year + 1}`;
  return `${year - 1}-${year}`;
}
