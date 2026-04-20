# GitHub Analytics

<div align="center">

![React](https://img.shields.io/badge/-React_19-61DAFB?logo=react&logoColor=white&style=for-the-badge)
![TypeScript](https://img.shields.io/badge/-TypeScript-3178C6?logo=typescript&logoColor=white&style=for-the-badge)
![SCSS](https://img.shields.io/badge/-SCSS-CC6699?logo=sass&logoColor=white&style=for-the-badge)
![TanStack Query](https://img.shields.io/badge/-TanStack_Query-FF4154?logo=react-query&logoColor=white&style=for-the-badge)
![Zustand](https://img.shields.io/badge/-Zustand-000000?logo=zustand&logoColor=white&style=for-the-badge)

Explore and compare GitHub developer profiles — repositories, top languages and activity charts.

</div>

## Features

- **User profile** — avatar, location, followers and repository list
- **Repository activity chart** — cumulative growth over time powered by Recharts
- **Top languages** — ranked by number of repositories
- **Compare two users** — side by side stats and chart
- **PDF export** — download single user stats as a PDF
- **Dark / light theme** — persisted across sessions

## Tech Stack

| Category | Technology |
|---|---|
| UI | React 19, TypeScript |
| Styling | SCSS Modules |
| Data fetching | TanStack Query v5 |
| State | Zustand v5 |
| Routing | React Router v7 |
| Charts | Recharts |
| Build | Vite |
| Testing | Vitest, React Testing Library |

## Quick Start

```bash
# Clone
git clone https://github.com/chupikx228/ghAnalysis.git
cd ghAnalysis

# Install
npm install

# Add GitHub token to .env (optional, increases rate limit)
VITE_GITHUB_TOKEN=your_token_here

# Run
npm run dev
```

## Project Structure

```
src/
├── components/       # UI components
│   ├── UserCard/
│   ├── RepoActivityChart/
│   ├── TopLanguages/
│   ├── AboutUser/
│   ├── UserCompareForm/
│   └── ThemeToggle/
├── pages/            # Route pages
│   ├── HomePage/
│   ├── AboutUserPage/
│   └── UserComparePage/
├── hooks/            # Custom hooks
│   ├── useGithubUser.ts
│   ├── useGithubRepos.ts
│   ├── useTopLanguages.ts
│   └── useExportPDF.ts
├── store/            # Zustand stores
│   ├── useThemeStore.ts
│   └── useCompareStore.ts
└── utils/
    └── pdfHelper.ts
```

## Tests

```bash
npm run test
```

---

<div align="center">


[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/chupikx228)

</div>
