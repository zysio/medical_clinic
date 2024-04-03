using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace testApp.Models
{
    [Table("address")]
    public class Address
    {
        [Key]
        public int id { get; set; }
        public string street { get; set; }
        public string city { get; set; }
        public string zip_code { get; set; }

        [ForeignKey(nameof(Patient))]
        public int patient_id { get; set; }

        public Address()
        {
            
        }
        public Address(string street, string city, string zipCode, int patientId)
        {
            this.street = street;
            this.city = city;
            this.zip_code = zipCode;
            this.patient_id = patientId;
        }
    }
}
