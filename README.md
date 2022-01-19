# Create a Chrome extension with React & Typescript

## Create The Extension
1. This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

```sh
npx create-react-app chrome-react-extension --template typescript
```

2. Edit the manifest file in `public/manifest.json`.

Important fields:
- *manifest_version*: should be  **3** which is [the latest version](https://developer.chrome.com/docs/extensions/mv3/getstarted/)
- *action*: we want our button to start a pop-up with the contents of our index.html, which hosts our application

3. Change the `build` command in `package.json` to be `"build": "INLINE_RUNTIME_CHUNK=false react-scripts build"`, so that running `npm run build` would not interleave javascript and html in the generate `index.html` file but create separate files for that. Otherwise we would get `Content Security Policy ` errors.

4. Load extension into Chrome by going to `chrome://extensions/`, turning developer mode on, and clicking `Load unpacked`. Select the `build` folder. The extension will now be available in the extension toolbar.

## Edit the extension

1. Change the popup size. Open `src/index.css`, add width & height to body.
2. Update the interface. In the current project, that's `App.tsx`, but can add as many components as necessary.

### Interact with Chrome

1. We can use the [Chrome API](https://developer.chrome.com/docs/extensions/reference/) to interact with Chrome by using an injected object (called `chrome`).
    - Install Proper Types for Typescript `npm install @types/chrome --save-dev`
2. We need to give it permission through the manifest file. Add the `"activeTab"` permission for now, [others are available](https://developer.chrome.com/docs/extensions/mv3/declare_permissions/).
3. We use [content scripts](https://developer.chrome.com/docs/extensions/mv3/content_scripts/) to interact with the DOM.
4. React can interact with content scripts using [message passing](https://developer.chrome.com/docs/extensions/mv3/messaging/).

### Create content scripts

1. Content scripts are special JavaScript files that run within the context of web pages, and these scripts are different and isolated from the React application.
2. We can either add scripts directly into the `public` folder, or use `craco` (see Other Notes section)
3. Add a `"content_scripts"` section to `manifest.json` so that Chrome knows about our content.js file. You can restrict this to specific websites.

### React interaction with Chrome:

1. Get the current tab
2. Send a message that can automatically be picked by the content scripts running on that site
    - When we send a message, we provide the message object, and, within that message object, we're setting a property named `type`. That property could be used to separate different messages that would execute different codes and responses on the other side. Think of it as dispatching and reducing when working with states.

### Get Extension to open in side panel
[As per this StackOverflow answer](https://stackoverflow.com/a/70025301/1646896)

<hr/>

[Credit for documentation.](https://blog.logrocket.com/creating-chrome-extension-react-typescript/)

<hr/>


## Other Notes

### Using craco

I opted to just add content scripts in the public folder, for ease of use. This means we won't be able to use typescript there.
The procedure to use `craco` is below
1. Install craco: `npm install @craco/craco --save` which will allow us to override some of the create-react-app configuration files without having to [eject](https://create-react-app.dev/docs/available-scripts/#npm-run-eject).
2. Add a `craco.config.js` file in the root directory of your project
3. Change the `build` script in package.json to `"build": "INLINE_RUNTIME_CHUNK=false craco build"`
4. Create a content script in `src/chromeServices/DOMEvaluator.ts`.
