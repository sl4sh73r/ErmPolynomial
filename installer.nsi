!include "MUI2.nsh"

Name "Electron App"
OutFile "ElectronAppInstaller.exe"
InstallDir $PROGRAMFILES\ElectronApp
RequestExecutionLevel user

Page directory
Page instfiles

Section ""
  SetOutPath $INSTDIR
  File /r *
  CreateShortcut "$DESKTOP\Electron App.lnk" "$INSTDIR\ElectronApp.exe"
SectionEnd