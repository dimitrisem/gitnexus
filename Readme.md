# GitNexus - <img src="https://img.shields.io/badge/Project%20Status-Active-brightgreen" />

Passionately crafted with 💖 <br> 
<a href="https://gitnexus.netlify.app">Live prod build</a> <br>
Wanted to also include unit testing & sounds but did not have time 🥲

## Table of Contents 📚

- [Getting Started](#getting-started) 🛠️
- [Additional Scripts](#additional-scripts) ➕
- [Tech Stack](#tech-stack) 🖥️
- [Features](#features) 🌟
- [Bonus Features](#bonus-features) 🎁
- [Branch Handling](#branch-handling) 🎁
- [Known Issues](#known-issues) ❌
- [Testing Error Handling](#testing-error-handling) 👈
- [Testing With Slow Connection](#testing-slow-connection) 👈
- [Notes](#notes) 📝
- [Contact](#contact) 📨

---

## Getting Started
1. **Clone the repo**:
    ```bash
    git clone https://jimpapoutsakis@bitbucket.org/jimpapoutsakis/konnektable-tech-challenge.git
    ```

2. **Navigate into the project directory**:
    ```bash
    cd konnektable-tech-challenge
    ```

3. **Install the dependencies**:
    ```bash
    yarn
    ```

4. **Run the project**:
    ```bash
    yarn start
    ```

---

## Additional Scripts
- **Type Checking**
```bash
yarn ts
```
- **Linting**
```bash
yarn lint
```
- **Linting Autofix**
```bash
yarn lint:fix
```
- **Production Build**
```bash
yarn prod
```

## Tech Stack
- React
- Redux
- Redux-Observable ( RxJS )
- MaterialUi
- Typescript
- SCSS
- Webpack ( prefer Vite for speed but i don't have experience )
- Eslint 
- Stylelint + Stylelint Prettier

## Features
#### Required
- User profile page ✅ ( <b> All done </b>)
- Repositories page ⚠️ ( <b> All done except sorting</b> )
- Followers page ❌ ( <b> Not done </b>)
- Search ✅ ( <b> All done </b>)
- Theme toggling ✅ ( <b> All done </b>)

#### Bonus Features
- Virtualization everywhere ( tables, lists ) ✨
- Code splitting - lazy loading ✨
- Deployed with **Netlify**
- Loading screen & slow network connection handling.
- Debounce while searching user ✨
- Redux-Observable ✨
- Typescript ✨
- Webpack ✨
- Linting ✨
- Offline network error handling ✨

### Branch Handling
1. Each deliverable was done in a separate branch.
2. <a href="https://gist.github.com/joshbuchea/6f47e86d2510bce28f8e7f42ae84c716"> Semantic git commits </a> were used.

## Known Issues
- When clicking the description of a repo in the repos table, the dialog renders twice and the second dialog underneath becomes unclickable making it only possible to close by pressing either the <b>esc key</b> / <b> enter key </b>.
- Table pagination sometimes show 0-0 of 0 
## Testing Error Handling
#### Rate Limiting:
Open search dialog, start typing without breaks.
#### Offline Network:
On your **browser**, let's use **Chrome** as an example: <br>
1. Open **Network** tab.
2. Click the select box that says "**No throttling**".
3. Select **Offline** option.
4. Start typing on search input.
5. Stop typing and observe!

## Testing With Slow Connection
On your **browser**, let's use **Chrome** as an example: <br>
1. Open **Network** tab.
2. Click the select box that says "**No throttling**".
3. Select **3G** option ( as an example ).
4. Start typing on search input.
5. Stop typing and observe!

## Notes
#### Premade Things
1. Premium MaterialUi template waa used. The template was purchased and then enhanced!
2. Despite the task requirements, premade components from past projects of mine where used:
- `Delay`
- `CommonTable`
- `CustomDialog`
- `CustomPopover`
- `InfoButton`
- `LoadingScreen`
- `GlassFx` 
- `LordIcon`
- `Navbar`
- `Overlay`
- `Spinkit`

## Contact 📨
- **Email**: jimpapoutsakis3@gmail.com
- **Mobile**: (+30) 6975746045