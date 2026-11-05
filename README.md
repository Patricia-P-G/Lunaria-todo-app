# 🌙 Lunaria - Todo App

Lunaria is a celestial-themed todo app built with **TypeScript** and **Vite**. It extends a TypeScript todo app skeleton with new features, automated tests and a CI/CD pipeline.

**Live app:** https://patricia-p-g.github.io/Lunaria-todo-app/

**GitHub Repository:** https://github.com/Patricia-P-G/Lunaria-todo-app/

## Features

- **Task CRUD**: add, edit (inline with Save and Cancel) and delete tasks
- **Task completion**: mark tasks as completed or active with a checkbox
- **Priority levels**: High, Medium and Low, with color-coded dropdowns
- **Filtering**: show All, Active or Completed tasks, with task counts
- **Priority sorting**: sort tasks from High to Low or Low to High
- **Progress indicator**: shows completed tasks and percentage with a progress bar
- **LocalStorage**: tasks are saved and restored after refreshing the page
- **Input validation**: empty and whitespace-only tasks are rejected
- **Empty states**: helpful messages when no tasks match the selected filter
- **Lunaria UI**: celestial design with a responsive layout for desktop and mobile

## Tech stack

| Tool | Used for |
|---|---|
| TypeScript | Application code |
| Vite | Development server and build |
| TestCafe | End-to-end tests |
| Vitest | Unit tests |
| GitHub Actions | CI/CD pipeline |
| GitHub Pages | Hosting |

## Project structure

```
Lunaria-todo-app/
├── .github/workflows/pipeline.yml   CI/CD pipeline
├── public/                          Logo and favicons
├── src/
│   ├── main.ts                      Form handling and initial render
│   ├── todoUI.ts                    Renders tasks and handles DOM events
│   ├── todoUtils.ts                 Task data logic (add, edit, filter, sort, progress)
│   ├── todoUtils.test.ts            Vitest unit tests
│   ├── types.ts                     Shared TypeScript types
│   └── style.css                    Lunaria theme
├── test/                            TestCafe end-to-end tests, one file per feature
├── index.html
├── vite.config.ts
└── vitest.config.ts
```

## Getting started

```bash
npm install
npm run dev
```

## Testing

### End-to-end tests (TestCafe)

The TestCafe tests run against the built app on the preview server, the same way as in the pipeline.

```bash
npm install -g testcafe
npm run build
npm run preview
```

In a second terminal:

```bash
testcafe chrome test/
```

### Unit tests (Vitest)

```bash
npx vitest run
```

## CI/CD pipeline

The pipeline in `.github/workflows/pipeline.yml` runs automatically on every push to `main`:

1. **Integration**: installs dependencies and builds the app
2. **Delivery**: starts the built app and runs all TestCafe tests against it
3. **Deployment**: publishes the app to GitHub Pages, only if the build and all tests pass

## Development workflow

- **GitHub Issues** for every feature, grouped in the `v1.0` milestone
- **Gitflow** branching with `main`, `develop`, `feature/*` and `release/*` branches
- **Conventional commits**, for example `feat:`, `fix:`, `test:`, `ci:` and `chore:`
- **Pull requests** into `develop` for every feature, reviewed by a classmate before merging
- **Semantic versioning** for releases, starting with `v1.0.0`
