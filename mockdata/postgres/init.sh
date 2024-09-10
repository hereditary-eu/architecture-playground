#!/bin/bash


# === SETUP SCRIPT ===
# This script provides a way to automatically setup the
# mock database on first run. Be sure to chmod +x the
# script and to mount this folder inside docker as:
#  - ./this-folder:/docker-entrypoint-initdb.d

set -e
echo "Setting up the mock database..."
pg_restore -U $POSTGRES_USER -d $POSTGRES_DB /docker-entrypoint-initdb.d/dvdrental.tar
echo "Database initialized successfully!"
