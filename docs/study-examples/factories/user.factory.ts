export function createTestUser() {
  return {
    email: `qa-${Date.now()}@test.com`,
    role: "customer",
    active: true,
  };
}
