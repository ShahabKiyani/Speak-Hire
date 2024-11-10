@echo off

REM Start Flask server in a new command window
start cmd /k "cd flask-server && python server.py"

REM Change to the audio_cap-app directory and run npm start in the current window
cd speak-hire
npm start

REM Pause to keep the window open
pause
