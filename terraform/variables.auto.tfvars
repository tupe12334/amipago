# Non-sensitive Auth0 configuration
app_name = "AmiPago Web App"
app_callbacks = [
  "http://localhost:1420/callback",
  "http://localhost:1420",
  "https://amipago.example.com/callback"
]
app_logout_urls = [
  "http://localhost:1420",
  "https://amipago.example.com"
]
app_web_origins = [
  "http://localhost:1420",
  "https://amipago.example.com"
]
auth0_domain = "dev-z3tsvqrch74jse2u.us.auth0.com"
