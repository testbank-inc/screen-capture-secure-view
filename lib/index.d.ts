export type TScreenCaptureListenerCallback = () => void;
declare function useScreenCaptureSecureView(): {
    addScreenCaptureListener: (callback: TScreenCaptureListenerCallback) => import("react-native").EmitterSubscription | undefined;
    isSecure: () => Promise<any>;
    enableSecureView: () => void;
    disableSecureView: () => void;
};
export default useScreenCaptureSecureView;
