# Project Structure

This document describes the proposed monorepo structure for the SUSOS platform.

## Top-level layout

The repository is organised into a small number of top-level directories:

| Path | Description |
| --- | --- |
| `.github/` | GitHub configuration, including workflows, issue and pull request templates. |
| `docs/` | Documentation for architecture, project management and usage. |
| `pkg/frontend` | Source code for the React-based frontend. |
| `pkg/backend` | Source code for the Python FastAPI backend and spaCy NLP services. |
| `pkg/rules-engine` | External rule definitions for the NLP engine (JSON/YAML). |
| `scripts/` | Utility scripts to set up or deploy the project. |
| `auto_setup_complete.sh` | Script to scaffold the MVP and extension (for demonstration). |
| `final_summary.md` | Summary of the AI Content Detector MVP. |
| `real_mvp_extension.js` | Combined script for the AI detector MVP. |

Each package inside `pkg/` is self-contained and can be developed and tested independently.  The monorepo design simplifies dependency management and cross-component refactoring.

## Suggested naming conventions

- Use lower-case and hyphenated names for directories and files (e.g., `rules-engine`, `api-client.ts`).
- Keep module names descriptive and consistent across the frontend and backend.
- Document new directories and scripts in this file to maintain clarity.

## Files at root

The root-level files such as `auto_setup_complete.sh`, `final_summary.md`, and `real_mvp_extension.js` originate from the AI content detector MVP.  They can be archived or integrated into the `scripts/` directory as the project evolves.

---

Maintaining a consistent and documented project structure improves onboarding, reduces confusion, and allows teams to work concurrently on different parts of the code base.
