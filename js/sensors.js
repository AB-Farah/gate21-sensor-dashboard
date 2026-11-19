/**
 * Eksempeldata for sensorerne.
 *
 * Hver sensor tæller personer, der passerer, via temperaturmåling.
 * I en rigtig version ville disse data komme fra et API.
 */
const SENSORS = [
  { id: "A01", location: "København", peopleCount: 342, coords: [55.6761, 12.5683] },
  { id: "B14", location: "Lyngby",    peopleCount: 187, coords: [55.7704, 12.5038] },
  { id: "C08", location: "Roskilde",  peopleCount: 264, coords: [55.6415, 12.0803] },
  { id: "D22", location: "Hvidovre",  peopleCount: 119, coords: [55.6572, 12.4736] },
  { id: "E31", location: "Ballerup",  peopleCount: 208, coords: [55.7317, 12.3636] },
];

const SENSOR_TYPE = "Persontælling via temperaturmåling";
