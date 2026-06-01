<div style="max-width:450px;margin:auto;padding:20px;border:1px solid #ddd;border-radius:10px;font-family:Arial;">

  <h2>🚗 Cab Fare Calculator</h2>

  <!-- TRIP TYPE -->
  <label>Trip Type</label><br>
  <button onclick="setTrip('one')" id="oneBtn">One Way</button>
  <button onclick="setTrip('round')" id="roundBtn">Round Trip</button>

  <br><br>

  <!-- VEHICLE -->
  <label>Vehicle</label>
  <select id="vehicle">
    <option value="12">Sedan - ₹12/km</option>
    <option value="14">SUV / Ertiga - ₹14/km</option>
    <option value="15">Toyota Rumion - ₹15/km</option>
    <option value="18">Innova Crysta - ₹18/km</option>
    <option value="29">Tempo Traveller - ₹29/km</option>
    <option value="38">Urbania - ₹38/km</option>
  </select>

  <br><br>

  <!-- INPUT -->
  <input id="from" placeholder="From" style="width:100%;padding:8px;">
  <br><br>
  <input id="to" placeholder="To" style="width:100%;padding:8px;">

  <br><br>

  <button onclick="calculateFare()" style="width:100%;padding:10px;background:black;color:white;">
    Calculate Fare
  </button>

  <h3 id="result"></h3>

  <button id="whatsappBtn" onclick="sendWhatsApp()" style="display:none;width:100%;padding:10px;background:green;color:white;">
    Book on WhatsApp
  </button>

</div>

<script>
let tripType = "one";
let distance = 0;
let finalFare = 0;

function setTrip(type){
  tripType = type;
  alert(type === "one" ? "One Way Selected" : "Round Trip Selected");
}

// SIMPLE DEMO DISTANCE (later Google Maps add karenge)
function calculateFare(){

  distance = Math.floor(Math.random() * 50) + 10;

  let rate = document.getElementById("vehicle").value;

  // IMPORTANT LOGIC
  let totalKm = (tripType === "one") ? distance * 2 : distance;

  finalFare = totalKm * rate + 500 + 300; // driver + toll approx

  document.getElementById("result").innerText =
    "Distance: " + distance + " KM | Estimated Fare: ₹" + finalFare;

  document.getElementById("whatsappBtn").style.display = "block";
}

function sendWhatsApp(){

  let from = document.getElementById("from").value;
  let to = document.getElementById("to").value;

  let msg = "Booking Request%0AFrom: " + from +
  "%0ATo: " + to +
  "%0AFare: ₹" + finalFare;

  window.open("https://wa.me/9172271464?text=" + msg, "_blank");
}
</script>
