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

  /** Show readonly created & updated by fields in sidebar, default: `true` */
  showInSidebar?: boolean;

  /** Function that determines read access to the createdBy & updatedBy fields
   * @example
   * fieldAccess: ({ req: { user } }) => user.isAdmin
   */
  fieldAccess?: FieldAccess;
}
