#!/bin/bash
cd "$(dirname "$0")"
npm install -D @playwright/test
npx playwright test tests/e2e/admin-complete.spec.ts --reporter=line --reporter=html
