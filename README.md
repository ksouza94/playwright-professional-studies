# Playwright Professional Studies

Laboratório local de estudos profissionais de Playwright + TypeScript para QA Automation. A estrutura será ampliada progressivamente durante as aulas.

## Requisitos

- macOS 14 ou superior.
- Node.js LTS 22.x ou 24.x atualizado, com npm.
- Git.

## Instalação

Na pasta do projeto:

```bash
npm ci
npx playwright install chromium firefox webkit
```

## Comandos

| Comando | Finalidade |
| --- | --- |
| `npm test` | Executar o teste em Chromium, Firefox e WebKit, sem janela |
| `npm run test:headed` | Executar com browser visível |
| `npm run test:ui` | Abrir o Playwright UI Mode |
| `npm run test:debug` | Executar em modo de debugging |
| `npm run typecheck` | Verificar TypeScript sem gerar arquivos |
| `npm run report` | Abrir o último relatório HTML |

Há um único teste inicial, executado uma vez por browser, sem depender de sites externos. O relatório HTML é gerado em `playwright-report/`.
