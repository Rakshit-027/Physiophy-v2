import { useEffect, useState } from "react";
import supabase from "./SupabaseClient";
import { Activity, Award, ClipboardList, User } from 'lucide-react';
import './PatientPanel.css';

const PatientPanel = () => {
  const [patientData, setPatientData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPatientDetails();
  }, []);

  const fetchPatientDetails = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session || !session.user) {
        console.error("User session not found");
        setLoading(false);
        return;
      }
  
      const userId = session.user.id;
      const { data, error } = await supabase
        .from("patients")
        .select("*")
        .eq("user_id", userId)
        .single();
  
      if (error) {
        console.error("Error fetching patient data:", error);
      } else {
        setPatientData(data);
      }
    } catch (error) {
      console.error("Unexpected error fetching patient details:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="patient-panel">
      <div className="patient-panel-header">
        <User className="header-icon" size={32} />
        <h2>Patient Dashboard</h2>
      </div>

      {loading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p className="loading">Loading your information...</p>
        </div>
      ) : patientData ? (
        <div className="patient-data">
          <div className="data-card">
            <div className="card-header">
              <Activity className="card-icon" size={24} />
              <h3>Sessions Information</h3>
            </div>
            <div className="card-content">
              <div className="sessions-counter">
                <span className="number">{patientData.sessions_left}</span>
                <span className="label">Sessions Remaining</span>
              </div>
            </div>
          </div>

          <div className="data-card">
            <div className="card-header">
              <Award className="card-icon" size={24} />
              <h3>Progress & Improvements</h3>
            </div>
            <div className="card-content">
              <p className="improvements">{patientData.improvements || "No improvements recorded yet."}</p>
            </div>
          </div>

          <div className="data-card">
            <div className="card-header">
              <ClipboardList className="card-icon" size={24} />
              <h3>Exercise Plan</h3>
            </div>
            <div className="card-content">
              <p className="exercise-plan">{patientData.exercise_plan || "No exercise plan assigned yet."}</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="empty-state">
          <User size={48} />
          <p className="no-data">No patient data found</p>
        </div>
      )}
    </div>
  );
};

export default PatientPanel;