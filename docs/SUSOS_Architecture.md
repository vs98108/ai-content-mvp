# SUSOS Architecture

This document provides a high‑level overview of the architecture defined in the SUSOS research. The goal of SUSOS (Smart Universal Scan and Overlay Service) is to perform real‑time text intelligence at scale and to evolve from a rules‑first system into a neuro‑symbolic hybrid.

## Strategic overview

### Rule‑based vs. ML vs. LLM

The research contrasts three approaches for NLP systems:
* **Rule‑based systems** are deterministic and inexpensive. They use explicit linguistic rules to flag patterns. Projects like LanguageTool show this approach can be fast and transparent. However, rule systems struggle with the nuance and ambiguity of human language.
* **Machine learning systems** train statistical models on large datasets, as used by Grammarly【427531925275706†screenshot】. They can capture nuance but require massive training data and opaque models.
* **LLM‑based systems** use transformer models to achieve state‑of‑the‑art performance, but they are costly to run and can hallucinate.
To balance these trade‑offs, SUSOS proposes a **hybrid, neuro‑symbolic‑ready strategy**. Phase 1 delivers a performant rule‑based engine to get to market quickly. Phase 2 uses the product’s feedback data to fine‑tune proprietary ML models. This phased approach solves the cold‑start problem and builds a data moat.

### Rules Engine design

The core follows the Rules Engine design pattern. Input text is processed against an external set of rules, decoupled from the application code. Each rule identifies a linguistic pattern and suggests a correction. Because rules are loaded from structured files, new rules can be added without redeploying the application. When Phase 2 arrives, a rule can be redefined as a call to a machine‑learning model, enabling a seamless hybrid engine.

## NLP pipeline with spaCy

SUSOS uses [spaCy](https://spacy.io/) as the backbone of the Phase 1 engine. spaCy is fast, production‑ready and modular. Text is processed in batches using `nlp.pipe()` to maximise throughput. The pipeline consists of:
1. **Text ingestion** – the backend receives raw text and streams it through the pipeline.
2. **Tokenization and annotation** – spaCy tokenises the text and applies linguistic features such as part‑of‑speech tags (`token.pos_`), lemmas (`token.lemma_`) and dependency labels. These annotations provide the context needed to write abstract rules.
3. **Two‑pass matching** – The first pass uses `PhraseMatcher` to find exact phrases (product names, forbidden terms). The second pass uses `Matcher` to apply complex grammatical patterns (e.g., passive voice detection).
4. **Callbacks and entity creation** – When a rule matches, a callback creates a span with a label (e.g., `PASSIVE_VOICE`) and attaches metadata such as a suggested rewrite. Rules live in external JSON/YAML files inside `/pkg/rules-engine`.

## Caching and real‑time performance

To provide instant feedback, SUSOS caches analysis results using a multi‑layer design:
* **Content‑based keys** – A key is derived from a SHA‑256 hash of the normalised text block, ensuring identical paragraphs share the same cache entry.
* **Stateful cache values** – Each entry stores the ruleset version, scan timestamp and a list of highlights. This allows clients to detect when cached data is stale.
* **Write‑through cache pattern** – When new text is scanned, the result is written to both Redis and a primary database. A global TTL with LRU eviction manages memory.
* **Version‑aware invalidation** – Clients compare the cached `ruleset_version` with the current version. If they differ, the client discards the cache and re‑analyses. This avoids a costly cache flush whenever rules change and spreads load across users.

## Technology stack

The platform uses an opinionated stack:
* **Frontend** – React for UI and the CSS Custom Highlight API for high‑performance highlighting, with a fallback to `<span>` wrappers for older browsers.
* **Backend** – Python with FastAPI to expose the NLP service; spaCy for language processing.
* **Data tier** – PostgreSQL for persistent storage of analysis results and user data; Redis as the in‑memory cache.
* **Infrastructure** – Docker containers, GitHub Actions for CI/CD and a cloud provider like AWS/GCP/Azure with managed services for PostgreSQL and Redis.

This architecture enables SUSOS to launch quickly with a deterministic rule‑based core while laying the groundwork for hybrid ML models. As users interact with the system, their feedback implicitly labels data, enabling SUSOS to train proprietary models in Phase 2 and transition to a neuro‑symbolic system.
