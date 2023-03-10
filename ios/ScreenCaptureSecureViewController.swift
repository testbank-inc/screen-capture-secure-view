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
  private var field = UITextField(frame: CGRect.zero)
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
    let keyWindow = UIApplication.shared.windows.filter {$0.isKeyWindow}.first
    field = UITextField(frame: keyWindow?.rootViewController?.view?.frame ?? CGRect.zero)

    field.isSecureTextEntry = false
    field.isUserInteractionEnabled = false
  }

  func addSecureTextField(to view: UIView!, andField field: UITextField!) {
    view.addSubview(field)
    view.layer.superlayer?.addSublayer(field.layer)
    field.layer.sublayers?.first?.addSublayer(view.layer)
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
    let keyWindow = UIApplication.shared.windows.filter {$0.isKeyWindow}.first
    let rootView = keyWindow?.rootViewController?.view

    initSecureTextFieldView()
    addSecureTextField(to: rootView?.subviews.last, andField: field)
    enableSecureView(field)
  }

  @objc func disableSecure() {
    disableSecureView(field)
  }
}
