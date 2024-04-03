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
    }
}