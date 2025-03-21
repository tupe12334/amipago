export const home = "/";
export const createGroupPath = "/create/group";
export const createExpensePath = "/create/expense";
export const createExpenseForGroupPath = "/create/expense/group/:groupId";
export const getCreateExpenseForGroupPath = (groupId: string) =>
  `/create/expense/group/${groupId}`;
export const groupPath = "/group/:groupId";
export const getGroupPath = (groupId: string) => `/group/${groupId}`;
export const onboardingPath = "/onboarding";
export const groupSettingsPath = "/groups/:groupId/settings";
export const getGroupSettingsPath = (groupId: string) =>
  `/groups/${groupId}/settings`;
