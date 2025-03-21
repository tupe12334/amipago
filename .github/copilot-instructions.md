# Instructions

- Always read the README.md file of a folder
- The client should be in Hebrew
- Use zod for models and form validations
- If you use a package, import only the relevant imports and not the entire package
- Add descriptive id and classes to every html element, try not using generated ids
- Prefer to work with async/await and not callbacks
- The client use `react-router`
- When ever possible, use external libs
- Don't put comments that describe what have you done
- Don't use `export default`
- Don't fix my TODO comments

## Docs

- Please add comments only in English
- Don't put comments in tests

## Testing

- Describe testing in English

### E2E

- Use playwright for client e2e testing
- The e2e test should be in an apps/client/e2e folder and not inside src
- Every test start from the root goto("/") path and navigate the app only using the UI
- Save snapshot after any meaningful action, make sure the page has been settle down before taking the snapshot
- Don't custom name snapshots
- Disable animation in E2E testing using await page.screenshot({ animations: "disabled" }) and don't use the path parameter
- Add numbering by order to the snapshots
- When searching for a text, always use the Regex option
- When edit form test, please add hard coded dates

### Unit testing

- Use vitest for unit testing
- When writing util functions, add a spec file to them

## Icons

- Use font-awesome html <i> component with class "fa"
- Don't use MUI icons

## Acceptability

Make sure that we support acceptability guidelines

- Use aria in english
- Add all the relevant aria fields
- Use conventional aria keys only

## Style

- Use flex
- Use MUI components
- Don't use pixels as a unit
- Try to minimize your use of custom styling

### Direction

Make sure you use RTL-friendly and LTR-friendly terms
Make sure icons are supported as well
Examples:

- When using style, use start and end, not right and left

### UI

- Work with a container/view ui components model
- When a component need to load data, make sure the loading is happening in the container component
- Implement code-splitting with React.lazy and Suspense
- Use windowing for long lists (react-window)
- Use the classnames lib
