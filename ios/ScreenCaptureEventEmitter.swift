//
//  ScreenCaptureEventEmitter.swift
//  ScreenCaptureSecureView
//
//  Created by SJ on 2023/01/27.
//  Copyright © 2023 Facebook. All rights reserved.
//

@objc(IOSScreenCaptureEventEmitter)
class IOSScreenCaptureEventEmitter: RCTEventEmitter {
  private var hasListeners: Bool = false
  
  override func supportedEvents() -> [String]! {
    return ["userDidTakeScreenshot"]
  }
  
  override func startObserving() {
    NotificationCenter.default.addObserver(self, selector: #selector(handleAppScreenshotNotification), name: UIApplication.userDidTakeScreenshotNotification, object: nil)
    
    hasListeners = true
  }
  
  override func stopObserving() {
    NotificationCenter.default.removeObserver(self)
    
    hasListeners = false
  }

  @objc func handleAppScreenshotNotification () {
    if hasListeners {
      sendEvent(withName: "userDidTakeScreenshot", body: nil)
    }
  }
  
  override static func requiresMainQueueSetup() -> Bool {
    return true
  }
}
