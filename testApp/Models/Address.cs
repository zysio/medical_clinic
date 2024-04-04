using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace testApp.Models
{
    [Table("address")]
    public class Address
    {
        [Key]
        [Column("id")]
        public int Id { get; set; }
        [Column("street")]
        public string Street { get; set; }
        [Column("city")]
        public string City { get; set; }
        [Column("zip_code")]
        public string Zip_code { get; set; }


        public Address()
        {
            
        }
        public Address(string street, string city, string zipCode)
        {
            this.Street = street;
            this.City = city;
            this.Zip_code = zipCode;
        }
    }
}
