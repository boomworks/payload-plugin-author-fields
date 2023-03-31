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
      // See "Configuration options"
    }),
  ],
  // ...
});
```

#### Configuration options

| Property                        | Description                                                              | Default         |
| ------------------------------- | ------------------------------------------------------------------------ | --------------- |
| `excludedCollections: string[]` | Array of collection slugs to exclude                                     | `[]`            |
| `excludedGlobals: string[]`     | Array of global slugs to exclude                                         | `[]`            |
| `createdByFieldName: string`    | Name of the created by field                                             | `createdBy`     |
| `updatedByFieldName: string`    | Name of the updated by field                                             | `updatedBy`     |
| `createdByLabel: string`        | Label for the created by field                                           | `Created By`    |
| `updatedByLabel: string`        | Label for the updated by field                                           | `Updated By`    |
| `showInSidebar: boolean`        | Show readonly created & updated by fields in sidebar                     | `true`          |
| `fieldAccess: FieldAccess`      | Function that determines read access to the createdBy & updatedBy fields | `Boolean(user)` |

### Contributing

Found a bug or have a feature request? [Open an issue on GitHub](https://github.com/boomworks/payload-plugin-author-fields/issues/new) and we'll look into it.
