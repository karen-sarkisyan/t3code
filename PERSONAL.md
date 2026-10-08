# Personal desktop fork

GitHub fork: `karen-sarkisyan/t3code` (`origin`). Original project:
`pingdotgg/t3code` (`upstream`). Customizations live on `personal`.

## Build and install on macOS

Requires Node 24, Vite+ (`vp`), Rust, and Xcode Command Line Tools.
If `vp` is unavailable in a new terminal, run:

```sh
source "$HOME/.config/vite-plus/env"
```

From this checkout:

```sh
vp i
vp run personal:build
```

Open the resulting DMG in `release/` and drag **T3 Code Personal (Alpha)**
into Applications. Quit your existing personal app before replacing it.
The application runs independently of this source checkout.

Personal builds are unsigned and use preview versions with **no automatic update
feed**. Updates are installed by rebuilding. macOS may require allowing the app
in System Settings → Privacy & Security on first launch.

## Storage

- Server data: `~/.t3-personal/userdata`.
- Electron profile: `~/Library/Application Support/t3code-personal`.
- Development uses the checkout's `.t3` when started through `vp run dev:desktop`.
- An explicit `T3CODE_HOME` overrides the server data location.

The personal macOS app has its own bundle identifier and does not reuse the
official app's database or browser profile. Existing official history is not
copied. Provider credentials continue to come from your installed providers.
The upstream OAuth URL schemes are retained for compatibility; if both apps
are installed, macOS may choose one of them for external `t3code://` links.

## Customize and update

Commit customizations on `personal`. To incorporate upstream changes:

```sh
git switch personal
git status                   # Commit or stash any unfinished changes first.
git fetch upstream main
git merge upstream/main
# Resolve conflicts if needed, then git add and git commit.
vp i
vp run personal:build
git push origin personal
```

Run focused tests for code affected by a merge before installing the new build.
If a merge becomes unsuitable, `git merge --abort` cancels an unfinished merge.
Git's `rerere` is enabled locally to remember previous conflict resolutions.
Keep the personal identity, storage separation, and preview build command when
resolving upstream conflicts.
