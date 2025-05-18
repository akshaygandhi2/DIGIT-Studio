import FormStep from "../../../../../../ui-components/src/molecules/FormStep";
import React from "react";

const SelectMobileNumber = ({ t, onSelect, showRegisterLink, mobileNumber, onMobileChange, config, canSubmit }) => {

  const handleButtonClick2 = () => {
    window.location.href = `/${window?.contextPath}/employee/user/login`;
  };

  return (
    <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <h1 style={{ fontSize: "40px", fontWeight: "bold", color: "#363636", fontFamily: "Inter", marginTop: "50px" }}>{t('BPA_CONSTRUCTION_PERMIT_TITLE')}</h1>

    <FormStep
      isDisabled={!(mobileNumber.length === 8) && canSubmit}
      onSelect={onSelect}
      config={config}
      t={t}
      componentInFront="+253"
      onChange={onMobileChange}
      value={mobileNumber}
      cardStyle={{ width: "fit-content", minWidth: "476px" }}
      onButtonClick2={handleButtonClick2}
      ></FormStep>
      </div>
  );
};

export default SelectMobileNumber;
