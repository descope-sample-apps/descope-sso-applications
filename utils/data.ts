export const frameworks = ["okta", "azure", "ping", "duo", "google"] as const;

export type Framework = (typeof frameworks)[number];
