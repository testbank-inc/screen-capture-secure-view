"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_native_1 = require("react-native");
const { IOSScreenCaptureEventEmitter, IOSScreenCaptureSecureViewController: secureViewController } = react_native_1.NativeModules;
const eventEmitter = new react_native_1.NativeEventEmitter(IOSScreenCaptureEventEmitter);
function useScreenCaptureSecureView() {
    const addScreenCaptureListener = (callback) => {
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
exports.default = useScreenCaptureSecureView;
