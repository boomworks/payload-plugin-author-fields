import { FieldAccess } from 'payload/types';

export interface PluginConfig {
  /** Array of collection slugs to exclude */
  excludedCollections?: string[];

  /** Array of global slugs to exclude */
  excludedGlobals?: string[];

  /** Name of the created by field, default: `createdBy` */
  createdByFieldName?: string;

  /** Name of the updated by field, default: `updatedBy` */
  updatedByFieldName?: string;

  /** Label for the created by field, default: `Created By` */
  createdByLabel?: string | ((slug: string, defaultLabel: string) => string);

  /** Label for the updated by field, default: `Updated By` */
  updatedByLabel?: string | ((slug: string, defaultLabel: string) => string);

  /** Whether the created by field is editable, default: false */
  createdByFieldEditable?: boolean | ((slug: string) => boolean);

  /** Whether the updated by field is editable, default: false */
  updatedByFieldEditable?: boolean | ((slug: string) => boolean);

  /** Show readonly created & updated by fields in sidebar, default: `true` */
  showInSidebar?: boolean;

  /** Function that determines read access to the createdBy & updatedBy fields
   * @example
   * fieldAccess: ({ req: { user } }) => user.isAdmin
   */
  fieldAccess?: FieldAccess;
}
