import React, { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";

const YourData = () => {
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
      const saved = localStorage.getItem("yourData");
      if (saved) {
        const parsed = JSON.parse(saved);
        // Validate loaded data structure
        if (Array.isArray(parsed) && parsed.every(entry => 
          typeof entry === 'object' && 
          entry.name && 
          entry.disorder && 
          Array.isArray(entry.medicines) && 
          Array.isArray(entry.images)
        )) {
          setEntries(parsed);
        } else {
          console.warn("Invalid data structure in localStorage, resetting...");
          localStorage.removeItem("yourData");
        }
      }
    } catch (error) {
      console.error("Failed to load data from localStorage:", error);
      setStorageError("Failed to load saved data. Please refresh the page.");
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save to localStorage on entries change
  useEffect(() => {
    if (!isLoaded) return; // Don't save before initial load
    
    try {
      localStorage.setItem("yourData", JSON.stringify(entries));
      setStorageError(null);
    } catch (error) {
      console.error("Failed to save data to localStorage:", error);
      if (error.name === "QuotaExceededError") {
        setStorageError("Storage is full. Please delete some entries.");
      } else {
        setStorageError("Failed to save data. Please try again.");
      }
    }
  }, [entries, isLoaded]);

  // Dropzone handler (multiple files)
  const onDrop = (acceptedFiles) => {
    if (images.length >= 3) {
      alert("Maximum 3 images allowed");
      return;
    }

    const filesToAdd = Math.min(acceptedFiles.length, 3 - images.length);
    const newImages = [];

    acceptedFiles.slice(0, filesToAdd).forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        newImages.push(reader.result);
        if (newImages.length === filesToAdd) {
          setImages(prev => [...prev, ...newImages]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
    },
    multiple: true,
    maxFiles: 3,
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
      alert("Please upload at least 1 image (real doctor authorized or signed photo).");
      return;
    }

    setEntries(prevEntries => {
      const newData = { 
        name, 
        disorder, 
        medicines: medicines.filter(m => m.name.trim() && m.dosage.trim()),
        images 
      };
      
      if (editIndex !== null) {
        const updated = [...prevEntries];
        updated[editIndex] = newData;
        return updated;
      } else {
        return [...prevEntries, newData];
      }
    });

    // Reset form
    setName("");
    setDisorder("");
    setMedicines([{ name: "", dosage: "" }]);
    setImages([]);
    setEditIndex(null);
  };

  const handleEdit = (index) => {
    const data = entries[index];
    setName(data.name);
    setDisorder(data.disorder);
    setMedicines(data.medicines.length > 0 ? data.medicines : [{ name: "", dosage: "" }]);
    setImages(data.images);
    setEditIndex(index);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (index) => {
    if (window.confirm("Are you sure you want to delete this entry?")) {
      setEntries(prev => prev.filter((_, i) => i !== index));
    }
  };

  const handleClearAll = () => {
    if (window.confirm("Are you sure you want to delete ALL entries? This cannot be undone.")) {
      setEntries([]);
      localStorage.removeItem("yourData");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h2 className="text-3xl font-bold">Your Data</h2>

      {storageError && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
          <p>{storageError}</p>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-xl p-6 space-y-4"
      >
        <div>
          <label className="block mb-1 font-medium">Full Name</label>
          <input
            type="text"
            placeholder="Full Name"
            className="w-full border p-2 rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Genetic Disorder</label>
          <input
            type="text"
            placeholder="Genetic Disorder"
            className="w-full border p-2 rounded"
            value={disorder}
            onChange={(e) => setDisorder(e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <label className="font-medium">Medicines</label>
          {medicines.map((med, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                type="text"
                placeholder="Medicine Name"
                className="w-1/2 border p-2 rounded"
                value={med.name}
                onChange={(e) =>
                  handleMedicineChange(index, "name", e.target.value)
                }
                required
              />
              <input
                type="text"
                placeholder="Dosage"
                className="w-1/2 border p-2 rounded"
                value={med.dosage}
                onChange={(e) =>
                  handleMedicineChange(index, "dosage", e.target.value)
                }
                required
              />
              {medicines.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemoveMedicine(index)}
                  className="text-red-600 font-bold"
                >
                  ×
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            className="text-blue-600 font-semibold"
            onClick={handleAddMedicine}
          >
            + Add Medicine
          </button>
        </div>

        <div>
          <label className="block mb-1 font-semibold text-red-600">
            Upload 1 to 3 images <br />
            <span className="text-sm font-normal text-gray-700">
              Please add at least one real doctor authorized or signed photo.
            </span>
          </label>
          <div
            {...getRootProps()}
            className={`border-2 border-dashed p-6 rounded cursor-pointer text-center ${
              isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"
            }`}
          >
            <input {...getInputProps()} />
            {isDragActive ? (
              <p>Drop the images here ...</p>
            ) : (
              <p>Drag & drop up to 3 images here, or click to select files</p>
            )}
          </div>

          <div className="mt-4 flex flex-wrap gap-4">
            {images.map((img, i) => (
              <div key={i} className="relative w-24 h-24 rounded overflow-hidden border">
                <img
                  src={img}
                  alt={`upload-${i}`}
                  className="object-cover w-full h-full"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(i)}
                  className="absolute top-0 right-0 bg-red-600 text-white rounded-full w-6 h-6 text-center leading-6 hover:bg-red-700"
                  title="Remove image"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            className="bg-blue-600 text-white rounded px-6 py-2 hover:bg-blue-700 transition"
          >
            {editIndex !== null ? "Update Data" : "Save Data"}
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
              className="bg-gray-500 text-white rounded px-6 py-2 hover:bg-gray-600 transition"
            >
              Cancel Edit
            </button>
          )}
        </div>
      </form>

      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-semibold">Saved Entries</h3>
          {entries.length > 0 && (
            <button
              onClick={handleClearAll}
              className="text-red-600 text-sm hover:underline"
            >
              Clear All Data
            </button>
          )}
        </div>
        
        {entries.length === 0 && (
          <div className="border p-4 rounded text-center text-gray-500">
            No data saved yet. Fill the form above to create your first entry.
          </div>
        )}

        <div className="space-y-6">
          {entries.map((entry, index) => (
            <div
              key={index}
              className="border p-4 rounded shadow-sm bg-gray-50 flex flex-col gap-2"
            >
              <div className="flex justify-between items-center">
                <h4 className="text-lg font-bold">{entry.name}</h4>
                <div className="flex gap-2">
                  <button
                    className="text-blue-600 hover:underline text-sm"
                    onClick={() => handleEdit(index)}
                  >
                    <img src="/src/assets/edit.svg" alt="" />
                  </button>
                  <button
                    className="text-red-600 hover:underline text-sm"
                    onClick={() => handleDelete(index)}
                  >
                    <img src="/src/assets/trash.svg" alt="" />
                  </button>
                </div>
              </div>
              <p>
                <span className="font-semibold">Genetic Disorder:</span>{" "}
                {entry.disorder}
              </p>
              <div>
                <span className="font-semibold">Medicines:</span>
                <ul className="list-disc list-inside">
                  {entry.medicines.map((med, i) => (
                    <li key={i}>
                      {med.name} - {med.dosage}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex gap-3 flex-wrap">
                {entry.images.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt={`entry-${index}-img-${i}`}
                    className="w-20 h-20 object-cover rounded border"
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default YourData;