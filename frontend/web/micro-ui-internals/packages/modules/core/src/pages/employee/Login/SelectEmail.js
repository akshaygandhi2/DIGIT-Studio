import FormStep from "../../../../../../ui-components/src/molecules/FormStep";
import React from "react";

const SelectEmail = ({ t, onSelect, email, onEmailChange, config, canSubmit, onForgotPassword, isDisabled, disable }) => {

  const isValidEmail = (email) => {
    if (!email) return false;
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };


  const handleButtonClick2 = () => {
    window.location.href = `/${window?.contextPath}/citizen/login`;
  };

  const handleSubmit = (data) => {
    onSelect(data);
  };

  return (
     <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center",
    justifyContent: "center" }}>
      <h1 style={{ fontSize: "40px", fontWeight: "bold", color: "#363636", fontFamily: "Inter",
      marginTop: "50px" }}>{t('BPA_CONSTRUCTION_PERMIT_TITLE')}</h1>

      <FormStep
        isDisabled={(!email || !isValidEmail(email)) || !canSubmit || isDisabled || disable}
        onSelect={handleSubmit}
        onSubmit={handleSubmit}
        config={config}
        t={t}
        onButtonClick2={handleButtonClick2}
        onChange={onEmailChange}
        value={email}
        cardStyle={{ width: "fit-content", minWidth: "476px" }}
        onSkip={onForgotPassword} // Add this to trigger the forgot password action
        componentInFront={"hod_email@email.com"}
      />
    </div>
  );
};

export default SelectEmail;
