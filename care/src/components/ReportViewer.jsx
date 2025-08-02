import React from "react";
import "./reportViewer.css";

const ReportViewer = ({ data }) => {
  if (!data) return <div className="report-error">No report data found</div>;

  return (
    <div className="report-viewer-container">
      <header className="report-header">
        <h1>Medical Report</h1>
        <div className="hospital-info">
          <p>MediScan Healthcare</p>
          <p>123 Health Street, MedCity</p>
        </div>
      </header>

      <div className="patient-info-section">
        <h2>Patient Information</h2>
        <div className="info-grid">
          <div className="info-item">
            <span className="info-label">Name:</span>
            <span className="info-value">{data.n || "Not specified"}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Date:</span>
            <span className="info-value">{new Date().toLocaleDateString()}</span>
          </div>
        </div>
      </div>

      <div className="diagnosis-section">
        <h2>Diagnosis</h2>
        <div className="diagnosis-card">
          <p>{data.d || "No diagnosis information available"}</p>
        </div>
      </div>

      <div className="medication-section">
        <h2>Prescribed Medications</h2>
        {data.m && data.m.length > 0 ? (
          <ul className="medication-list">
            {data.m.map((med, index) => (
              <li key={index} className="medication-item">
                <span className="med-name">{med.n}</span>
                <span className="med-dosage">{med.d}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="no-meds">No medications prescribed</p>
        )}
      </div>

      <footer className="report-footer">
        <p>Scan ID: {Math.random().toString(36).substring(2, 10).toUpperCase()}</p>
        <p className="disclaimer">
          This report is generated automatically. Please consult your doctor for interpretation.
        </p>
      </footer>
    </div>
  );
};

export default ReportViewer;