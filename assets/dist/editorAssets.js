/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./assets/src/editorAssets/common/Llm.ts":
/*!***********************************************!*\
  !*** ./assets/src/editorAssets/common/Llm.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class Llm {
    constructor(systemPrompt) {
        this.messages = [];
        this.prompt = async (text) => {
            if (!ai) {
                throw new Error('The Prompt API is not available');
            }
            if (!this.session) {
                this.session = await ai.languageModel.create({
                    systemPrompt: this.systemPrompt,
                });
                this.messages = [
                    {
                        content: this.systemPrompt,
                        role: 'system',
                    },
                ];
            }
            this.messages = [
                ...this.messages,
                {
                    content: text,
                    role: 'user',
                },
            ];
            const answer = await this.session.prompt(text);
            this.messages = [
                ...this.messages,
                {
                    content: answer,
                    role: 'assistant',
                },
            ];
            return answer;
        };
        this.systemPrompt = systemPrompt;
    }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Llm);


/***/ }),

/***/ "./assets/src/editorAssets/plugins/TitleSuggestion.tsx":
/*!*************************************************************!*\
  !*** ./assets/src/editorAssets/plugins/TitleSuggestion.tsx ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_plugins__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/plugins */ "@wordpress/plugins");
/* harmony import */ var _wordpress_plugins__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_plugins__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_edit_post__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/edit-post */ "@wordpress/edit-post");
/* harmony import */ var _wordpress_edit_post__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_edit_post__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _common_Llm__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../common/Llm */ "./assets/src/editorAssets/common/Llm.ts");




const { Button, ButtonGroup } = wp.components;
const AITitleSuggestion = () => {
    const [titles, setTitles] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useState)([]);
    const [loading, setLoading] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useState)(false);
    return (wp.element.createElement(_wordpress_edit_post__WEBPACK_IMPORTED_MODULE_1__.PluginDocumentSettingPanel, { name: "wpaia-title-suggestion", title: "AI Assistant" },
        wp.element.createElement(ButtonGroup, { style: { width: '100%' } },
            wp.element.createElement(Button, { style: { width: '100%' }, disabled: loading, onClick: async () => {
                    setTitles([]);
                    setLoading(true);
                    try {
                        const content = wp.data
                            .select('core/editor')
                            .getCurrentPost()
                            .content.replace(/<!--.*?-->/gs, '');
                        console.log(content);
                        const llm = new _common_Llm__WEBPACK_IMPORTED_MODULE_3__["default"]('You are a helpful AI assistant that gives 5 suggestions for titles based on the content of a blog. Always return only the titles separated by a new line.');
                        const response = await llm.prompt('Blogpost:\n\n' + content);
                        console.log(response);
                        const suggestions = response.split('\n').filter(Boolean);
                        console.log(suggestions);
                        setTitles(suggestions);
                        setLoading(false);
                    }
                    catch (e) {
                        console.error(e);
                        alert('Error parsing response');
                        setLoading(false);
                    }
                } }, loading ? 'generating...' : 'Generate Title suggestions')),
        wp.element.createElement("ul", { style: { marginTop: '1em' } }, titles.map((title) => (wp.element.createElement("li", { style: {
                borderTop: '1px solid #e0e0e0',
                padding: '0.75em 0',
                marginBottom: '0',
            } },
            wp.element.createElement("button", { style: {
                    width: '100%',
                    textAlign: 'left',
                    padding: 0,
                    backgroundColor: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                }, onClick: () => wp.data.dispatch('core/editor').editPost({ title }) }, title)))))));
};
(0,_wordpress_plugins__WEBPACK_IMPORTED_MODULE_0__.registerPlugin)('wpaia-title-suggestion', {
    render: AITitleSuggestion,
});


/***/ }),

/***/ "@wordpress/edit-post":
/*!**********************************!*\
  !*** external ["wp","editPost"] ***!
  \**********************************/
/***/ ((module) => {

module.exports = window["wp"]["editPost"];

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ ((module) => {

module.exports = window["wp"]["element"];

/***/ }),

/***/ "@wordpress/plugins":
/*!*********************************!*\
  !*** external ["wp","plugins"] ***!
  \*********************************/
/***/ ((module) => {

module.exports = window["wp"]["plugins"];

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!******************************************!*\
  !*** ./assets/src/editorAssets/index.ts ***!
  \******************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _plugins_TitleSuggestion__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./plugins/TitleSuggestion */ "./assets/src/editorAssets/plugins/TitleSuggestion.tsx");


})();

/******/ })()
;
//# sourceMappingURL=editorAssets.js.map