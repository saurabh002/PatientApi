using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GraphNetTest.Model
{
    public class Patient
    {
        public string PatientId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public string Gender { get; set; }
        public TelephoneNumber Phone { get; set; }
    }
    public class TelephoneNumber
    {
        public int? HomePhone { get; set; }
        public int? WorkPhone { get; set; }
        public int? CellPhone { get; set; }
    }
}
