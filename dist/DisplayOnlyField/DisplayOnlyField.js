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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDisplayOnlyField = exports.DisplayOnlyField = void 0;
var react_1 = __importStar(require("react"));
var react_i18next_1 = require("react-i18next");
var forms_1 = require("payload/components/forms");
var utilities_1 = require("payload/components/utilities");
var DisplayOnlyField = function (props) {
    var _a;
    var _b = props || {}, path = _b.path, label = _b.label, name = _b.name, pluginConfig = _b.pluginConfig;
    var field = (0, forms_1.useField)({
        name: name,
        path: path,
    });
    var value = field.value;
    var config = (0, utilities_1.useConfig)();
    var i18n = (0, react_i18next_1.useTranslation)('fields').i18n;
    var serverURL = config.serverURL, api = config.routes.api, collections = config.collections, admin = config.admin;
    var _c = (0, react_1.useState)({}), user = _c[0], setUser = _c[1];
    (0, react_1.useEffect)(function () {
        var relation = admin.user;
        if (value !== undefined && value.value !== undefined) {
            fetch("".concat(serverURL).concat(api, "/").concat(relation, "?where[_id][equals]=").concat(value.value), {
                credentials: 'include',
                headers: {
                    'Accept-Language': i18n.language,
                },
            })
                .then(function (response) { return response.json(); })
                .then(function (data) {
                if (data.docs && data.docs.length > 0) {
                    setUser(data.docs[0]);
                }
            });
        }
    }, []);
    var userValue = '-';
    if (user !== undefined) {
        var titleKey = (_a = collections.find(function (x) { return x.slug === admin.user; })) === null || _a === void 0 ? void 0 : _a.admin.useAsTitle;
        if (titleKey) {
            userValue = user[titleKey];
        }
    }
    if (!props.pluginConfig.showInSidebar || (!props.pluginConfig.showUndefinedValues && !userValue)) {
        return null;
    }
    return (react_1.default.createElement("div", { className: "field-type relationship display-only" },
        react_1.default.createElement(forms_1.Label, { label: label }),
        react_1.default.createElement("div", null, userValue)));
};
exports.DisplayOnlyField = DisplayOnlyField;
var getDisplayOnlyField = function (props) {
    return react_1.default.createElement(exports.DisplayOnlyField, __assign({}, props));
};
exports.getDisplayOnlyField = getDisplayOnlyField;
//# sourceMappingURL=DisplayOnlyField.js.map