# AngularVite

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.3.8.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Deployment to AWS Amplify

This project includes an `amplify.yml` configuration file for AWS Amplify deployment.

### Setup Steps

1. **Build Configuration**: The `amplify.yml` file is already configured with:

   - Build commands: `npm ci` → `npm run build`
   - Output directory: `dist/angular-vite/browser`
   - Caching for `node_modules`

2. **Redirect Rules** (Important for Angular Routing):

   After deploying to AWS Amplify, you **must** configure redirect rules in the Amplify Console for client-side routing to work:

   - Go to your Amplify app in the AWS Console
   - Navigate to **App settings** → **Rewrites and redirects**
   - Add a redirect rule:
     - **Source**: `/<*>`
     - **Target**: `/index.html`
     - **Type**: `200 (Rewrite)`

   This ensures all routes (like `/theme-demo`, `/button-demo`) are handled by Angular's client-side router.

### Build Output

The build outputs to `dist/angular-vite/browser/` with:

- Production-optimized bundles
- Hashed filenames for caching
- Static assets from `public/` directory

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
