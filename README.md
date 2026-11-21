# Playwright + TypeScript QA Automation Portfolio

[![Playwright Tests](https://github.com/ksouza94/playwright-professional-studies/actions/workflows/playwright.yml/badge.svg)](https://github.com/ksouza94/playwright-professional-studies/actions/workflows/playwright.yml)

A practical automation suite covering browser journeys, API contracts, and network control with Playwright and TypeScript. It shows how to choose test boundaries, reuse setup, investigate failures, and run reliable checks in CI without unnecessary framework layers.

## Repository purpose

This repository demonstrates QA Automation practices relevant to Senior QA roles through runnable scenarios and explicit tradeoffs. SauceDemo is the main UI application; JSONPlaceholder supplies the API exercises. Supplemental Playwright documentation navigation scenarios preserve the original Page Object and fixture exercises.

## Stack

- Playwright Test: Chromium, Firefox, WebKit, APIRequestContext, and routing.
- TypeScript with strict type checking.
- Node.js 22 and npm with a committed lockfile.
- GitHub Actions for pull request checks and failure artifacts.

## What this project demonstrates

- Anonymous home page and valid login checks.
- Reusable authenticated browser state.
- Adding two products, removing one, and checking the remaining cart contents.
- Complete checkout, PDF download, and navigation back to products.
- All four product sorting options with full order assertions.
- API user retrieval and post creation with status and payload assertions.
- A post factory consumed by a fixture with setup and teardown.
- Request interception with `continue`, simulated network failures with `abort`, and mocked success, HTTP 500, and empty-list responses with `fulfill`.
- Page Objects for actions shared by existing tests.
- Browser isolation, smoke/regression selection, and failure diagnostics.

## Structure

```text
.github/workflows/playwright.yml
playwright.config.ts
tests/
├── e2e/                 # SauceDemo journeys and supplemental browser checks
├── api/                 # JSONPlaceholder contracts
├── network/             # JSONPlaceholder requests made by the browser
├── pages/               # ProductsPage and DocumentationPage
├── fixtures/            # API lifecycle and documentation page setup
├── factories/           # Post payload creation
└── auth.setup.ts        # SauceDemo authentication prerequisite
docs/study-examples/    # Preserved course code, excluded from the active suite
```

## Prerequisites

- Node.js 22 with npm (the CI runtime).
- Git and a supported Playwright operating system.
- Internet access to SauceDemo, JSONPlaceholder, and playwright.dev.

SauceDemo credentials in these tests are the public demo account published by the application, not private credentials. Do not substitute production credentials in source files.

## Installation

```bash
npm ci
npx playwright install chromium firefox webkit
```

On Linux, install browser system dependencies as well:

```bash
npx playwright install --with-deps chromium firefox webkit
```

## Running tests

| Command | Scope |
| --- | --- |
| `npm test` | All E2E browsers, API, and network projects |
| `npm run test:smoke` | `@smoke`: home page, login, and checkout on all three browsers |
| `npm run test:regression` | `@smoke` and `@regression`, including API; network has its own command |
| `npm run test:api` | API only, without a browser or SauceDemo authentication |
| `npm run test:network` | Browser network tests on Chromium, without SauceDemo authentication |
| `npm run test:headed` | Suite with visible browser windows |
| `npm run test:ui` | Playwright UI Mode |
| `npm run test:debug` | Playwright Inspector |
| `npm run test:report` | Latest HTML report |
| `npm run typecheck` | Strict TypeScript check without emitted files |

Run one browser or scenario:

```bash
npm test -- --project=chromium
npm test -- tests/e2e/remove-from-cart.spec.ts --project=chromium
npm run test:smoke -- --project=chromium
```

The `BASE_URL` environment variable overrides the SauceDemo target for the E2E projects. Any replacement must expose the same application and demo account contract. API and network projects keep their own JSONPlaceholder base URL.

```bash
BASE_URL=https://www.saucedemo.com npm run test:smoke
```

## Authentication and independence

`auth.setup.ts` logs in and writes `playwright/.auth/user.json`. The three E2E projects declare a dependency on this setup and create a fresh browser context for every test using its `storageState`. The setup is infrastructure, not a dependency on another business scenario.

Tests prepare their own products and never reuse another test's cart. Home and login tests explicitly start with empty storage. API and network projects have no authentication dependency and do not load SauceDemo state. Do not use `--no-deps` for E2E unless you deliberately manage the authentication file yourself.

Authentication state, reports, dependencies, environment files, and local editor settings are ignored by Git. Reports and traces may contain session data; review them before sharing outside trusted CI artifacts.

## Fixtures, factories, and Page Objects

- `ProductsPage` centralizes opening a product, adding it from its detail page, and opening the cart. Direct inventory-list additions remain readable in the removal scenario.
- `DocumentationPage` and its fixture demonstrate injecting a reusable page object for supplemental documentation navigation.
- `createPost()` constructs a small typed payload with optional overrides.
- `testPost` creates the post, checks HTTP 201, yields it to the test, and requests deletion in teardown, checking HTTP 200 even when the test assertion fails.

JSONPlaceholder **simulates writes**: POST and DELETE return representative responses, but do not persist changes. The fixture demonstrates lifecycle handling, not proof of a durable database write or deletion. API tests assert the returned payload and do not perform a subsequent GET for the simulated post.

## Network mocking

`tests/network/` registers routes before issuing browser `fetch` requests. It validates the returned status and JSON independently of real backend response data for the fulfilled routes. `continue` still contacts the real API; `abort` simulates a transport failure.

These scenarios demonstrate browser-level network control. They do not claim to validate SauceDemo error rendering: SauceDemo does not expose a suitable public posts API, so no artificial API integration was added to its UI tests. Network tests still load the JSONPlaceholder origin and need internet access.

## Debugging and failure evidence

The list reporter prints progress; the HTML reporter writes `playwright-report/`. Traces and videos are retained only on failure, and screenshots are captured only on failure, under `test-results/`.

```bash
npm run test:report
npm test -- tests/e2e/cart.spec.ts --project=chromium --debug
npx playwright show-trace path/to/trace.zip
```

For a failed CI run, download `playwright-report` and `test-results` from the Actions run. Open the downloaded report with `npx playwright show-report <report-directory>` or a trace with `show-trace`. Successful local runs do not retain failure evidence.

## Continuous integration

The existing `.github/workflows/playwright.yml` runs on pull requests targeting `main`, pushes to `main`, and manual dispatch. It installs Node.js 22, runs `npm ci` and type checking, installs all three browsers with Linux dependencies, then runs `@smoke`, `@api`, and `@network` in one invocation so one report includes every CI result.

The workflow follows the [official Playwright CI setup](https://playwright.dev/docs/ci). HTML reports and test results are uploaded even after test failures, unless the run is cancelled, and retained for 14 days. There are no path filters. The token has read-only repository permissions and newer runs cancel superseded runs on the same ref.

Locally the suite uses four workers and no retries. CI uses one worker to limit contention on public demo services, one retry for transient failures, `forbidOnly`, and a 15-minute Playwright timeout so reporters have time to finish before the job's 20-minute timeout. Retry results remain visible in the report; a retry does not demonstrate that a flaky test is fixed.

The badge targets `ksouza94/playwright-professional-studies`, using the current project name under the supplied GitHub account. Update both badge URLs if the repository is published under a different name. The badge becomes meaningful after the workflow is pushed and run on GitHub.

## Architectural decisions and intentional simplicity

- Separate Playwright projects define E2E, API, and network boundaries; API does not run repeatedly for each browser.
- Chromium, Firefox, and WebKit cover UI compatibility. Identical `dev` and `hml` project copies were removed; `BASE_URL` handles target selection.
- Stable `data-test` locators and accessible roles keep actions explicit.
- Assertions stay in tests; Page Objects contain shared actions.
- No `LoginPage`, `CheckoutPage`, service layer, custom runner, or generic helper framework was added.
- The post factory has one consumer with a real lifecycle requirement; factory and fixture are separate responsibilities.
- Public demo contracts use deterministic expected values, making failures easy to diagnose.
- No additional npm dependencies were introduced.

## Preserved study material

Original duplicates, raw codegen output, unused helpers, and the deliberate missing-heading failure are retained in `docs/study-examples/`. Its README maps them to the active replacements and explains each move. Archived imports reflect the original paths; those files are reference material and are excluded from test discovery and type checking.

The active suite preserves the useful browser, API, fixture, factory, network, and diagnostic concepts without running an intentionally broken exercise as a portfolio check. External demo services can change or become unavailable; this repository does not control their uptime or application contracts.
