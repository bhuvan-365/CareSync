import React, { useEffect, useState, useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";
import "./report.css";

const Report = () => {
  const [records, setRecords] = useState([]);
  const [qrData, setQrData] = useState(null);
  const qrRef = useRef(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("medicalRecords")) || [];
    setRecords(stored);
  }, []);

  const generateQR = () => {
    if (!records.length) return;
    const { name, disorder, medicines } = records[0];
    
    // Create a formatted text version of the data
    const formattedData = `
      Medical Report:      
      Patient Name: ${name}
      Diagnosis: ${disorder}
      
      Prescribed Medicines:
      ${medicines.map(med => `- ${med.name} (${med.dosage})`).join("\n      ")}
      
      Generated on: ${new Date().toLocaleDateString()}
    `;
    
    setQrData(formattedData);
  };

  const refresh = () => {
    const updated = JSON.parse(localStorage.getItem("medicalRecords")) || [];
    setRecords(updated);
    setQrData(null);
  };

  const downloadQR = () => {
    if (!qrRef.current) return;
    
    const canvas = qrRef.current.querySelector("canvas");
    if (!canvas) return;
    
    const link = document.createElement("a");
    link.download = `${records[0]?.name || 'medical'}-qr.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  const shareQR = async () => {
    if (!qrRef.current) return;
    
    const canvas = qrRef.current.querySelector("canvas");
    if (!canvas) return;
    
    try {
      const blob = await new Promise(resolve => canvas.toBlob(resolve));
      const file = new File([blob], "medical-qr.png", { type: "image/png" });
      
      if (navigator.share && navigator.canShare?.({ files: [file] })) {
        await navigator.share({
          title: "Medical Report QR",
          text: `QR code for ${records[0]?.name || 'patient'}'s medical report`,
          files: [file]
        });
      } else {
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `${records[0]?.name || 'medical'}-qr.png`;
        link.click();
        alert("Downloading QR code instead (sharing not supported)");
      }
    } catch (error) {
      console.error("Error sharing:", error);
      alert("Couldn't share the QR code. Try downloading instead.");
    }
  };

  return (
    <div className="report-container">
      <div className="left-panel">
        <h2>Medical Report</h2>
        {records.length > 0 ? (
          <div className="record">
            <p><strong>Name:</strong> {records[0].name}</p>
            <p><strong>Health issue:</strong> {records[0].disorder}</p>
            <p><strong>Medicines:</strong></p>
            <ul>
              {records[0].medicines.map((med, i) => (
                <li key={i}>{med.name} - {med.dosage}</li>
              ))}
            </ul>
            {records[0].images?.[0] && (
              <div className="image-preview">
                <p><strong>Report Image:</strong></p>
                <img
                  src={records[0].images[0]}
                  alt="Medical Report"
                  className="report-image"
                />
              </div>
            )}
          </div>
        ) : (
          <p>No record found.</p>
        )}
      </div>

      <div className="right-panel">
        <div className="button-row">
          <button onClick={refresh}>Refresh</button>
          <button onClick={generateQR}>Generate QR</button>
        </div>
        {qrData && (
          <div className="qr-container" ref={qrRef}>
            <QRCodeCanvas
              value={qrData}
              size={200}
              level={"H"}
              includeMargin={true}
            />
            <p className="qr-caption">Scan to view medical report</p>
            
            <div className="qr-actions">
              <button className="download-btn" onClick={downloadQR}>
                Download QR
              </button>
              <button className="share-btn" onClick={shareQR}>
                Share QR
              </button>
            </div>
            
            {/* <div className="qr-preview">
              <h4>What the QR contains:</h4>
              <pre>{qrData}</pre>
            </div> */}
          </div>
        )}
      </div>
    </div>
  );
};

export default Report;