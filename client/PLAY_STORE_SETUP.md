Play Store setup and EAS credential steps (detailed)

This guide assumes you're on Windows (PowerShell) and working from the `client` folder of this repo.

1) Google Play Developer account
- Register at https://play.google.com/console (one-time $25 fee)

2) Create a Google Cloud project & service account
- In Play Console -> Settings -> API access -> Create a Google Cloud project or link an existing one.
- In the linked Google Cloud project: IAM & Admin -> Service Accounts -> Create Service Account.
- Grant Service Account the role: "Service Account User" and assign the Play Console access later (see Play Console > API access).
- Create and download a JSON key for the service account.
- Save the key at `client/keys/play-service-account.json` (do NOT commit).

PowerShell example to create keys folder:

```powershell
# from repo root
cd client
mkdir keys
# copy downloaded JSON into client/keys/play-service-account.json
```

3) Configure Play Console API access
- In Play Console -> Settings -> API access -> Grant access to the service account email with the "Release Manager" role (or equivalent) so it can upload releases.

4) EAS & Keystore
- Install EAS CLI globally if not installed:

```powershell
npm install -g eas-cli
```

- Login to Expo:

```powershell
eas login
```

- Let EAS manage credentials (simplest option):

```powershell
# from client folder
eas credentials
# follow prompts to manage Android keystore automatically
```

- Or provide your own keystore (if you have one):

```powershell
# upload an existing keystore
eas credentials -p android --upload-keystore
```

5) Using service account with `eas submit`
- Ensure `client/eas.json` `submit.production.android.serviceAccountKeyPath` points to the downloaded JSON key.
- Do not commit the key. Add to `.gitignore` (already added in this repo).

6) Build & submit

```powershell
cd client
npm ci
# build an AAB
eas build -p android --profile production
# submit using the service account (path is relative to client folder)
eas submit -p android --profile production --service-account ./keys/play-service-account.json
```

7) Using EAS secrets (optional)
- To avoid putting secrets in files, use `eas secret:create` to store API keys or other env vars.

```powershell
# from client folder
eas secret:create --name API_URL --value "https://..."
```

Reference
- EAS build docs: https://docs.expo.dev/build-reference/eas-json/
- EAS submit docs: https://docs.expo.dev/submit/overview/
