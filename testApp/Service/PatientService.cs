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

        string EditPatient(PatientWithIdDto patientDto);
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
            //return await _dbContext.Patients.ToListAsync();
            return await _dbContext.Patients.Include(p => p.Address).ToListAsync(); 
        }

        public Patient AddPatient(PatientDto patientDto)
        {

            var address = new Address(patientDto.Street, patientDto.City, patientDto.Zip_code);
            _dbContext.Address.Add(address);
            _dbContext.SaveChanges();


            var patient = new Patient(patientDto.First_name, patientDto.Last_name, patientDto.PESEL, address.Id);
            _dbContext.Patients.Add(patient);
            _dbContext.SaveChanges();

  

            return patient;
        }
        public string EditPatient(PatientWithIdDto patientDto)
        {
            var patient = _dbContext.Patients.Find(patientDto.Patient_id);
            var address = _dbContext.Address.Find(patient.Address_id);
            if (patient != null)
            {
                patient.First_name = patientDto.First_name;
                patient.Last_name = patientDto.Last_name;
                patient.PESEL = patientDto.PESEL;
            }
            else return null;

            if(address != null)
            {
                address.Street = patientDto.Street;
                address.City = patientDto.City;
                address.Zip_code = patientDto.Zip_code;
            }

            _dbContext.SaveChanges();


            return "Data has been changed";
        }

        public Patient DeletePatient(Patient p)
        {
            var id = p.Patient_id;
            var patient = _dbContext.Patients.Find(id);
            var address = _dbContext.Address.Find(patient.Address_id);

            if(address != null)
            {
                _dbContext.Address.Remove(address);
                _dbContext.SaveChanges();
            }

            if (patient != null)
            {
                _dbContext.Entry(patient).State = EntityState.Deleted;

                try
                {
                    _dbContext.SaveChanges();
                }
                catch (DbUpdateConcurrencyException ex)
                {
                }
            }

            return p;
        }

    }
}