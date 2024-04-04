using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace testApp.Models
{
    [Table("patient")]
    public class Patient
        
    {
        [Key]
        [Column("patient_id")]
        public int Patient_id { get; set; }
        [Column("first_name")]
        public string First_name { get; set; }
        [Column("last_name")]
        public string Last_name { get; set; }
        public string PESEL { get; set; }

        [ForeignKey("Address")]
        [Column("address_id")]
        public int Address_id { get; set; }

        public Address Address { get; set; }


        public Patient()
        {

        }
        public Patient(string firstName, string lastName, string pesel, int addressid)
        {
            this.First_name = firstName;
            this.Last_name = lastName;
            this.PESEL = pesel;
            this.Address_id = addressid;
        }
    }
}
