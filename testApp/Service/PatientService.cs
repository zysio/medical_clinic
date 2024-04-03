using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using testApp.Data;
using testApp.Dto;
using testApp.Models; 

namespace testApp.Service
{

    public interface IPatientService
    {
        Task<IEnumerable<Patient>> GetAllPatientsAsync();
        Patient AddPatient(PatientDto patientDto);
        Patient DeletePatient(Patient p);
    }

    public class PatientService : IPatientService
    {
        private readonly AppDbContext _dbContext;

        public PatientService(AppDbContext dbDontext)
        {
            _dbContext = dbDontext;
        }
        public async Task<IEnumerable<Patient>> GetAllPatientsAsync()
        {
            return await _dbContext.Patients.ToListAsync();
        }

        public Patient AddPatient(PatientDto patientDto)
        {
            var patient = new Patient(patientDto.first_name, patientDto.last_name, patientDto.PESEL);


            _dbContext.Patients.Add(patient);
            _dbContext.SaveChanges();

            var address = new Address(patientDto.street, patientDto.city, patientDto.zip_code, patient.patient_id);
            _dbContext.Address.Add(address);
            _dbContext.SaveChanges();

            return patient;
        }

        public Patient DeletePatient(Patient p)
        {
            var id = p.patient_id;
            var patient = _dbContext.Patients.Find(id);
            var address = _dbContext.Address.FirstOrDefault(a => a.patient_id == id);

            if(address != null && patient != null)
            {
                _dbContext.Address.Remove(address);
                _dbContext.SaveChanges();

                _dbContext.Patients.Remove(patient);
                _dbContext.SaveChanges();
            }

            return patient;
        }
    }
}