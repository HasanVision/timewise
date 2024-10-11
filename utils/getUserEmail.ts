// utils/emailUtils.ts
export function getUserEmail(user: { primaryEmail: string; secondaryEmail?: string }): string {
    return user.secondaryEmail || user.primaryEmail;
  }