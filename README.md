# Developer at Droppe - React refactoring task

## Available Scripts

In the project directory, you can run:

### `yarn install`

to install the dependencies.

Set the environment variable `REACT_APP_BASE_URL` and then run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Development Approach and Refactoring

### Refactored Code ###

I have refactored the following things in the existing code.

1. The class based Components have been changed to the function based components. It includes the components `ShopApp` and `ProductsList`.
2. The `refs` were replaced with the state variables in the `Form` component for the sake of simplicity.
3. The extra state variables like `prodCount` were removed as this value can be fetched from the `products` array itself.
4. Some loops were replaced with the JavaScript built-in methods like, `slice`, `map`, etc.
5. The api functions have been moved to a separate module responsible for calling the apis.
6. The get api was being called in the constructor, which was a flaw. I would have moved it to the `componentDidMount`, but as the component was refactored to a functional component, it is written in the `useEffect` hook.
7. In the add product logic, the screen was updated before the api call, which gives the user a fake feedback of success. The new product is now added after the api returns the success response.
8. In the `favClick` method, the `title` argument has been replaced with the `index`, as it is easy and more optimized.
9. In order to avoid from the 'many re-renderings' of different components, optimization techniques like `useCallback` and `React.Memo` has been used.
10. If I were given option to keep class components as they are, I would have made the following changes to them:
    1. Change the class function to arrow functions to keep things simple
    2. Adding the arrow function would remove the need of `bind` in the constructors.
11. A spinner have been added in order to make user experience better.

### Things which are not changed ###

The following things have not been changed in the refactoring.

1. The overall architecture of the application is not changed. The `ShopApp` component is used as *the single source of truth*. I have let it be as it is. Since, it is a simple project, therefore, the *state drilling* is not a problem here, and no store (i.e., Context API or Redux) was used. To avoid from the unnecessary re-renderings, optimization techniques have been used.
2. There was a problem mentioned in the `Product Details` component that the title can be long. The problem of showing the long title on the UI is not addressed.
3. In order to finish it before the weekend, I have been giving it extra hours. So, I have not included the unit tests in this solution.