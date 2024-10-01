import { useState } from 'react';
import '../../assets/css/outletCss/Mainboard.css';
import { useSelector } from 'react-redux';
import GymObject from '../../Models/GymObject';
import { FaMinusCircle } from "react-icons/fa";

const Mainboard = () => {
  const [newGym, setNewGym] = useState(new GymObject());
  const userData = useSelector((state) => state.UserReducer.userData);
  const GymData = useSelector((state) => state.GymReducer.GymData);

  // State to control form visibility
  const [showGymRegistration, setShowGymRegistration] = useState(false);
  const [gymPlans, setGymPlans] = useState([]); // Array of gym plans
  const [gymEmployees, setGymEmployees] = useState([]); // Array of gym employees

  // Handler to add a new plan input
  const addGymPlan = () => {
    setGymPlans([...gymPlans, { planName: '', planPrice: '' }]);
  };

  // Handler to add a new employee input
  const addGymEmployee = () => {
    setGymEmployees([...gymEmployees, { employeeName: '', employeeRole: '' }]);
  };

  return (
    <div className='Mainboard'>
      <p className='titleMainboard'>Bienvenue sur votre tableau de bord, {!GymData ? `Undefined` : `${GymData.gymName}`}</p>

      {
        !GymData.gymName ? (
          <>
            <div className='registerGym'>
              <p>Ajouter votre salle de sport</p>
              <button onClick={() => setShowGymRegistration(true)}>Ajouter une salle</button>
            </div>

            {/* Gym Registration Form */}
            {
              showGymRegistration && (
                <div className="gymRegistorBox">
                  <p>Veulliez remplir ce formulaire</p>
                  <input
                    className='input'
                    type="text"
                    placeholder='Entrez le nom de votre salle'
                    onChange={(e) => setNewGym({ ...newGym, gymName: e.currentTarget.value })}
                  />
                  <input
                    className='input'
                    type="text"
                    placeholder='Entrez l\ adresse de votre salle'
                    onChange={(e) => setNewGym({ ...newGym, gymLocation: e.currentTarget.value })}
                  />

                  {/* Gym Plan Section */}
                  <div className="gymplans">
                    <button
                      className='buttonsGymPlansANDEmployees'
                      onClick={addGymPlan}
                    >
                      Créer un plan
                    </button>

                    {/* Render input for each gym plan */}
                    {
                      gymPlans.map((plan, index) => (
                        <div className='divGymPlanInputs' key={index}>
                          <input
                            className='input gymPlanName'
                            type="text"
                            placeholder={`Nom du pack ${index + 1}`}
                            value={plan.planName}
                            onChange={(e) => {
                              const updatedPlans = [...gymPlans];
                              updatedPlans[index].planName = e.currentTarget.value;
                              setGymPlans(updatedPlans);
                            }}
                          />
                          <input
                            className='input priceInput'
                            type="text"
                            placeholder='Prix en DH'
                            value={plan.planPrice}
                            onChange={(e) => {
                              const updatedPlans = [...gymPlans];
                              updatedPlans[index].planPrice = e.currentTarget.value;
                              setGymPlans(updatedPlans);
                            }}
                          />

                          <FaMinusCircle color='red' cursor={'pointer'} onClick={() => {
                            const updatedPlans = gymPlans.filter((_, i) => i !== index); // Correctly filter using the index
                            setGymPlans(updatedPlans);
                          }} />
                        </div>
                      ))
                    }

                  </div>

                  {/* Gym Employee Section */}
                  <div className="gymemployee gymplans">
                    <button
                      className='buttonsGymPlansANDEmployees'
                      onClick={addGymEmployee}
                    >
                      Ajouter un employé
                    </button>

                    {/* Render input for each employee */}
                    {
                      gymEmployees.map((employee, index) => (
                        <div className='divGymPlanInputs' key={index}>
                          <input
                            className='input gymPlanName'
                            type="text"
                            placeholder={`Nom de l'employé ${index + 1}`}
                            value={employee.employeeName}
                            onChange={(e) => {
                              const updatedEmployees = [...gymEmployees];
                              updatedEmployees[index].employeeName = e.currentTarget.value;
                              setGymEmployees(updatedEmployees);
                            }}
                          />
                          <select
                            className='input priceInput'
                            value={employee.employeeRole}
                            onChange={(e) => {
                              const updatedEmployees = [...gymEmployees];
                              updatedEmployees[index].employeeRole = e.currentTarget.value;
                              setGymEmployees(updatedEmployees);
                            }}
                          >
                            <option value="">Son rôle</option>
                            <option value="coach">Coach</option>
                            <option value="management">Gestion</option>
                            <option value="cleaning">Femme/Homme de ménage</option>
                          </select>

                          {/* Delete button to remove employee */}

                          <FaMinusCircle color='red' cursor={'pointer'} onClick={() => {
                            const updatedEmployees = gymEmployees.filter((_, i) => i !== index); // Correctly filter out the employee by index
                            setGymEmployees(updatedEmployees);
                          }} />

                        </div>
                      ))
                    }

                  </div>
                </div>
              )
            }
          </>
        ) : (
          <></>
        )
      }
    </div>
  );
}

export default Mainboard;
