# Release process

## Beta

```sh
npm version prerelease --preid=next
npm run build
npm publish --access public --tag next
```

## Production

Create new release in git-flow

Bump version in `package.json`

Push/merge to `main` branch will trigger CI/CD workflow, which publishes `@boomworks/payload-plugin-author-fields@VERSION` & creates a GitHub release
