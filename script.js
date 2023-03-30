var appliances = [];
var ratePerUnit = 0.369;
var totalBill = document.getElementById('total-bill');
let totalBillAmount = 0; 

//function to add chosen appliance to the list
function addAppliance() {
  var selectedAppliance = document.getElementById("appliance");
  var applianceName = selectedAppliance.options[selectedAppliance.selectedIndex].text;
  var applianceWattage = selectedAppliance.value;
  var hoursUsed = document.getElementById("hours").value;
  var unitsConsumed = (applianceWattage / 1000) * hoursUsed * 30; //units consumed per month
  var billAmount = ratePerUnit * unitsConsumed;
  var appliance = {
    name: applianceName,
    wattage: applianceWattage,
    hours: hoursUsed,
    units: unitsConsumed,
    bill: billAmount
  };
  appliances.push(appliance);
  updateApplianceList();
  adviseReducingUsage();
}

//function to display/update the items in the list
function updateApplianceList() {
  var list = document.getElementById("appliance-list");
  list.innerHTML = "" //refresh the list

  appliances.forEach(item => {
    totalBillAmount += item.bill;
    list.innerHTML += `
    <li>${item.name} (${item.wattage}W, ${item.hours} hours per day) - GH₵${item.bill.toFixed(2)} </li>
    `
  })
  totalBill.innerHTML = totalBillAmount.toFixed(2);
}

function showAdvice() {
  var adviceList = adviseReducingUsage();
  if (adviceList.length > 0) {
    var advice = "You can reduce your electricity consumption by reducing the usage of the following appliances:\n\n";
    advice += adviceList.join("\n");
    alert(advice);
  } else {
    alert("You are using all your appliances within the recommended maximum usage hours.");
  }
}
    
function adviseReducingUsage() {
  var maxHours = {
    "Flat Screen Television (60W)": 7,
    "Rice cooker (1100W)": 0.5,
    "Refrigerator (700W)": 24,
    "Freezer (200W)": 8,
    "IIncandescent light bulb (60W)": 7,
    "Microwave oven (800W)": 0.5,
    "Electric Kettle (1200W)": 0.3,
    "Electric Iron (1200W)": 0.5,
    "Laptops (40W)": 6,
    "Electric Stove (3000W)": 3
  };

  var adviceList = [];
  for (var i = 0; i < appliances.length; i++) {
    var appliance = appliances[i];
    var applianceName = appliance.name;
    if (maxHours.hasOwnProperty(applianceName)) {
      var maxUsage = maxHours[applianceName];
      if (appliance.hours > maxUsage) {
        var excessHours = appliance.hours - maxUsage;
        adviceList.push("Reduce usage of " + applianceName + " (currently using " + appliance.hours + " hours per day, recommended usage is " + maxUsage + " hours per day, reduce by " + excessHours + " hours).");
      }
    }
  }

  return adviceList;
}
