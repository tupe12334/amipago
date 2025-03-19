# Using the official keycloak image from docker hub
FROM keycloak/keycloak:26.1

USER root
USER keycloak

# Copy custom configuration files
COPY realm-config.json /opt/keycloak/data/import/

# Set the default language to Hebrew
ENV KC_LOCALE_DEFAULT=he

# Build optimization with health enabled
ENV KC_HEALTH_ENABLED=true

# Set admin user from env variables
ENV KEYCLOAK_ADMIN=admin
ENV KEYCLOAK_ADMIN_PASSWORD=admin

# Expose port
EXPOSE 8080

# Start command - import realm on startup and start in development mode
CMD ["start-dev", "--import-realm"]