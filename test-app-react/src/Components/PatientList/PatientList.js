import React, { useState } from 'react';
import "./PatientList.css";


function PatientList({ patients }) {
  const [sortBy, setSortBy] = useState(null);

  const handleSort = (key) => {
      // check if key is the same
    if (sortBy === key) {
      setSortBy((prevSortBy) => (prevSortBy.startsWith('-') ? key : `-${key}`));
    } else {
      setSortBy(key);
    }
  };

  const getNestedPropertyValue = (object, path) => {
    return path.split('.').reduce((obj, key) => obj && obj[key], object);
  };

  const sortedPatients = sortBy ? [...patients].sort((a, b) => {
    const propA = getNestedPropertyValue(a, sortBy);
    const propB = getNestedPropertyValue(b, sortBy);
  
    // check if one of fields is undefined
    if (propA === undefined || propB === undefined) {
      return propA === undefined ? 1 : -1;
    }
  
    
    if (typeof propA === 'string') {
      return sortBy.startsWith('-') ? propB.localeCompare(propA) : propA.localeCompare(propB);
    } else {
      return sortBy.startsWith('-') ? propB - propA : propA - propB;
    }
  }) : patients;

  return (
    <table>
      <thead>
        <tr>
          <th onClick={() => handleSort('patient_id')}>Patient Id</th>
          <th onClick={() => handleSort('first_name')}>First name</th>
          <th onClick={() => handleSort('last_name')}>Last name</th>
          <th onClick={() => handleSort('pesel')}>PESEL</th>
          <th onClick={() => handleSort('address.city')}>City</th>
          <th onClick={() => handleSort('address.street')}>Street</th>
          <th onClick={() => handleSort('address.zip_code')}>zip-code</th>
        </tr>
      </thead>
      <tbody>
        {sortedPatients.map((patient) => (
          <tr key={patient.patient_id}>
            <td>{patient.patient_id}</td>
            <td>{patient.first_name}</td>
            <td>{patient.last_name}</td>
            <td>{patient.pesel}</td>
            <td>{patient.address.city}</td>
            <td>{patient.address.street}</td>
            <td>{patient.address.zip_code}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default PatientList;