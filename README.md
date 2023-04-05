# VoiceChatina
Mobile APP based on React Native, using OpenAI API, providing a voice chat towards ChatGPT

Setting up the development environment · React Native

https://reactnative.dev/docs/environment-setup

npm install -g react-native-cli

npx react-native init <mobile app name>


Then to execute the app in Android studio device emulator, run:

npx react-native run-android


INSTALL JAVA 17, OPENJDK 17 from next link:

Java Downloads | Oracle

INSTALL ANDROID STUDIO SDK:

Download Android Studio & App Tools - Android Developers

ALSO:

Go to your react-native Project then go to android directory Create a file with following name:

local.properties

Open the file and paste your Android SDK path like below:

For windows users:

sdk.dir=C:\\Users\\UserName\\AppData\\Local\\Android\\sdk

Setting up the development environment · React Native

SET FOLLOWING ENVIRONMENT VARIABLES:

export ANDROID_HOME=$HOME/Library/Android/sdk

export PATH=$PATH:$ANDROID_HOME/emulator

export PATH=$PATH:$ANDROID_HOME/tools

export PATH=$PATH:$ANDROID_HOME/tools/bin

export PATH=$PATH:$ANDROID_HOME/platform-tools


en PATH y nueva ANDROID_HOME en Windows environment variables

execute Android Studio and execute Device Manager, Virtual Device, Emulator 
