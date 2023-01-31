export type TScreenCaptureListenerCallback = () => void;
declare function useScreenCaptureSecureView(): {
    addScreenCaptureListener: (callback: TScreenCaptureListenerCallback) => import("react-native").EmitterSubscription | undefined;
    isSecure: () => any;
    enableSecureView: () => void;
    disableSecureView: () => void;
};
export default useScreenCaptureSecureView;
