import { NativeEventEmitter, NativeModules } from 'react-native';
const { IOSScreenCaptureEventEmitter, IOSScreenCaptureSecureViewController: secureViewController } = NativeModules;
const eventEmitter = new NativeEventEmitter(IOSScreenCaptureEventEmitter);
function useScreenCaptureSecure() {
    const addScreenCaptureListener = (callback) => {
        if (typeof callback !== 'function') {
            console.error('ScreenCaptureSecureError : addScreenCaptureListener requires valid callback function.');
            return;
        }
        return eventEmitter.addListener('userDidTakeScreenshot', callback);
    };
    const getIsSecure = async () => {
        try {
            const res = await secureViewController.getIsSecure();
            return res;
        }
        catch (e) {
            console.log(e.message, e.code);
        }
    };
    const enableSecure = () => {
        secureViewController.enableSecure();
    };
    const disableSecure = () => {
        secureViewController.disableSecure();
    };
    return { addScreenCaptureListener, getIsSecure, enableSecure, disableSecure };
}
export default useScreenCaptureSecure;
