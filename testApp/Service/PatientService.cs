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

            var address = new Address(patientDto.street, patientDto.city, patientDto.zip_code);
            _dbContext.Address.Add(address);
            _dbContext.SaveChanges();


            var patient = new Patient(patientDto.first_name, patientDto.last_name, patientDto.PESEL, address.id);
            _dbContext.Patients.Add(patient);
            _dbContext.SaveChanges();

  

            return patient;
        }
        public string EditPatient(PatientWithIdDto patientDto)
        {
            var patient = _dbContext.Patients.Find(patientDto.patient_id);
            var address = _dbContext.Address.Find(patient.address_id);
            if (patient != null)
            {
                patient.first_name = patientDto.first_name;
                patient.last_name = patientDto.last_name;
                patient.PESEL = patientDto.PESEL;
            }
            else return null;

            if(address != null)
            {
                address.street = patientDto.street;
                address.city = patientDto.city;
                address.zip_code = patientDto.zip_code;
            }

            _dbContext.SaveChanges();


            return "Data has been changed";
        }

        public Patient DeletePatient(Patient p)
        {
            var id = p.patient_id;
            var patient = _dbContext.Patients.Find(id);
            var address = _dbContext.Address.Find(patient.address_id);

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