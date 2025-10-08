# GitHub Command Center

This document describes the operational framework for building and managing the SUSOS project using GitHub.  It transforms the repository into a project management command centre that supports disciplined development and collaboration.

## Repository naming and topics

The main repository for SUSOS should be named `susos-app` for clarity and discoverability.  The repository metadata (description and GitHub topics) should succinctly describe the project and include relevant labels (e.g., `nlp`, `text-analysis`, `grammar-checker`, `python`, `react`, `spacy`, `redis`).  This ensures the project is easy to find and reduces ambiguity.

## Standard directory structure

To support a full‑stack application, the repository should adopt a monorepo with clearly defined packages.  A `PROJECT_STRUCTURE.md` file can describe the layout, for example:

```
/.github/           – GitHub configuration (workflows, templates)
/docs               – Architectural and operational documentation
/pkg/frontend       – React frontend code
/pkg/backend        – Python FastAPI backend and NLP services
/pkg/rules-engine   – Externalised rule files for the NLP engine
/scripts            – Utility scripts for development and deployment
```

This separation makes it easy to navigate the code base and allows teams to work on different components independently.

## Branching strategy and commit conventions

SUSOS should follow a trunk‑based development model.  All changes are developed on short‑lived feature branches based off `main` and merged back via pull requests.  The `main` branch must always be in a deployable state.

Commit messages should follow the [Conventional Commits](https://www.conventionalcommits.org/) specification: specify a type (e.g., `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`), optional scope, and a description.  This provides clarity in the project history and enables automation such as changelog generation.

## Pull request process

Every change must be merged through a pull request.  Pull requests should be small and focused.  A PR template should prompt contributors to describe their changes, link to related issues, explain how the change was tested, provide screenshots if relevant, and complete developer and reviewer checklists.  Branch protection rules should require at least one review and passing status checks before merging.

## Project roadmap and dashboard

GitHub Projects can be used as a dynamic dashboard for tracking work.  A single project named “SUSOS Product Development” can manage all work items.  Custom fields (issue type, priority, effort points, initiative, target iteration) enable rich filtering and reporting.  Different views support stakeholders at every level:

- **Product roadmap**: a high‑level timeline view of epics grouped by initiative.
- **Engineering backlog**: a table view of tasks sorted by priority for grooming and sprint planning.
- **Current sprint**: a kanban board showing the status of tasks in the current iteration.
- **Team capacity**: a board grouped by assignee with total effort points to visualise workload.

Milestones can be used for release management and to track progress of specific versions.

## Issue templates

The `.github/ISSUE_TEMPLATE` directory should include Issue Forms for bug reports and feature requests.  A bug report template should collect steps to reproduce, expected and actual behaviour, environment details and severity.  A feature request template should capture the problem to solve, proposed solution and alternatives, and identify stakeholders.  These templates ensure that submissions are actionable and reduce back‑and‑forth.

## Automation with GitHub Actions

Automation is critical for efficiency.  CI workflows should run on every push to a feature branch and on pull requests, executing linters, tests, and builds for both the frontend and backend.  A CD workflow can deploy changes to staging on merge to `main` and to production on tagged releases.

Additional workflows can automate project management by updating the status of issues when pull requests are opened or merged.  Scheduled workflows can generate weekly reports on issue closure rates and PR review times, posting them to team communication channels.

---

By adopting the GitHub Command Center framework described here, SUSOS can maintain high code quality, transparent project tracking, and efficient collaboration across teams.
