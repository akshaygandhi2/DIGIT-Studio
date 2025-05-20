import React from "react";
import { Card, CardHeader } from "@egovernments/digit-ui-react-components";

const SummaryView = ({ formData, t, serviceCode }) => {
  const renderValue = (value) => {
    if (!value) return "-";

    if (typeof value === "boolean") {
      return value ? "Yes" : "No";
    }

    if (typeof value === "object") {
      // Handle objects that have 'name' or 'code' properties (dropdown selections)
      if (value.name) {
        return t(value.name);
      }
      return value.code || "-";
    }

    return value;
  };

  const renderSection = (data, sectionTitle) => {
    if (!data || !data[0]) return null;

    return (
      <div className="section-container">
        <h2 className="section-title">{t(sectionTitle)}</h2>
        <div className="section-content">
          {Object.entries(data[0]).map(([key, value]) => (
            <div key={key} className="field-container">
              <div className="field-label">{t(serviceCode+"_"+key.toUpperCase())}</div>
              <div className="field-value">{renderValue(value)}</div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderDocuments = (documents) => {
    if (!documents) return null;

    return (
      <div className="section-container">
        <h2 className="section-title">{t("DOCUMENTS")}</h2>
        <div className="section-content">
          {Object.entries(documents).map(([docType, files]) => {
            if (!files || !files.length) return null;

            return (
              <div key={docType} className="field-container">
                <div className="field-label">{t(docType)}</div>
                <div className="field-value">
                  {files.map(([fileName, fileData], index) => (
                    <div key={index} className="document-item">
                      <span className="file-name">{fileName}</span>
                      {fileData.fileStoreId && (
                        <span className="file-id">
                          (ID: {fileData.fileStoreId.fileStoreId})
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <Card>
      <CardHeader>{t("APPLICATION_SUMMARY")}</CardHeader>
      <div style={{ padding: "16px" }}>
        {renderSection(formData.applicantDetails, "APPLICANT_DETAILS")}
        {renderSection(formData.landandProjectDesignDetails, "LAND_AND_PROJECT_DETAILS")}
        {renderSection(formData.designOfficeDetailing, "DESIGN_OFFICE_DETAILS")}
        {renderDocuments(formData.documents)}
      </div>
      <style jsx>{`
        .section-container {
          margin-bottom: 24px;
          padding: 16px;
          background: #fff;
          border-radius: 4px;
          border: 1px solid #d6d6d6;
        }
        .section-title {
          font-size: 18px;
          font-weight: bold;
          margin-bottom: 16px;
          color: #0B0C0C;
        }
        .section-content {
          display: flex;
          flex-direction: column;
        }
        .field-container {
          display: flex;
          padding: 8px 0;
          border-bottom: 1px solid #eee;
        }
        .field-label {
          width: 40%;
          color: #505A5F;
          font-weight: 500;
        }
        .field-value {
          width: 60%;
          color: #0B0C0C;
        }
        .document-item {
          margin-bottom: 8px;
          display: flex;
          gap: 8px;
          align-items: center;
        }
        .file-name {
          color: #0B0C0C;
        }
        .file-id {
          color: #505A5F;
          font-size: 0.9em;
        }
      `}</style>
    </Card>
  );
};

export default SummaryView;
