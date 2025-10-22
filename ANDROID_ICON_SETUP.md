Android: finish bundling react-native-vector-icons fonts

Why

Some Android templates don't automatically copy the vector-icons font files into the app assets. If icon glyphs show as empty squares/question marks at runtime, the fonts were not bundled into the Android app assets.

Quick checklist

1. Confirm the gradle include is present in `android/app/build.gradle` (we already added this in the repo):

```bash
grep -n "react-native-vector-icons/fonts.gradle" android/app/build.gradle || echo "missing"
```

If it's missing, run the safe append command below.

2. Safe command to add the fonts gradle include (won't duplicate if already present):

```bash
# macOS / Linux
if ! grep -q "react-native-vector-icons/fonts.gradle" android/app/build.gradle; then
  printf "\napply from: \"../../node_modules/react-native-vector-icons/fonts.gradle\"\n" >> android/app/build.gradle
  echo "Added fonts.gradle include to android/app/build.gradle"
else
  echo "fonts.gradle already present"
fi
```

3. Ensure Java (JDK) and Android SDK are installed on your machine. If `./gradlew` reports "Unable to locate a Java Runtime", install a JDK (OpenJDK or AdoptOpenJDK).

4. Clean and rebuild the Android project (this will copy fonts into `android/app/src/main/assets/fonts`):

```bash
cd android
./gradlew clean
cd ..
# then rebuild/run the app
npx react-native run-android
```

If you use Android Studio: open the `android` folder, run Build > Clean Project and then Build > Rebuild Project, or just run the app from Android Studio.

5. Verify fonts were copied:

```bash
ls -la android/app/src/main/assets/fonts
# you should see files like FontAwesome5_Solid_900.ttf or similar
```

Notes and troubleshooting

- If the icon still doesn't appear after a successful rebuild, uninstall the app from the emulator/device and reinstall (sometimes cached assets persist):

```bash
adb uninstall com.statsboard
npx react-native run-android
```

- If you're using a CI server or a different machine, ensure Java/Android SDK are available there too.

- The `react-native-vector-icons` project recommends per-icon-family packages for smaller bundles; the full package still works fine but is larger.

If you'd like, I can also add a small npm script to run the "check and append" command automatically (e.g. `npm run ensure-icons`) — tell me if you want that and I'll add it.
