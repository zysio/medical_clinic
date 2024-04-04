using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using testApp.Dto;
using testApp.Models;
using testApp.Service;

namespace testApp.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class patientController : ControllerBase
    {
        private readonly IPatientService _patientService;

        public patientController(IPatientService patientService)
        {
            _patientService = patientService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Patient>>> GetAllPatients()
        {
            var patients = await _patientService.GetAllPatientsAsync();
            return Ok(patients);
        }

        [HttpPost]
        public IActionResult AddPatient([FromBody] PatientDto patientDto)
        {
            var patient = _patientService.AddPatient(patientDto);
            return Ok(patient);
        }

        [HttpPost]
        public IActionResult DeletePatientAndAddress([FromBody] Patient p)
        {
            var patient = _patientService.DeletePatient(p);
            return Ok(patient);
        }

        [HttpPost]
        public IActionResult EditPatient([FromBody] PatientWithIdDto patientDto)
        {
            var patient = _patientService.EditPatient(patientDto);
            return Ok(patient);
        }
    }
}
