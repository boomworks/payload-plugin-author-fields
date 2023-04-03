# Payload CMS Author Fields plugin

Payload CMS plugin to add created & updated by fields

## What?

Will automatically add `createdBy` and `updatedBy` fields to all globals & collections in your app.

## Why?

- Audit trail of who created & modified things
- Use it as the basis for a publishing approval workflow

## How?

### Installation

```sh
npm install @boomworks/payload-plugin-author-fields
```

### Usage

In your `payload.config.ts`:

```typescript
export default buildConfig({
  // ...
  plugins: [
    addAuthorFields({
      // See "Configuration"
    }),
  ],
  // ...
});
```

#### Configuration

See [`PluginConfig`](./src/PluginConfig.ts) for all configuration options.

The [`demo`](./demo/) directory contains a Payload app showing [a few examples](./demo/src/payload.config.ts#L13), including customising labels & i18n.

### Contributing

Found a bug or have a feature request? [Open an issue on GitHub](https://github.com/boomworks/payload-plugin-author-fields/issues/new) and we'll look into it.
