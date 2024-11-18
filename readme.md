# WP On-Device AI Assistant

![!WP On-Device AI Assistant Logo](https://uploads.nico.dev/wp-on-device-ai-assistant/logo.svg)

This WordPress plugin provides an on-device AI assistant for your website. It uses the experimental [Prompt API](https://github.com/explainers-by-googlers/prompt-api) to generate text and thus provides you three main features:

## The AI Assistant Block
The AI Assistant block is a block editor block that you can add to your posts and pages. It will initially show a text field where you can type your instructions. After submit, the AI will generate a response and convert the "AI Assistant Block" to a regular `core/paragraph` containing the newly created content.

![AI Assistant Block Demo](https://uploads.nico.dev/wp-on-device-ai-assistant/writing-assistant.gif)

Not yet happy with the result? Time to use the "Paragraph Rewriter" feature!

## The Paragraph Rewriter
The paragraph rewriter extends the `core/paragraph` block with a new button in the toolbar that allows you to rewrite the paragraph using AI. Just select the text you want to rewrite, add some instructions and hit the "Rewrite" button.

![AI Assistant Block Demo](https://uploads.nico.dev/wp-on-device-ai-assistant/paragraph-rewriter.gif)

So you have your perfect blogpost, but you're not sure about the title? Have a look at the "Title Generator" feature!

## The Title Generator
In the Post Settings panel you will find a new meta box called "AI Assistant". Here you have a button called "Generate title suggestions". Clicking this button will generate 5 different titles based on the content of your post.  

You like one of them? Just click on it, and it will be set as the post title.  
You don't like any of them? Just click the button again and get 5 new suggestions.

![AI Assistant Block Demo](https://uploads.nico.dev/wp-on-device-ai-assistant/title-generator.gif)

## Installation
1. Upload the files and folders to the `/wp-content/plugins/wp-ai-assistant` directory
2. Go to "Plugins" in your WP Admin
3. Activate "WP On-Device AI Assistant"

## About this project
The "WP On-Device AI Assistant" WordPress Plugin is a project by [Nico Martin](https://nico.dev) and is a submission for the [Google Chrome Built-in AI Challenge](https://googlechromeai.devpost.com/).  
It is an experimental project and should not be used in production environments.

### Prompt API
It heavily relies on the [Prompt API](https://github.com/explainers-by-googlers/prompt-api) which is an experimental project by Google Chrome. The API is not stable and might change at any time.