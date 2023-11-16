import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { TextField } from 'payload/types';
import { Label, useField } from 'payload/components/forms';
import { useConfig } from 'payload/components/utilities';
import {
  FieldType,
  Options,
} from 'payload/dist/admin/components/forms/useField/types';

import { PluginConfig } from '../PluginConfig';

type TextFieldWithProps = TextField & {
  path: string;
  label: string;
  pluginConfig: PluginConfig;
};

export const DisplayOnlyField: React.FC<
  (TextFieldWithProps | {}) & {
    pluginConfig: PluginConfig;
  }
> = (props) => {
  const { path, label, name, pluginConfig } =
    (props as TextFieldWithProps) || {};

  const field: FieldType<{ relationTo: string; value: string }> = useField({
    name,
    path,
  } as Options);

  const { value } = field;

  const config = useConfig();
  const { i18n } = useTranslation('fields');

  const {
    serverURL,
    routes: { api },
    collections,
    admin,
  } = config;

  const [user, setUser] = useState<any>({});

  useEffect(() => {
    const relation = admin.user;

    console.log('DisplayOnlyField');
    console.log(user);

    if (value !== undefined && value.value !== undefined) {
      fetch(
        `${serverURL}${api}/${relation}?where[_id][equals]=${value.value}`,
        {
          credentials: 'include',
          headers: {
            'Accept-Language': i18n.language,
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.docs && data.docs.length > 0) {
            setUser(data.docs[0]);
          }
        });
    }
  }, []);

  let userValue = '-';
  if (user !== undefined) {
    const titleKey = collections.find((x) => x.slug === admin.user)?.admin
      .useAsTitle;
    if (titleKey && user[titleKey]) {
      userValue = user[titleKey];
    }
  }

  if (!props.pluginConfig.showUndefinedValues && !userValue) {
    return null;
  }

  return (
    <div className="field-type relationship display-only">
      <Label label={label} />
      <div>{userValue}</div>
    </div>
  );
};

export const getDisplayOnlyField = (props: any) => {
  if (props.existingDefault === 'choose') {
    return undefined;
  }
  return <DisplayOnlyField {...props} />;
};
