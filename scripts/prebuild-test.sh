npx expo prebuild --clean
echo "📍 Before fastlane copy: $(pwd)"
cp -R ./fastlane-template/fastlane ./ios/fastlane
echo "✅ fastlane 디렉토리 복원 완료"
cd ios
fastlane beta
echo "✅ iOS 빌드 완료"