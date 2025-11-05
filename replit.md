# Levqor Backend

## Overview
Levqor is a job orchestration backend API built with Flask, providing AI automation with validation and cost guardrails. The backend handles job intake, status tracking, and provides health monitoring endpoints.

## Purpose
- Job orchestration and workflow management
- JSON schema validation for job requests
- In-memory job storage (ready for database integration)
- Health monitoring and metrics reporting
- Legal documentation and FAQ pages

## Recent Changes
**November 5, 2025**
- Initial setup of Levqor backend
- Created Flask application with all core endpoints
- Configured CORS and security headers for levqor.ai
- Added legal documentation (privacy policy, terms of service, cookie notice)
- Added FAQ page
- Created validation script for endpoint testing
- Configured workflow to run on port 5000
- Fixed deployment health checks with root (/) endpoint
- Switched to Gunicorn production server with 2 workers, 4 threads, 30s timeout
- Added user profile management with SQLite database
- Implemented idempotent email-based user upsert
- Added user lookup, get, and patch endpoints
- **Security Layer Added:**
  - API key authentication for all POST/PATCH routes (X-Api-Key header)
  - Rate limiting: 20 requests/minute per IP, 200 requests/minute global
  - Structured logging with IP and User-Agent tracking
  - Global error handler with exception logging
  - Protected /api/v1/ops/health endpoint
- **Database Optimizations:**
  - SQLite WAL mode enabled for better concurrency
  - Email index for fast user lookups
  - PRAGMA optimizations (journal_mode=WAL, synchronous=NORMAL)
  - Database backup script with WAL-aware copying
- Fixed database path to use SQLITE_PATH (avoiding PostgreSQL DATABASE_URL conflict)

## Project Architecture

### Backend Structure
- `run.py` - Main Flask application with API endpoints
- `requirements.txt` - Python dependencies (Flask 3.0.0, jsonschema 4.22.0, requests 2.32.5, gunicorn 23.0.0)
- `.env.example` - Environment variable template

### Public Pages
- `public/legal/privacy.html` - Privacy policy
- `public/legal/terms.html` - Terms of service
- `public/legal/cookies.html` - Cookie notice
- `public/faq/index.html` - FAQ page

### Scripts
- `scripts/validate_levqor.py` - Endpoint validation script
- `scripts/backup_db.sh` - Database backup script with WAL support

#### Running the Validation Script
The validation script tests all endpoints to ensure they're working correctly:

```bash
# Set the BASE_URL environment variable to your Repl URL
export BASE_URL=https://<your-repl-name>.<your-username>.repl.co

# Run the validation script
python scripts/validate_levqor.py
```

On success, you'll see: `🟢 COCKPIT GREEN — Levqor backend validated`

#### Database Backup
Create consistent backups of the SQLite database:

```bash
# Backup the database
./scripts/backup_db.sh

# Backups are stored in backups/ directory with timestamps
# Format: backups/levqor-YYYY-MM-DD-HHMMSS.db
# Note: Script uses sqlite3 .backup if available, otherwise copies DB + WAL/SHM files
```

### API Endpoints

#### Root & Health
- `GET /` - Root endpoint for deployment health checks
  - Returns: `{"ok": true, "service": "levqor-backend", "version": "1.0.0"}`

- `GET /health` - Health check endpoint
  - Returns: `{"ok": true, "ts": <timestamp>}`
  
- `GET /public/metrics` - Public metrics
  - Returns: `{"uptime_rolling_7d": 99.99, "jobs_today": 0, "audit_coverage": 100, "last_updated": <timestamp>}`

#### Job Management
- `POST /api/v1/intake` - Submit a new job (requires API key)
  - Headers: `X-Api-Key: <your-api-key>`
  - Body: `{"workflow": "string", "payload": {}, "callback_url": "string", "priority": "low|normal|high"}`
  - Returns: `{"job_id": "uuid", "status": "queued"}` (202 Accepted)
  
