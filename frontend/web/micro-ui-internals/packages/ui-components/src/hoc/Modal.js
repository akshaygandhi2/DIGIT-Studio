import React, { useEffect } from "react";

import PopUp from "../atoms/PopUp";
import Button from "../atoms/Button";
import Toast from "../atoms/Toast";
import HeaderBar from "../atoms/HeaderBar";

const Modal = ({
  headerBarMain,
  headerBarEnd,
  popupStyles,
  popupModuleStyles={},
  children,
  actionCancelLabel,
  actionCancelLabelStyle={},
  actionCancleTextStyle={},
  actionCancelOnSubmit,
  actionSaveLabel,
  actionSaveOnSubmit,
  actionSaveOnSubmitStyle={},
  actionSaveTextStyle={},
  error,
  setError,
  formId,
  isDisabled,
  hideSubmit,
  style = {},
  popupModuleMianStyles,
  headerBarMainStyle,
  // isOBPSFlow = false,
  variant = "",
  popupModuleActionBarStyles = {},
  showClose = false,
}) => {
  /**
   * TODO: It needs to be done from the desgin changes
   */
  // const mobileView = Digit.Utils.browser.isMobile() ? true : false;
  useEffect(() => {
    document.body.style.overflowY = "hidden";
    return () => {
      document.body.style.overflowY = "auto";
    };
  }, []);
  return (
    <PopUp style={popupModuleStyles} showClose={showClose}>
      <div className="digit-popup-module" style={popupStyles}>
        <HeaderBar main={headerBarMain} end={headerBarEnd} style={headerBarMainStyle ? headerBarMainStyle : {}} />
        <div className="digit-popup-module-main" style={popupModuleMianStyles ? popupModuleMianStyles : {}}>
          {children}
          <div
            // V2 -> Instead of mission specific code, we need to pass classnames for addition styling for obps flow i have added classname with -> "digit-variant-obps" .
            className={`digit-popup-module-action-bar ${variant}`}
            style={popupModuleActionBarStyles}
          >
            {actionCancelLabel ? (
              <Button textStyles={actionCancleTextStyle} variation="digit-action-cancel" theme="border" label={actionCancelLabel} onClick={actionCancelOnSubmit} style={actionCancelLabelStyle} />
            ) : null}
            {!hideSubmit ? (
              <Button gradient={true} textStyles={actionSaveTextStyle} label={actionSaveLabel} onClick={actionSaveOnSubmit} formId={formId} isDisabled={isDisabled} style={actionSaveOnSubmitStyle} />
            ) : null}
          </div>
        </div>
      </div>
      {error && <Toast label={error} onClose={() => setError(null)} type = {"error"} />}
    </PopUp>
  );
};

export default Modal;
