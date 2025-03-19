# Authentication E2E Tests

This folder contains E2E tests for Firebase Authentication flows.

## Test Scenarios

### Implemented

- Sign Up Flow
  - New user registration
  - Validation errors
  - Success redirect

### Pending Implementation

- Login Flow
  - Existing user login
  - Invalid credentials
  - Success redirect
- Logout Flow
  - Session termination
  - Redirect to login
- Profile Management
  - Change display name
  - Update password
- Account Recovery
  - Password reset flow
  - Email verification

## Test Requirements

- All tests start from root path "/"
- Animations are disabled during testing
- Snapshots are taken after each significant action
- Form inputs use hardcoded test data
- Text searches use Regex
- Tests navigate using UI elements only
- Firebase Authentication calls are intercepted and mocked
  - All network requests to Firebase Auth endpoints are intercepted
  - Test data mimics Firebase Auth responses
  - Mock successful and failed authentication scenarios

## Network Interception

The tests use Playwright's network interception capabilities to mock Firebase Authentication responses. This ensures:

- Consistent test behavior
- No actual Firebase authentication calls
- Ability to test error scenarios
- Isolated test environment

## File Structure

```
auth/
├── login.spec.ts
├── logout.spec.ts
├── signup.spec.ts
└── README.md
```
