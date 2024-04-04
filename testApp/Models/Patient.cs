using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace testApp.Models
{
    [Table("patient")]
    public class Patient
        
    {
        [Key]
        public int patient_id { get; set; }
        public string first_name { get; set; }
        public string last_name { get; set; }
        public string PESEL { get; set; }

        [ForeignKey("Address")]
        public int address_id { get; set; }

        public Address Address { get; set; }


        public Patient()
        {

        }
        public Patient(string firstName, string lastName, string pesel, int addressid)
        {
            this.first_name = firstName;
            this.last_name = lastName;
            this.PESEL = pesel;
            this.address_id = addressid;
        }
    }
}