- `GET /api/v1/status/<job_id>` - Check job status (public)
  - Returns: `{"job_id": "uuid", "status": "queued|running|succeeded|failed", "created_at": <timestamp>, "result": {}, "error": {}}`

#### Development
- `POST /api/v1/_dev/complete/<job_id>` - Simulate job completion (dev only, requires API key)
  - Headers: `X-Api-Key: <your-api-key>`
  - Body: `{"result": {}}`
  - Returns: `{"ok": true}`

#### Operations
- `GET /api/v1/ops/health` - Protected health check endpoint (requires API key)
  - Headers: `X-Api-Key: <your-api-key>`
  - Returns: `{"ok": true, "ts": <timestamp>}`

#### User Management
- `POST /api/v1/users/upsert` - Create or update user by email (idempotent, requires API key)
  - Headers: `X-Api-Key: <your-api-key>`
  - Body: `{"email": "user@example.com", "name": "Name", "locale": "en-GB", "currency": "GBP|USD|EUR", "meta": {}}`
  - Returns: `{"created": true, "user": {...}}` (201) or `{"updated": true, "user": {...}}` (200)
  
- `GET /api/v1/users?email=<email>` - Lookup user by email (public)
  - Returns: User object (200) or `{"error": "not_found"}` (404)
  
- `GET /api/v1/users/<user_id>` - Get user by ID (public)
  - Returns: User object (200) or `{"error": "not_found"}` (404)
  
- `PATCH /api/v1/users/<user_id>` - Update user fields (requires API key)
  - Headers: `X-Api-Key: <your-api-key>`
  - Body: `{"name": "New Name", "locale": "en-US", "currency": "USD", "meta": {"key": "value"}}`
  - Returns: `{"updated": true, "user": {...}}` (200)

### Security & CORS
- **Authentication:**
  - API key-based authentication for all POST/PATCH routes
  - Keys passed via `X-Api-Key` header
  - Development mode: When `API_KEYS` env var not set, all requests allowed
  - Production: Set `API_KEYS` environment variable (comma-separated values)
- **Rate Limiting:**
  - Per-IP burst limit: 20 requests/minute (configurable via `RATE_BURST`)
  - Global limit: 200 requests/minute (configurable via `RATE_GLOBAL`)
  - Returns 429 (Too Many Requests) when limits exceeded
- **Logging:**
  - Structured logging for all requests (method, path, IP, User-Agent)
  - Exception logging with full traceback
  - Log level: INFO
- **CORS:**
  - Configured for `https://levqor.ai`
  - Allowed methods: GET, POST, OPTIONS, PATCH
  - Allowed headers: Content-Type, Authorization, X-Api-Key
- **Security Headers:**
  - X-Content-Type-Options: nosniff
  - X-Frame-Options: DENY
  - Referrer-Policy: strict-origin-when-cross-origin
  - Permissions-Policy: geolocation=(), microphone=()
- **Input Validation:**
  - JSON schema validation for all API requests
  - Global error handler to prevent information leakage

### Current State
- Production server (Gunicorn) running on port 5000 with 2 workers, 4 threads
- In-memory job store (JOBS dictionary)
- SQLite database for user profiles (levqor.db) with WAL mode enabled
- All endpoints operational and tested
- Deployment configured for Autoscale
- Root endpoint (/) available for health checks
- User management with email-based idempotent upsert
- Comprehensive security layer with API key auth and rate limiting
- Structured logging for all requests
- Database backup script for consistent snapshots
- Ready for production database migration (PostgreSQL or Redis)

## Next Phase
- Replace in-memory job store with PostgreSQL or Redis
- Implement real job orchestration queue (Celery, RQ, or similar)
- Implement callback URL notifications for job completion
- Add cost tracking and guardrails enforcement
- Add API key management endpoints (create, revoke, list)
- Implement usage analytics and monitoring
- Deploy to production environment with API_KEYS configured

## User Preferences
None documented yet.
