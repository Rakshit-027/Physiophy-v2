import { useEffect, useState } from "react"
import supabase from "./SupabaseClient"
import { Users, UserPlus, Activity, ClipboardList, Award } from 'lucide-react'
import "./AdminPanel.css"

const AdminPanel = () => {
  const [patients, setPatients] = useState([])
  const [selectedPatient, setSelectedPatient] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchPatients()
  }, [])

  const fetchPatients = async () => {
    try {
      const { data: patientData, error: patientError } = await supabase
        .from('patients')
        .select(`
          *,
          users:user_id (
            id,
            full_name,
            role
          )
        `)
        .order('created_at', { ascending: false })

      if (patientError) throw patientError

      const validPatients = patientData
        .filter(p => p.users && p.users.role === 'patient')
        .map(p => ({
          id: p.users.id,
          full_name: p.users.full_name,
          sessions_left: p.sessions_left,
          exercise_plan: p.exercise_plan,
          improvements: p.improvements,
          created_at: p.created_at
        }))

      console.log("Valid patients:", validPatients)
      setPatients(validPatients)
      setError(null)
    } catch (err) {
      console.error("Error fetching data:", err)
      setError("Failed to load patients data")
    } finally {
      setLoading(false)
    }
  }

  const handlePatientSelect = (patient) => {
    console.log("Selected patient:", patient)
    setSelectedPatient(patient)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setSelectedPatient((prevPatient) => ({
      ...prevPatient,
      [name]: value,
    }))
  }

  const handleUpdate = async () => {
    try {
      console.log("Attempting to update patient:", selectedPatient)

      const { data: userExists, error: userError } = await supabase
        .from('users')
        .select('id')
        .eq('id', selectedPatient.id)
        .eq('role', 'patient')
        .single()

      if (userError || !userExists) {
        throw new Error("This patient's user account is no longer active")
      }

      const updateData = {
        user_id: selectedPatient.id,
        sessions_left: parseInt(selectedPatient.sessions_left) || 0,
        exercise_plan: selectedPatient.exercise_plan || "",
        improvements: selectedPatient.improvements || ""
      }

      console.log("Update data:", updateData)

      const { data: existingRecord, error: checkError } = await supabase
        .from('patients')
        .select('id')
        .eq('user_id', selectedPatient.id)
        .single()

      if (checkError && checkError.code !== 'PGRST116') {
        throw checkError
      }

      let updateError
      if (existingRecord) {
        const { error } = await supabase
          .from('patients')
          .update(updateData)
          .eq('user_id', selectedPatient.id)
        updateError = error
      } else {
        const { error } = await supabase
          .from('patients')
          .insert([updateData])
        updateError = error
      }

      if (updateError) {
        console.error("Update error:", updateError)
        throw new Error("Failed to update patient record")
      }

      const successMessage = document.createElement('div')
      successMessage.className = 'success-message'
      successMessage.textContent = 'Patient details updated successfully!'
      document.body.appendChild(successMessage)
      
      setTimeout(() => {
        document.body.removeChild(successMessage)
      }, 3000)

      setSelectedPatient(null)
      fetchPatients()
    } catch (err) {
      console.error("Error in handleUpdate:", err)
      const errorMessage = document.createElement('div')
      errorMessage.className = 'error-message'
      errorMessage.textContent = `Error: ${err.message}`
      document.body.appendChild(errorMessage)
      
      setTimeout(() => {
        document.body.removeChild(errorMessage)
      }, 3000)
    }
  }

  return (
    <div className="admin-panel">
      <div className="admin-panel-header">
        <Users className="header-icon" size={32} />
        <h2>Patient Management Dashboard</h2>
      </div>

      {loading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p className="loading">Loading patients data...</p>
        </div>
      ) : (
        <div className="admin-panel-content">
          <div className="patients-list">
            <div className="section-header">
              <UserPlus className="section-icon" size={24} />
              <h3>Patients Directory ({patients.length})</h3>
            </div>
            {patients.length === 0 ? (
              <div className="empty-state">
                <Users size={48} />
                <p>No active patients found</p>
              </div>
            ) : (
              <ul>
                {patients.map((patient) => (
                  <li key={patient.id} className={`patient-item ${selectedPatient?.id === patient.id ? 'selected' : ''}`}>
                    <div className="patient-info">
                      <span className="patient-name">{patient.full_name}</span>
                      <span className="sessions-badge">
                        {patient.sessions_left || 0} sessions left
                      </span>
                    </div>
                    <button className="edit-button" onClick={() => handlePatientSelect(patient)}>
                      Edit Details
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {selectedPatient && (
            <div className="edit-patient-form">
              <div className="section-header">
                <ClipboardList className="section-icon" size={24} />
                <h3>Edit Patient Profile</h3>
              </div>
              <form onSubmit={(e) => {
                e.preventDefault()
                handleUpdate()
              }}>
                <div className="form-group">
                  <label>
                    <span className="label-text">Patient Name</span>
                    <input type="text" value={selectedPatient.full_name} readOnly className="readonly-input" />
                  </label>
                </div>

                <div className="form-group">
                  <label>
                    <span className="label-text">
                      <Activity className="input-icon" size={18} />
                      Sessions Left
                    </span>
                    <input
                      type="number"
                      name="sessions_left"
                      value={selectedPatient.sessions_left || 0}
                      onChange={handleChange}
                      min="0"
                    />
                  </label>
                </div>

                <div className="form-group">
                  <label>
                    <span className="label-text">
                      <ClipboardList className="input-icon" size={18} />
                      Exercise Plan
                    </span>
                    <textarea
                      name="exercise_plan"
                      value={selectedPatient.exercise_plan || ""}
                      onChange={handleChange}
                      rows="4"
                    />
                  </label>
                </div>

                <div className="form-group">
                  <label>
                    <span className="label-text">
                      <Award className="input-icon" size={18} />
                      Improvements
                    </span>
                    <textarea
                      name="improvements"
                      value={selectedPatient.improvements || ""}
                      onChange={handleChange}
                      rows="4"
                    />
                  </label>
                </div>

                <div className="form-buttons">
                  <button type="submit" className="submit-button">Update Patient</button>
                  <button type="button" className="cancel-button" onClick={() => setSelectedPatient(null)}>Cancel</button>
                </div>
              </form>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default AdminPanel