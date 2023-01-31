export type TScreenCaptureListenerCallback = () => void;
declare function useScreenCaptureSecure(): {
    addScreenCaptureListener: (callback: TScreenCaptureListenerCallback) => import("react-native").EmitterSubscription | undefined;
    getIsSecure: () => Promise<any>;
    enableSecure: () => void;
    disableSecure: () => void;
};
export default useScreenCaptureSecure;
