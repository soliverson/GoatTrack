document.addEventListener('DOMContentLoaded', function() {
    const goatData = {
      id: '',
      name: '',
      sex: '',
      dateOfBirth: '',
      breed: '',
      medicalRecords: [],
      vetVisits: []
    };
  
    const goatProfileForm = document.getElementById('goatProfileForm');
    const medicalRecordsContainer = document.getElementById('medicalRecordsContainer');
    const vetVisitsContainer = document.getElementById('vetVisitsContainer');
  
    goatProfileForm.addEventListener('input', handleChange);
    document.getElementById('addMedicalRecordButton').addEventListener('click', addMedicalRecord);
    document.getElementById('addVetVisitButton').addEventListener('click', addVetVisit);
    goatProfileForm.addEventListener('submit', handleSubmit);
  
    function handleChange(event) {
      const { name, value } = event.target;
      goatData[name] = value;
    }
  
    function addMedicalRecord() {
      const index = goatData.medicalRecords.length;
      goatData.medicalRecords.push({ date: '', description: '' });
  
      const recordDiv = document.createElement('div');
      recordDiv.innerHTML = `
        <label>Date:</label>
        <input type="date" name="medicalDate${index}">
        <label>Description:</label>
        <input type="text" name="medicalDescription${index}">
      `;
  
      medicalRecordsContainer.appendChild(recordDiv);
  
      document.querySelector(`[name="medicalDate${index}"]`).addEventListener('input', (e) => updateMedicalRecord(index, 'date', e.target.value));
      document.querySelector(`[name="medicalDescription${index}"]`).addEventListener('input', (e) => updateMedicalRecord(index, 'description', e.target.value));
    }
  
    function updateMedicalRecord(index, field, value) {
      goatData.medicalRecords[index][field] = value;
    }
  
    function addVetVisit() {
      const index = goatData.vetVisits.length;
      goatData.vetVisits.push({ date: '', vetName: '', reason: '' });
  
      const visitDiv = document.createElement('div');
      visitDiv.innerHTML = `
        <label>Date:</label>
        <input type="date" name="vetDate${index}">
        <label>Vet Name:</label>
        <input type="text" name="vetName${index}">
        <label>Reason:</label>
        <input type="text" name="vetReason${index}">
      `;
  
      vetVisitsContainer.appendChild(visitDiv);
  
      document.querySelector(`[name="vetDate${index}"]`).addEventListener('input', (e) => updateVetVisit(index, 'date', e.target.value));
      document.querySelector(`[name="vetName${index}"]`).addEventListener('input', (e) => updateVetVisit(index, 'vetName', e.target.value));
      document.querySelector(`[name="vetReason${index}"]`).addEventListener('input', (e) => updateVetVisit(index, 'reason', e.target.value));
    }
  
    function updateVetVisit(index, field, value) {
      goatData.vetVisits[index][field] = value;
    }
  
    function handleSubmit(event) {
      event.preventDefault();
      // Save goatData to your backend or local storage
      console.log(goatData);
    }
  });
  