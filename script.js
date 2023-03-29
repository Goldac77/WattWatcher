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
  var unitsConsumed = (applianceWattage / 1000) * hoursUsed;
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
    <li>${item.name} (${item.wattage}W, ${item.hours} hours per day) - ${item.bill.toFixed(2)} USD </li>
    `
  })
  totalBill.innerHTML = totalBillAmount.toFixed(2);
  console.log(appliances)
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
        "Incandescent Lightbulb (100W)": 3,
        "Electric Kettle (2000W)": 8,
        "LED Lightbulb (60W)": 6,
        "Microwave Oven (1000W)": 2,
        "Hair Dryer (1500W)": 1
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
