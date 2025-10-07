; AutoHotkey Script to Toggle TikTok Live Status
; Hotkey: Ctrl+Alt+L (Toggle Live)
; Hotkey: Ctrl+Alt+O (Turn Off Live)

; Set the path to your live-config.js file
configFile := "C:\Users\tyler\Documents\My Files\03. Efforts\Code\Link in Bio\linkinbio\live-config.js"
repoPath := "C:\Users\tyler\Documents\My Files\03. Efforts\Code\Link in Bio\linkinbio"

; Ctrl+Alt+L - Toggle Live Mode ON and Push to GitHub
^!l::
{
    ; Read the current file
    FileRead, content, %configFile%

    ; Change false to true
    newContent := StrReplace(content, "const isLiveOnTikTok = false;", "const isLiveOnTikTok = true;")

    ; Write the updated content back
    FileDelete, %configFile%
    FileAppend, %newContent%, %configFile%

    ; Git commands to push changes
    RunWait, cmd.exe /c "cd /d "%repoPath%" && git add live-config.js && git commit -m ""Going live on TikTok"" && git push", , Hide

    ; Show notification
    TrayTip, TikTok Live, Live mode is now ON and pushed to GitHub!, 5, 1
    return
}

; Ctrl+Alt+O - Turn Live Mode OFF and Push to GitHub
^!o::
{
    ; Read the current file
    FileRead, content, %configFile%

    ; Change true to false
    newContent := StrReplace(content, "const isLiveOnTikTok = true;", "const isLiveOnTikTok = false;")

    ; Write the updated content back
    FileDelete, %configFile%
    FileAppend, %newContent%, %configFile%

    ; Git commands to push changes
    RunWait, cmd.exe /c "cd /d "%repoPath%" && git add live-config.js && git commit -m ""Ending TikTok live"" && git push", , Hide

    ; Show notification
    TrayTip, TikTok Live, Live mode is now OFF and pushed to GitHub!, 5, 1
    return
}

; Ctrl+Alt+S - Check current status (doesn't push)
^!s::
{
    FileRead, content, %configFile%

    if InStr(content, "const isLiveOnTikTok = true;")
        TrayTip, TikTok Live Status, Currently: LIVE, 3, 1
    else
        TrayTip, TikTok Live Status, Currently: OFFLINE, 3, 1
    return
}
