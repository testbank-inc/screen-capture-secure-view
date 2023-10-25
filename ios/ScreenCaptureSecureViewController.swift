//
//  ScreenCaptureSecureViewController.swift
//  ScreenCaptureSecureView
//
//  Created by SJ on 2023/01/27.
//  Copyright © 2023 Facebook. All rights reserved.
//

@objc(IOSScreenCaptureSecureViewController)
class IOSScreenCaptureSecureViewController: RCTViewManager {
  // declare secureField variable
  private var secureField: UITextField?
  private var isSecure = false

  // initialize class on the main thread
  override static func requiresMainQueueSetup() -> Bool {
    return true
  }

  // run class methods on main thread
  override var methodQueue: DispatchQueue! {
    get {
      return DispatchQueue.main
    }
  }

  //MARK: - secureField methods
  func initSecureTextFieldView() {
      // TODO
  }

  func addSecureTextField(to view: UIView!, andField field: UITextField!) {
      // TODO
  }

  func enableSecureView(_ field: UITextField) {
    field.isSecureTextEntry = true
    isSecure = true
  }

  func disableSecureView(_ field: UITextField) {
    field.isSecureTextEntry = false
    isSecure = false
  }

  //MARK: - public methods
  @objc func getIsSecure(_ resolve:RCTPromiseResolveBlock, reject:RCTPromiseRejectBlock) {
    resolve(isSecure)
  }

  @objc func enableSecure() {
      DispatchQueue.main.async { [weak self] in
          guard let self = self else { return }

      if secureField == nil {
         secureField = UITextField()
         secureField?.isUserInteractionEnabled = false
         secureField?.backgroundColor = UIColor.white

         guard let window = UIApplication.shared.windows.first(where: { $0.isKeyWindow }) else { return }
         window.makeKeyAndVisible()

         secureField?.frame = window.bounds

         if let superlayer = window.layer.superlayer {
               superlayer.addSublayer(secureField!.layer)
         }
         if let firstSublayer = self.secureField?.layer.sublayers?.first {
             firstSublayer.addSublayer(window.layer)
         }
      }

      secureField?.isSecureTextEntry = true
      }
  }

  @objc func disableSecure() {
      secureField?.isSecureTextEntry = false
  }
}
