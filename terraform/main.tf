terraform {
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~> 4.0"
    }
  }
}

provider "google" {
  project = var.project_id
  region  = var.region
}

# Firebase project
resource "google_firebase_project" "default" {
  provider = google
  project  = var.project_id
}

# Firebase web app
resource "google_firebase_web_app" "default" {
  provider     = google
  project      = var.project_id
  display_name = var.app_name
  depends_on   = [google_firebase_project.default]
}

# Variables
variable "project_id" {
  description = "Google Cloud project ID"
  type        = string
}

variable "region" {
  description = "Default region for resources"
  type        = string
  default     = "us-central1"
}

variable "app_name" {
  description = "Name of the Firebase application"
  type        = string
  default     = "AmiPago Web App"
}

# Outputs
output "firebase_web_app_config" {
  description = "Firebase Web App configuration"
  value       = google_firebase_web_app.default.app_config
  sensitive   = true
}

output "firebase_app_id" {
  description = "Firebase Web App ID"
  value       = google_firebase_web_app.default.app_id
  sensitive   = false
}
