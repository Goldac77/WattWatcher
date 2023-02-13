let appliance_type = document.querySelector("#appliances");
let display = document.querySelector("#display");

//Function to calculate the total wattage (TODO...)
function calculate() {
    let selections = document.querySelectorAll('input[type="checkbox"]:checked');
    let selected_values = []

    for (let i = 0; i < selections.length; i++) {
    selected_values.push(selections[i].value);
    }

    //fetch data.json
    fetch("data.json")
    .then(response => response.json())
    .then(data => {
        let newData = data;

        //NOT COMPLETE....
        //display the selected item's wattage from the json object
        console.log(newData.fridges.mini)
    })

}



