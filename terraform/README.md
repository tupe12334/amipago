# AmiPago Terraform Configuration

This directory contains Terraform configuration for setting up infrastructure required by the AmiPago application.

## Variable Files Organization

The variables are organized into separate files based on sensitivity:

### Non-sensitive Configuration (Tracked in Git)
- `terraform.auto.tfvars`: Contains non-sensitive configuration like application name, 
  callback URLs, and other public configuration values.

### Sensitive Values (Not Tracked in Git)
- `secrets.auto.tfvars`: Contains sensitive information such as API keys, tokens, and secrets.
  This file is listed in `.gitignore` and should never be committed to version control.

## Setup for New Developers

When setting up the project for the first time:

1. Clone the repository
2. Create a `secrets.auto.tfvars` file with the following structure:
   ```hcl
   auth0_client_id     = "your-auth0-client-id"
   auth0_client_secret = "your-auth0-client-secret"
   ```
3. Run `terraform init` to initialize the Terraform providers
4. Run `terraform plan` to validate your configuration
5. Run `terraform apply` to provision the resources

## Security Considerations

- Never commit `secrets.auto.tfvars` to version control
- Consider using a secrets manager for production environments
- For CI/CD pipelines, use environment variables instead of files:
  ```bash
  export TF_VAR_auth0_client_id="your-auth0-client-id"
  export TF_VAR_auth0_client_secret="your-auth0-client-secret"
  ```