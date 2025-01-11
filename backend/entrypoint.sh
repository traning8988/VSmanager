#!/bin/bash
set -e

# Remove a potentially pre-existing server.pid for Rails.
rm -f /app/tmp/pids/server.pid


bundle exec rails db:create || true
bundle exec rails db:migrate || true
bundle exec rails db:seed || true
# Then exec the container's main process (what's set as CMD in the Dockerfile).
exec "$@"