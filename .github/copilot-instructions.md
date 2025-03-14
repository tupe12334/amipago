# Instructions

- The client should be in Hebrew
- Use zod for models and form validations
- If you use a package, import only the relevant imports and not the entire package
- Add descriptive id to every html element, try not using generated ids
- Prefer to work with async/await and not callbacks
- The client use `react-router`
- When ever possible, use external libs

## Docs

- Please add comments only in English
- Don't put comments in tests

## Testing

- Describe testing in English

### E2E

- Use playwright for client e2e testing
- The e2e test should be in an apps/client/e2e folder and not inside src
- Every test start from the root goto("/") path and don't use goto function
- Save snapshot after any meaningful action, make sure the page has been settle down before taking the snapshot

### Unit testing

- Use vitest for unit testing
- When writing util functions, add a spec file to them

## Icons

- Use font-awesome html <i> component with class "fa"

## Acceptability

Make sure that we support acceptability guidelines

- Use aria in english
- Add all the relevant aria fields
- Use conventional aria keys only

## Style

- Use flex
- Use tailwind css class names and not style object
- Don't use pixels as a unit

### Direction

Make sure you use RTL-friendly and LTR-friendly terms
Make sure icons are supported as well
Examples:

- When using style, use start and end, not right and left

### UI

- Work with a container/view ui components model
