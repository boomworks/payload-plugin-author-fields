"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addAuthorFields = void 0;
var authorHook_1 = require("./authorHook");
var DisplayOnlyField_1 = require("./DisplayOnlyField/DisplayOnlyField");
var fieldReadAccess = function (args) {
    return Boolean(args.req.user);
};
var defaultConfig = {
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
    showUndefinedValues: false,
};
var addAuthorFields = function (pluginConfig) {
    if (pluginConfig === void 0) { pluginConfig = {}; }
    return function (config) {
        var _a;
        var mergedConfig = Object.assign(defaultConfig, pluginConfig);
        var usersSlug = (_a = config.admin) === null || _a === void 0 ? void 0 : _a.user;
        if (usersSlug === undefined) {
            throw new Error('[addAuthorFields] admin.user field is undefined');
        }
        if (config.collections !== undefined) {
            config.collections
                .filter(function (x) { return !mergedConfig.excludedCollections.includes(x.slug); })
                .forEach(function (x) {
                x.hooks = __assign(__assign({}, x.hooks), { beforeChange: __spreadArray(__spreadArray([], ((x.hooks && x.hooks.beforeChange) || []), true), [
                        (0, authorHook_1.authorHook)(mergedConfig.updatedByFieldName, usersSlug),
                    ], false) });
                x.fields = __spreadArray(__spreadArray([], x.fields, true), [
                    createField({
                        slug: x.slug,
                        name: mergedConfig.createdByFieldName,
                        label: mergedConfig.createdByLabel,
                        editable: mergedConfig.createdByFieldEditable,
                        usersSlug: usersSlug,
                        pluginConfig: mergedConfig,
                    }),
                    createField({
                        slug: x.slug,
                        name: mergedConfig.updatedByFieldName,
                        label: mergedConfig.updatedByLabel,
                        editable: mergedConfig.updatedByFieldEditable,
                        usersSlug: usersSlug,
                        pluginConfig: mergedConfig,
                    }),
                ], false);
            });
        }
        if (config.globals !== undefined) {
            config.globals
                .filter(function (x) { return !mergedConfig.excludedGlobals.includes(x.slug); })
                .forEach(function (x) {
                x.hooks = __assign(__assign({}, x.hooks), { beforeChange: __spreadArray(__spreadArray([], ((x.hooks && x.hooks.beforeChange) || []), true), [
                        (0, authorHook_1.authorHook)(mergedConfig.updatedByFieldName, usersSlug),
                    ], false) });
                x.fields = __spreadArray(__spreadArray([], x.fields, true), [
                    createField({
                        slug: x.slug,
                        name: mergedConfig.createdByFieldName,
                        label: mergedConfig.createdByLabel,
                        editable: mergedConfig.createdByFieldEditable,
                        usersSlug: usersSlug,
                        pluginConfig: mergedConfig,
                    }),
                    createField({
                        slug: x.slug,
                        name: mergedConfig.updatedByFieldName,
                        label: mergedConfig.updatedByLabel,
                        editable: mergedConfig.updatedByFieldEditable,
                        usersSlug: usersSlug,
                        pluginConfig: mergedConfig,
                    }),
                ], false);
            });
        }
        return config;
    };
};
exports.addAuthorFields = addAuthorFields;
var createField = function (_a) {
    var slug = _a.slug, name = _a.name, label = _a.label, editable = _a.editable, usersSlug = _a.usersSlug, pluginConfig = _a.pluginConfig;
    var fieldLabel;
    if (label.call) {
        fieldLabel = label.call({}, slug);
    }
    else {
        fieldLabel = label;
    }
    var isEditable;
    if (editable.call) {
        isEditable = editable.call({}, slug);
    }
    else {
        isEditable = editable;
    }
    return {
        name: name,
        label: fieldLabel,
        type: 'relationship',
        relationTo: [usersSlug],
        defaultValue: function (args) {
            return args.user
                ? {
                    relationTo: usersSlug,
                    value: args.user.id,
                }
                : undefined;
        },
        admin: {
            hidden: !pluginConfig.showInSidebar,
            readOnly: !isEditable,
            position: 'sidebar',
            components: {
                Field: isEditable
                    ? undefined
                    : function (props) { return (0, DisplayOnlyField_1.getDisplayOnlyField)(__assign(__assign({}, props), { pluginConfig: pluginConfig })); },
            },
            condition: function () {
                return typeof window !== 'undefined' &&
                    !window.location.pathname.includes('create-first-user');
            },
        },
        access: {
            read: pluginConfig.fieldAccess,
        },
    };
};
//# sourceMappingURL=addAuthorFields.js.map