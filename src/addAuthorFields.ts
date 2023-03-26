import { Config } from 'payload/config';
import { Field, FieldAccess, PayloadRequest } from 'payload/types';

import { PluginConfig } from './PluginConfig';
import { authorHook } from './authorHook';

const fieldReadAccess: FieldAccess = (args: { req: PayloadRequest }) =>
  Boolean(args.req.user);

const defaultConfig: Required<PluginConfig> = {
  excludedCollections: [],
  excludedGlobals: [],
  createdByFieldName: 'createdBy',
  updatedByFieldName: 'updatedBy',
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
            afterChange: [
              ...((x.hooks && x.hooks.afterChange) || []),
              authorHook(mergedConfig.updatedByFieldName, usersSlug),
            ],
          };

          x.fields = [
            ...x.fields,
            createField(
              mergedConfig.createdByFieldName,
              usersSlug,
              mergedConfig
            ),
            createField(
              mergedConfig.updatedByFieldName,
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
            afterChange: [
              ...((x.hooks && x.hooks.afterChange) || []),
              authorHook(mergedConfig.updatedByFieldName, usersSlug),
            ],
          };

          x.fields = [
            ...x.fields,
            createField(
              mergedConfig.createdByFieldName,
              usersSlug,
              mergedConfig
            ),
            createField(
              mergedConfig.updatedByFieldName,
              usersSlug,
              mergedConfig
            ),
          ];
        });
    }

    return config;
  };

const createField = (
  name: string,
  usersSlug: string,
  pluginConfig: PluginConfig
): Field => {
  return {
    name: name,
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
      readOnly: true,
      position: 'sidebar',
    },
    access: {
      read: pluginConfig.fieldAccess,
    },
  };
};
