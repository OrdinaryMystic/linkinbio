# AutoHotkey Script for TikTok Live Toggle

## What This Does

The `toggle-live.ahk` script lets you quickly toggle your TikTok live status and automatically push changes to GitHub with keyboard shortcuts.

## Setup Instructions

### 1. Install AutoHotkey (if you don't have it)
- Download from: https://www.autohotkey.com/
- Install the program

### 2. Verify the File Paths
Open `toggle-live.ahk` and make sure these paths are correct:
```ahk
configFile := "C:\Users\tyler\Documents\My Files\03. Efforts\Code\Link in Bio\linkinbio\live-config.js"
repoPath := "C:\Users\tyler\Documents\My Files\03. Efforts\Code\Link in Bio\linkinbio"
```

### 3. Make Sure Git is Set Up
This script uses Git command line. To verify:
1. Open Command Prompt
2. Type `git --version`
3. If it shows a version number, you're good!
4. If not, install Git from: https://git-scm.com/

### 4. Run the Script
- Double-click `toggle-live.ahk`
- You'll see an "H" icon in your system tray (bottom right)
- The script is now running in the background

## Keyboard Shortcuts

### **Ctrl + Alt + L** - Go Live
- Changes `isLiveOnTikTok` to `true`
- Commits to git with message "Going live on TikTok"
- Pushes to GitHub
- Shows notification when complete

### **Ctrl + Alt + O** - Go Offline
- Changes `isLiveOnTikTok` to `false`
- Commits to git with message "Ending TikTok live"
- Pushes to GitHub
- Shows notification when complete

### **Ctrl + Alt + S** - Check Status
- Shows a notification with current live status
- Doesn't change anything or push to git

## Making It Run on Startup (Optional)

If you want this to run automatically when you start your computer:

1. Press `Win + R`
2. Type `shell:startup` and press Enter
3. Right-click in the folder → New → Shortcut
4. Browse to your `toggle-live.ahk` file
5. Click OK

Now it will start automatically when you log in!

## Troubleshooting

**"Git push failed"**
- Make sure you're logged into GitHub and have push access
- Try running `git push` manually in the folder first to test

**"Path not found"**
- Check that the file paths in the script match where your files actually are
- Use the full path (starting with C:\)

**"Script doesn't work"**
- Make sure AutoHotkey is installed
- Make sure the script is running (look for "H" icon in system tray)
- Try right-clicking the .ahk file → "Run Script"

## Want to Change the Hotkeys?

Edit these lines in `toggle-live.ahk`:
- `^!l::` means Ctrl+Alt+L (change to whatever you want)
- `^!o::` means Ctrl+Alt+O
- `^!s::` means Ctrl+Alt+S

Common symbols:
- `^` = Ctrl
- `!` = Alt
- `+` = Shift
- `#` = Windows key

Example: `^#l::` would be Ctrl+Windows+L
