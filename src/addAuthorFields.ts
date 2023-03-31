import { Config } from 'payload/config';
import { Field, FieldAccess, PayloadRequest } from 'payload/types';

import { PluginConfig } from './PluginConfig';
import { authorHook } from './authorHook';
import {
  DisplayOnlyField,
  getDisplayOnlyField,
} from './DisplayOnlyField/DisplayOnlyField';

const fieldReadAccess: FieldAccess = (args: { req: PayloadRequest }) =>
  Boolean(args.req.user);

const defaultConfig: Required<PluginConfig> = {
  excludedCollections: [],
  excludedGlobals: [],
  createdByFieldName: 'createdBy',
  updatedByFieldName: 'updatedBy',
  createdByLabel: 'Created By',
  updatedByLabel: 'Updated By',
  createdByFieldEditable: false,
  updatedByFieldEditable: false,
  showInSidebar: true,
  fieldAccess: fieldReadAccess,
};

export const addAuthorFields =
  (pluginConfig: PluginConfig = {}) =>
  (config: Config): Config => {
    const mergedConfig: Required<PluginConfig> = Object.assign(
      defaultConfig,
      pluginConfig
    );

    const usersSlug = config.admin?.user;
    if (usersSlug === undefined) {
      throw new Error('[addAuthorFields] admin.user field is undefined');
    }

    if (config.collections !== undefined) {
      config.collections
        .filter((x) => !mergedConfig.excludedCollections.includes(x.slug))
        .forEach((x) => {
          x.hooks = {
            ...x.hooks,
            beforeChange: [
              ...((x.hooks && x.hooks.beforeChange) || []),
              authorHook(mergedConfig.updatedByFieldName, usersSlug),
            ],
          };

          x.fields = [
            ...x.fields,
            createField(
              x.slug,
              mergedConfig.createdByFieldName,
              mergedConfig.createdByLabel,
              mergedConfig.createdByFieldEditable,
              usersSlug,
              mergedConfig
            ),
            createField(
              x.slug,
              mergedConfig.updatedByFieldName,
              mergedConfig.updatedByLabel,
              mergedConfig.updatedByFieldEditable,
              usersSlug,
              mergedConfig
            ),
          ];
        });
    }

    if (config.globals !== undefined) {
      config.globals
        .filter((x) => !mergedConfig.excludedGlobals.includes(x.slug))
        .forEach((x) => {
          x.hooks = {
            ...x.hooks,
            beforeChange: [
              ...((x.hooks && x.hooks.beforeChange) || []),
              authorHook(mergedConfig.updatedByFieldName, usersSlug),
            ],
          };

          x.fields = [
            ...x.fields,
            createField(
              x.slug,
              mergedConfig.createdByFieldName,
              mergedConfig.createdByLabel,
              mergedConfig.createdByFieldEditable,
              usersSlug,
              mergedConfig
            ),
            createField(
              x.slug,
              mergedConfig.updatedByFieldName,
              mergedConfig.updatedByLabel,
              mergedConfig.updatedByFieldEditable,
              usersSlug,
              mergedConfig
            ),
          ];
        });
    }

    return config;
  };

// TODO: Create typed args
const createField = (
  slug: string,
  name: string,
  label: PluginConfig['createdByLabel'] | PluginConfig['updatedByLabel'],
  editable:
    | PluginConfig['createdByFieldEditable']
    | PluginConfig['updatedByFieldEditable'],
  usersSlug: string,
  pluginConfig: PluginConfig
): Field => {
  let fieldLabel: string;
  if ((label as Function).call) {
    fieldLabel = (label as Function).call({}, slug) as string;
  } else {
    fieldLabel = label as string;
  }

  let isEditable: boolean;
  if ((editable as Function).call) {
    isEditable = (editable as Function).call({}, slug) as boolean;
  } else {
    isEditable = editable as boolean;
  }

  return {
    name: name,
    label: fieldLabel,
    type: 'relationship',
    relationTo: [usersSlug],
    defaultValue: (args: any) =>
      args.user
        ? {
            relationTo: usersSlug,
            value: args.user.id,
          }
        : undefined,
    admin: {
      hidden: pluginConfig.showInSidebar ? !pluginConfig.showInSidebar : false,
      readOnly: !isEditable,
      position: 'sidebar',
      components: {
        Field: (props: any) => getDisplayOnlyField({ ...props, pluginConfig }),
      },
    },
    access: {
      read: pluginConfig.fieldAccess,
    },
  };
};
