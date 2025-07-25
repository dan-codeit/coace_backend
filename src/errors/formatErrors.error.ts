import { ZodError } from "zod";

export function formatZodErrors(error: ZodError): Record<string, string[]> {
  return error.issues.reduce((acc, issue) => {
    const fieldName = issue.path[0];
    const key = typeof fieldName === "string" ? fieldName : "_errors";
    if (!acc[key]) acc[key] = [];
    acc[key].push(issue.message);
    return acc;
  }, {} as Record<string, string[]>);
}
