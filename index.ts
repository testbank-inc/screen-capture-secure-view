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

  const isSecure = () => {
    return secureViewController.isSecure();
  }

  const enableSecureView = () => {
    secureViewController.enableSecure();
  };

  const disableSecureView = () => {
    secureViewController.disableSecure();
  };

  return { addScreenCaptureListener, isSecure, enableSecureView, disableSecureView };
}

export default useScreenCaptureSecureView;
