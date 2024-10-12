import { Gender, Patient } from "../../types";
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import TransgenderIcon from '@mui/icons-material/Transgender';
import patientService from "../../services/patients";
import { useMatch } from "react-router-dom";
import { useEffect, useState } from "react";

const SinglePatientPage = () => {

    const [patient, setPatient] = useState<Patient>();

    const match = useMatch('/:id');

    useEffect(() => {
        const getPatient = async () => {
            const patientID = match?.params.id;
            if (patientID) {
                try {
                    const patient = await patientService.getSingle(patientID);
                    setPatient(patient);
                } catch (error) {
                    console.error("Error fetching patient:", error);
                }
            }
        };
        getPatient();
    }, [match]);

    if (!patient) {
        return (
            <></>
        );
    }

    const GenderIcon = () => {
        switch(patient.gender){
            case Gender.Male:
                return <MaleIcon/>;
            case Gender.Female:
                return <FemaleIcon/>;
            case Gender.Other:
                return <TransgenderIcon/>;
        }
    };

    return (
        <div>
            <h2>{patient.name} <GenderIcon/></h2>
            <div>
                <p>ssn: {patient.ssn}</p>
                <p>occupation: {patient.occupation}</p>
            </div>
        </div>
    );
};

export default SinglePatientPage;