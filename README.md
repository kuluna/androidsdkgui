Android SDK GUI
---
Reborn the Android SDK GUI Tool

![demo](docs/images/demo.gif)

# Overview
GUI Application wrapping Android SDK CUI tool (sdkmanager).  

## Deprecated official GUI tool
Version 25.0.0, "android" command is deprecated.

- CUI => Replace "sdkmanager"
- GUI => Android Studio **only**

Android SDK GUI is Reborn the GUI!

# Support Platform
Using Electron, it should work on any platforms.

- Windows x64 (My develop environment)
- Mac
- Linux

# Usage
1. Download Android SDK
1. Run command `{Android-SDK-Path}/tools/bin/sdkmanager --licenses`
1. [Download release](https://github.com/kuluna/androidsdkgui/releases) or clone this repository
1. Run app
1. Setting path
1. Click to install (avaiable only)

# Feature
- Download SDK packages (But UI is not cool...)
  - [x] Show lists
  - [x] Install
  - [ ] Delete
  - [x] Update tools
  - [ ] Cancelling install/update
  - [ ] Check licenses
- [ ] AVD
- [x] Proxy support
- [ ] macOS keyboard shortcut

And requesting features!

# Develop
Nodejs required.

```bash
$ git clone https://github.com/kuluna/androidsdkgui.git
$ cd androidsdkgui
$ npm install
$ npm start
```

# Contributing
1. Fork it!
1. Create your feature branch: git checkout -b my-new-feature
1. Commit your changes: git commit -am 'Add some feature'
1. Push to the branch: git push origin my-new-feature
1. Submit a pull request :D

# License
MIT License.
