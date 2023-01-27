export type TScreenCaptureListenerCallback = () => void;
declare function useScreenCaptureSecureView(): {
    addScreenCaptureListener: (callback: TScreenCaptureListenerCallback) => import("react-native").EmitterSubscription | undefined;
    setSecureView: () => void;
    resetSecureView: () => void;
};
export default useScreenCaptureSecureView;
