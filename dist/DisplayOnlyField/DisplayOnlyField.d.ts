import React from 'react';
import { TextField } from 'payload/types';
import { PluginConfig } from '../PluginConfig';
type TextFieldWithProps = TextField & {
    path: string;
    label: string;
    pluginConfig: PluginConfig;
};
export declare const DisplayOnlyField: React.FC<(TextFieldWithProps | {}) & {
    pluginConfig: PluginConfig;
}>;
export declare const getDisplayOnlyField: (props: any) => JSX.Element;
export {};
