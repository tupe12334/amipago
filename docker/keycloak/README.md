# Keycloak Docker Setup

This directory contains the Docker configuration for running Keycloak, an open-source Identity and Access Management solution.

## Files Overview

- `docker-compose.yml` - Docker Compose configuration for running Keycloak (For local setup)
- `Dockerfile` - Custom Keycloak image configuration
- `realm-config.json` - Keycloak realm configuration file

## Getting Started

1. Start the Keycloak server:

```bash
docker-compose up -d
```

2. Access the Keycloak Admin Console:

- URL: http://localhost:8080
- Default admin credentials can be found in the docker-compose.yml file

## Configuration

The setup includes:

- Basic realm configuration in `realm-config.json`
- Custom Dockerfile for additional configurations
- Environment variables defined in docker-compose.yml

## Themes

The setup uses custom themes configured in `themes-config.json`. Available themes:

- Login theme
- Account theme
- Admin theme
