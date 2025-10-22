React Navigation setup notes

What I installed:

- @react-navigation/native
- @react-navigation/native-stack
- react-native-gesture-handler
- react-native-screens

Notes:

1. Files changed

- `index.js`: added `import 'react-native-gesture-handler';` at the top to register gesture handler.
- `App.tsx`: wrapped the app with `NavigationContainer` and added a small native stack (Home and Details screens). `react-native-safe-area-context` is already installed and used.
- `jest.config.js`: updated `transformIgnorePatterns` so Jest transforms `@react-navigation` modules during tests.

2. Install commands used (npm):

```bash
npm install @react-navigation/native @react-navigation/native-stack react-native-gesture-handler react-native-screens
cd ios && pod install
```

3. Quick run:

- iOS: `npx react-native run-ios` (or use Xcode after opening `ios/statsboard.xcworkspace`)
- Android: `npx react-native run-android`

4. Next steps / suggestions

- If you prefer `react-navigation/stack` (JS implementation) instead of native-stack, swap packages.
- Consider calling `enableScreens()` from `react-native-screens` for better performance if needed.
- Add TypeScript types for `@react-navigation/native` if you have strict typing (e.g. `@types/react-navigation` is not needed for v5+; use provided types).

Example: enable native screens at app startup:

```tsx
import { enableScreens } from 'react-native-screens';
enableScreens();
```

## Added features

- Bottom tabs: `@react-navigation/bottom-tabs` installed and a simple Tab navigator was added which nests the existing native stack under the `HomeTab`.
- Typed params: `src/navigation/types.ts` contains `RootStackParamList` and `RootTabParamList` showing a minimal shape for typed navigation.
- Linking: `NavigationContainer` includes a basic linking config with prefixes (`statsboard://`, `https://example.com`) and route mapping for `home`, `details/:id`, and `settings`.
- Guarding `enableScreens()`: to avoid console errors during Jest tests (where native modules are not linked), `enableScreens()` is called inside a try/catch and only when appropriate.

## Run & dev notes

1. Install (if needed):

```bash
npm install @react-navigation/bottom-tabs
cd ios && pod install
```

2. Run app

```bash
npx react-native run-ios
npx react-native run-android
```

3. Test-time notes

If tests run in environments without linked native modules, you may see a console warning from `react-native-screens`. Two options to address that are:

- Guard `enableScreens()` with a runtime check (already implemented in `App.tsx`).
- Add a Jest mock for `react-native-screens` if you prefer suppressing the warning during test runs.

## Deep link verification

On iOS simulator:

```bash
# open the URL in the simulator
npx uri-scheme open statsboard://home --ios
# or using simctl
xcrun simctl openurl booted "statsboard://details/123"
```

On Android emulator:

```bash
adb shell am start -W -a android.intent.action.VIEW -d "statsboard://details/123" com.statsboard
```

If you'd like, I can wire up deep linking, bottom tabs, or custom header styling next.

## Android font bundling notes

`react-native-vector-icons` normally auto-links and bundles fonts on both platforms. On Android, if icons do not appear at runtime, try:

- Cleaning and rebuilding the app: `cd android && ./gradlew clean && cd .. && npx react-native run-android`
- Ensuring `apply from: "../../node_modules/react-native-vector-icons/fonts.gradle"` is present in `android/app/build.gradle` (newer RN auto-links this but older templates may not).

## Per-icon-family packages

The `react-native-vector-icons` project has moved to per-icon-family packages (smaller bundles). For FontAwesome5 you can follow the migration guide if you want a lighter install. The full package remains supported but consider the per-family package if bundle size matters.
