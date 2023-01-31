//
//  ScreenCaptureSecureModule.m
//  ScreenCaptureSecureView
//
//  Created by SJ on 2023/01/27.
//  Copyright © 2023 Facebook. All rights reserved.
//

#if __has_include("RCTBridgeModule.h")
#import "RCTBridgeModule.h"
#import "RCTEventEmitter.h"
#import "RCTViewManager.h"
#else
#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>
#import <React/RCTViewManager.h>
#endif

@interface RCT_EXTERN_MODULE(IOSScreenCaptureEventEmitter, RCTEventEmitter)
@end

@interface RCT_EXTERN_MODULE(IOSScreenCaptureSecureViewController, RCTViewManager)
RCT_EXTERN_METHOD(getIsSecure:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(enableSecure)
RCT_EXTERN_METHOD(disableSecure)
@end
