import React, { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import "./overview.css";

const MedicalRecords = () => {
  const [name, setName] = useState("");
  const [disorder, setDisorder] = useState("");
  const [medicines, setMedicines] = useState([{ name: "", dosage: "" }]);
  const [images, setImages] = useState([]);
  const [entries, setEntries] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [storageError, setStorageError] = useState(null);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("medicalRecords");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setEntries(parsed);
        }
      }
    } catch (error) {
      setStorageError("Failed to load saved data. Please refresh the page.");
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save to localStorage on entries change
  useEffect(() => {
    if (!isLoaded) return;
    
    try {
      localStorage.setItem("medicalRecords", JSON.stringify(entries));
      setStorageError(null);
    } catch (error) {
      console.error("Failed to save data to localStorage:", error);
      setStorageError(error.name === "QuotaExceededError" 
        ? "Storage is full. Please delete some entries." 
        : "Failed to save data. Please try again.");
    }
  }, [entries, isLoaded]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: acceptedFiles => {
      if (images.length >= 3) {
        return;
      }
      const filesToAdd = acceptedFiles.slice(0, 3 - images.length);
      filesToAdd.forEach(file => {
        const reader = new FileReader();
        reader.onload = () => setImages(prev => [...prev, reader.result]);
        reader.readAsDataURL(file);
      });
    },
    accept: { "image/*": [] },
    maxFiles: 3
  });

  const handleAddMedicine = () => {
    setMedicines([...medicines, { name: "", dosage: "" }]);
  };

  const handleRemoveMedicine = (index) => {
    if (medicines.length > 1) {
      setMedicines(medicines.filter((_, i) => i !== index));
    }
  };

  const handleMedicineChange = (index, field, value) => {
    const updated = [...medicines];
    updated[index][field] = value;
    setMedicines(updated);
  };

  const handleRemoveImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (images.length < 1) {
      alert("Please upload at least 1 image");
      return;
    }

    const newEntry = { 
      name, 
      disorder, 
      medicines: medicines.filter(m => m.name.trim() && m.dosage.trim()),
      images 
    };

    setEntries(prev => 
      editIndex !== null 
        ? prev.map((item, i) => i === editIndex ? newEntry : item) 
        : [...prev, newEntry]
    );

    // Reset form
    setName("");
    setDisorder("");
    setMedicines([{ name: "", dosage: "" }]);
    setImages([]);
    setEditIndex(null);
  };

  const handleEdit = (index) => {
    const entry = entries[index];
    setName(entry.name);
    setDisorder(entry.disorder);
    setMedicines(entry.medicines.length ? entry.medicines : [{ name: "", dosage: "" }]);
    setImages(entry.images);
    setEditIndex(index);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (index) => {
    if (window.confirm("Are you sure you want to delete this entry?")) {
      setEntries(prev => prev.filter((_, i) => i !== index));
    }
  };

  const handleClearAll = () => {
    if (window.confirm("Are you sure you want to delete ALL entries?")) {
      setEntries([]);
      localStorage.removeItem("medicalRecords");
    }
  };

  return (
    <div className="medical-records-container">
      <header className="app-header">
        <h1>Medical Records Manager</h1>
        <p>Track your genetic disorders and medications in one place</p>
      </header>

      {storageError && <div className="error-message">{storageError}</div>}

      <form className="record-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="John Doe"
            required
          />
        </div>

        <div className="form-group">
          <label>Health issue</label>
          <input
            type="text"
            value={disorder}
            onChange={(e) => setDisorder(e.target.value)}
            placeholder="e.g., Cystic Fibrosis"
            required
          />
        </div>

        <div className="medicines-section">
          <label>Medications</label>
          {medicines.map((med, index) => (
            <div key={index} className="medicine-input-group">
              <input
                type="text"
                value={med.name}
                onChange={(e) => handleMedicineChange(index, "name", e.target.value)}
                placeholder="Medicine name"
                required
              />
              <input
                type="text"
                value={med.dosage}
                onChange={(e) => handleMedicineChange(index, "dosage", e.target.value)}
                placeholder="Dosage"
                required className="dosage"
              />
              {medicines.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemoveMedicine(index)}
                  className="remove-medicine-btn"
                >
                  ×
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddMedicine}
            className="add-medicine-btn"
          >
            + Add Medicine
          </button>
        </div>

        <div className="upload-section">
          <label>
            Please add Doctor authorized or signed report <span>(Upload 1-3 images) atleast one</span>
          </label>
          <div {...getRootProps()} className={`dropzone ${isDragActive ? "active" : ""}`}>
            <input {...getInputProps()} />
            <div className="dropzone-content">
              {isDragActive ? (
                <p>Drop files here</p>
              ) : (
                <>
                  <p>Drag & drop files here</p>
                  <p>or click to browse</p>
                </>
              )}
            </div>
          </div>

          {images.length > 0 && (
            <div className="image-previews">
              <p>Uploaded files ({images.length}/3):</p>
              <div className="preview-container">
                {images.map((img, i) => (
                  <div key={i} className="image-preview">
                    <img src={img} alt={`Preview ${i}`} />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(i)}
                      className="remove-image-btn"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="form-actions">
          <button type="submit" className="primary-button">
            {editIndex !== null ? "Update Record" : "Save Record"}
          </button>
          {editIndex !== null && (
            <button
              type="button"
              onClick={() => {
                setName("");
                setDisorder("");
                setMedicines([{ name: "", dosage: "" }]);
                setImages([]);
                setEditIndex(null);
              }}
              className="secondary-button"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <section className="records-section">
        <div className="section-header">
          <h2>Your Medical Records</h2>
          {entries.length > 0 && (
            <button onClick={handleClearAll} className="clear-all-btn">
              Clear All
            </button>
          )}
        </div>

        {entries.length === 0 ? (
          <div className="empty-state">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h4>No records found</h4>
            <p>Add your first medical record above</p>
          </div>
        ) : (
          <div className="records-grid">
            {entries.map((entry, index) => (
              <div key={index} className="record-card">
                <div className="card-header">
                  <h3>{entry.name}</h3>
                  <div className="card-actions">
                    <button onClick={() => handleEdit(index)} className="edit-btn">
                      <img src="/src/assets/edit.svg" alt="" />
                    </button>
                    <button onClick={() => handleDelete(index)} className="delete-btn">
                      <img src="/src/assets/trash.svg" alt="" />
                    </button>
                  </div>
                </div>
                <p><strong>Disorder:</strong> {entry.disorder}</p>
                
                {entry.medicines.length > 0 && (
                  <div className="medicines-list">
                    <strong>Medications:</strong>
                    <ul>
                      {entry.medicines.map((med, i) => (
                        <li key={i}>
                          {med.name} - {med.dosage}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {entry.images.length > 0 && (
                  <div className="record-images">
                    <strong>Documents:</strong>
                    <div className="image-thumbnails">
                      {entry.images.map((img, i) => (
                        <div key={i} className="thumbnail">
                          <img 
                            src={img} 
                            alt={`Document ${i}`} 
                            onClick={() => window.open(img, '_blank')}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default MedicalRecords;