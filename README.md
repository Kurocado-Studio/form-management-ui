# Kurocado Studio Tailwind React Template

[![Open in CodeSandbox](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/Kurocado-Studio/styleguide-react-template)

This template is already configured with the
[engineering styleguide](https://kurocado-studio.github.io/styleguide) & is designed to help you go
from "0 to Hello World" in five minutes or less—delivering both speed and quality without
compromise.

### Prerequisites

Before setting up the project, ensure you have the following tools installed:

- If you don't have one, open an account with [Vercel](https://vercel.com)

## Quick Start by deploying to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FKurocado-Studio%2Fstyleguide-react-template&project-name=react-template&repository-name=react-template)

## Have a JetBrains IDE?

Use the [Documentation](https://kurocado-studio.github.io/dev-ops/document.html) pipeline via
[GitHub Pages](https://pages.github.com) using
[Writerside Jetbrains Plugin](https://plugins.jetbrains.com/plugin/20158-writerside)

- Go to Repository Settings
  - Navigate to your GitHub repository.
  - Click on the **Settings** tab.
- **Enable GitHub Pages**
  - Scroll down to the **Pages** section in the left sidebar.
  - Under **Build and deployment**, select **GitHub Actions** as the source.
- Add the workflow to the main `ci.yaml` file, here is an example:

  ```yaml
  name: CI/CD Pipeline

  permissions:
    contents: write
    id-token: write
    pages: write
    pull-requests: write

  jobs:
    document:
      needs: lint
      uses: kurocado-studio/platform/.github/workflows/workflow.document.yml@main
      secrets:
        GH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
      with:
        instance_id: dcs
  ```

- This will enable the [Documentation](https://kurocado-studio.github.io/dev-ops/document.html)
  pipeline

## What's next?

- Need a back-end template? See the
  [NestJS template](https://github.com/Kurocado-Studio/styleguide-nests-template)
- Keep an eye out on
  [@kurocado-studio/auth-zero](https://kurocado-studio.github.io/iam/auth0-by-okta.html), for more
  information, see [the Identity and Access Management page](https://kurocado-studio.github.io/iam).
  It will integrate your app in five minutes or less with [Auth0 by Okta](https://auth0.com/)
