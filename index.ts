import { NativeEventEmitter, NativeModules } from 'react-native';

export type TScreenCaptureListenerCallback = () => void;

const { IOSScreenCaptureEventEmitter, IOSScreenCaptureSecureViewController: secureViewController } = NativeModules;
const eventEmitter = new NativeEventEmitter(IOSScreenCaptureEventEmitter);

function useScreenCaptureSecureView () {
  const addScreenCaptureListener = (callback: TScreenCaptureListenerCallback) => {
    if (typeof callback !== 'function') {
      console.error('ScreenCaptureSecureError : addScreenCaptureListener requires valid callback function.');
      return;
    }

    return eventEmitter.addListener('userDidTakeScreenshot', callback);
  };

  const setSecureView = () => {
    secureViewController.setSecure();
  };

  const resetSecureView = () => {
    secureViewController.resetSecure();
  };

  return { addScreenCaptureListener, setSecureView, resetSecureView };
}

export default useScreenCaptureSecureView;
