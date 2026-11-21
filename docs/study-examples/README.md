# Preserved course exercises

These original files are preserved for reference and are outside Playwright's `testDir` and the TypeScript compilation scope. They are not a second runnable suite; their original imports reflect their previous locations.

| Original exercise | Portfolio replacement / reason for archiving |
| --- | --- |
| `api-users.spec.ts` | `tests/api/users.spec.ts` uses JSONPlaceholder instead of the unrelated ReqRes service; post creation is covered by `tests/api/posts.spec.ts`. |
| `products.spec.ts` | Documentation navigation is in `tests/e2e/documentation.spec.ts`; the duplicated post assertion is in the dedicated API suite. |
| `first-real-test.spec.ts` | Installation navigation is already covered by the documentation fixture scenario. |
| `network.spec.ts` | Useful interception, abort, 500, empty list, and mocking cases are in `tests/network/`. The intentionally failing missing-heading exercise is kept here only. |
| `e2e/recording.spec.ts` | Raw codegen exploration with incidental clicks and no assertions. Cart, removal, checkout, download, and return-to-products behavior are asserted in the active E2E suite. |
| `test-factory.spec.ts`, `fixtures/user.fixture.ts`, `factories/user.factory.ts` | The original test only logged an unused user. The active post factory now supplies data to the API fixture and its assertions. |
| `helpers/navigation.ts` | Unused duplicate of the documentation Page Object action. |

No course evidence was deleted. Do not move these files back into `tests/` without reviewing the duplicate scenarios and the deliberate failure.
