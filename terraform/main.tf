terraform {
  required_providers {
    auth0 = {
      source  = "auth0/auth0"
      version = "~> 0.45.0"
    }
  }
}

provider "auth0" {
  domain        = var.auth0_domain
  client_id     = var.auth0_client_id
  client_secret = var.auth0_client_secret
}

# Auth0 Regular Web Application
resource "auth0_client" "web_app" {
  name                       = var.app_name
  description                = "Regular Web Application for ${var.app_name}"
  app_type                   = "regular_web"
  is_first_party             = true
  callbacks                  = var.app_callbacks
  allowed_logout_urls        = var.app_logout_urls
  web_origins                = var.app_web_origins
  grant_types                = ["authorization_code", "refresh_token"]
  token_endpoint_auth_method = "client_secret_post"
  refresh_token {
    rotation_type       = "rotating"
    expiration_type     = "expiring"
    leeway              = 0
    token_lifetime      = 2592000
    idle_token_lifetime = 1296000
  }
  jwt_configuration {
    alg = "RS256"
  }
  oidc_conformant = true
}

# Sensitive variables - defined in terraform.tfvars (gitignored)
variable "auth0_domain" {
  description = "Auth0 domain for the tenant"
  type        = string
  sensitive   = false
}

variable "auth0_client_id" {
  description = "Client ID for Auth0 Management API (M2M application)"
  type        = string
  sensitive   = true
}

variable "auth0_client_secret" {
  description = "Client Secret for Auth0 Management API (M2M application)"
  type        = string
  sensitive   = true
}

# Non-sensitive variables - defined in variables.auto.tfvars
variable "app_name" {
  description = "Name of the Auth0 application"
  type        = string
  default     = "AmiPago Web App"
}

variable "app_callbacks" {
  description = "List of allowed callback URLs for the application"
  type        = list(string)
  default     = ["http://localhost:5173/callback", "http://localhost:5173"]
}

variable "app_logout_urls" {
  description = "List of allowed logout URLs for the application"
  type        = list(string)
  default     = ["http://localhost:5173"]
}

variable "app_web_origins" {
  description = "List of allowed web origins for the application"
  type        = list(string)
  default     = ["http://localhost:5173"]
}

# Output the client ID and secret for use in the application
output "auth0_web_client_id" {
  description = "Client ID for the Auth0 application"
  value       = auth0_client.web_app.client_id
  sensitive   = false
}

output "auth0_web_client_secret" {
  description = "Client secret for the Auth0 application"
  value       = auth0_client.web_app.client_secret
  sensitive   = true
}
