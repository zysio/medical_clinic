using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using testApp.Data; 
using testApp.Models; 

namespace testApp.Service
{

    public interface IPatientService
    {
        Task<IEnumerable<Patient>> GetAllPatientsAsync();
    }

    public class PatientService : IPatientService
    {
        private readonly AppDbContext _dbDontext;

        public PatientService(AppDbContext dbDontext)
        {
            _dbDontext = dbDontext;
        }
        public async Task<IEnumerable<Patient>> GetAllPatientsAsync()
        {
            return await _dbDontext.Patients.ToListAsync();
        }
    }
}