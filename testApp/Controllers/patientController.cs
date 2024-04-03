using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
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
    }
}
