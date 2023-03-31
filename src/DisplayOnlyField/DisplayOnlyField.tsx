import React from 'react';
import {
  FieldType,
  Options,
} from 'payload/dist/admin/components/forms/useField/types';
import { useField, useAllFormFields } from 'payload/components/forms';

import { PluginConfig } from '../PluginConfig';
import { TextField } from 'payload/types';

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

  const field: FieldType<string> = useField({
    label,
    name,
    path,
  } as Options);

  const { value, setValue, showError } = field;

  return (
    <div className="display-only">
      <strong>{label}:</strong>
      <br />
      {value}
    </div>
  );
};

export const getDisplayOnlyField = (props: any) => {
  // return <pre>{JSON.stringify(props, null, 4)}</pre>;
  return <DisplayOnlyField {...props}></DisplayOnlyField>;
};
