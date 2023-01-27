import {
  requireNativeComponent,
  UIManager,
  Platform,
  ViewStyle,
} from 'react-native';

const LINKING_ERROR =
  `The package '@testbank-inc/screen-capture-secure-view' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

type ScreenCaptureSecureViewProps = {
  color: string;
  style: ViewStyle;
};

const ComponentName = 'ScreenCaptureSecureViewView';

export const ScreenCaptureSecureViewView =
  UIManager.getViewManagerConfig(ComponentName) != null
    ? requireNativeComponent<ScreenCaptureSecureViewProps>(ComponentName)
    : () => {
        throw new Error(LINKING_ERROR);
      };
