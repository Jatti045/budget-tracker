Android Play Store deployment checklist for this Expo project

Quick summary

This file covers the minimal steps to build an Android Play Store release using Expo Application Services (EAS).

Prerequisites
- Google Play Developer account (one-time $25 fee).
- Node.js and npm installed.
- `eas-cli` installed globally: `npm install -g eas-cli`.
- An Expo account and the project registered with Expo (expo login).

1) Verify `app.json`
- Ensure `expo.android.package` is a unique reverse-domain identifier. Example in this repo: `com.budgee.app`.
- Ensure `expo.version` and `expo.android.versionCode` are set; increment `versionCode` on each release.

2) Configure `eas.json`
- See `client/eas.json` in this repo for a `production` profile that builds an AAB (app-bundle).
- Add any environment variables you need (for example, `API_URL`).

3) Prepare Play Console & service account
- Create a Google Play Developer account: https://play.google.com/console
- In Play Console -> Settings -> API access -> Create a Service Account
- Create or link a Google Cloud project and grant the service account "Release Manager" or similar roles required for uploading.
- Create a JSON key for the service account and download it. Place it in `client/keys/play-service-account.json` (do NOT commit this file to git).

4) Login & credentials
- Login to Expo: `eas login`
- Configure credentials: `eas credentials` (EAS can manage keystore for you) or provide an existing keystore.
- If you let EAS manage the keystore, it will generate and store it for this project.

5) Build the AAB
- From `client` folder run:

```bash
# install deps
npm ci
# login to eas
eas login
# start the build
eas build -p android --profile production
```

- Wait for the build to complete. You'll get a link to the produced AAB.

6) Submit to Play Store
- Option A: Use EAS submit (recommended)

```bash
# in client folder
# ensure you have the service account json at ./keys/play-service-account.json
eas submit -p android --profile production --key ./keys/play-service-account.json
```

- Option B: Download the AAB from EAS build dashboard and upload manually to Play Console -> Release -> Internal test -> Create release -> Upload AAB.

7) Post-submission
- Fill in store listing: app name, short description, full description, screenshots (phone/tablet), app category, contact details, privacy policy link.
- Content rating questionnaire.
- Targeted countries and pricing.
- Choose internal test, open test, or production rollout.

Security & notes
- Do NOT commit your Play service account key or keystore to git. Add them to `.gitignore`.
- Use `eas secret:create` to store secrets in EAS and reference them via `process.env` in builds.

Troubleshooting
- If the build fails, check the build logs on the EAS dashboard and run `eas build -p android --profile production --local` for local debugging.

That's it — once the AAB is accepted, roll out to your chosen track.
