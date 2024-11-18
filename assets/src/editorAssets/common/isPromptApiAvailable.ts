// @ts-ignore
const isPromptApiAvailable = (): boolean => Boolean(window.ai.languageModel);

export default isPromptApiAvailable;
