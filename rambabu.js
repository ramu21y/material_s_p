//Material List
const materialData = {
    "Steel": {
        su: [421, 424, 386, 448, 441, 395, 503, 483, 450, 552],
        sy: [314, 324, 284, 331, 346, 295, 359, 359, 317, 345],
        e: [207000, 207000, 207000, 207000, 207000, 207000, 207000, 207000, 207000, 207000],
        g: [79000, 79000, 79000, 79000, 79000, 79000, 79000, 79000, 79000, 79000],
        mu: [0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3],
        ro: [7860, 7860, 7860, 7860, 7860, 7860, 7860, 7860, 7860, 7860],
        rating: 4 // Add default rating for Steel
    },
    "Aluminum": {
        su: [100, 110, 120, 130, 140, 150, 160, 170, 180, 190],
        sy: [50, 60, 70, 80, 90, 100, 110, 120, 130, 140],
        e: [70000, 70000, 70000, 70000, 70000, 70000, 70000, 70000, 70000, 70000],
        g: [26000, 26000, 26000, 26000, 26000, 26000, 26000, 26000, 26000, 26000],
        mu: [0.33, 0.33, 0.33, 0.33, 0.33, 0.33, 0.33, 0.33, 0.33, 0.33],
        ro: [2700, 2700, 2700, 2700, 2700, 2700, 2700, 2700, 2700, 2700],
        rating: 3 // Add default rating for Aluminum
    },
    "Titanium": {
        su: [800, 850, 900, 950, 1000, 1050, 1100, 1150, 1200, 1250],
        sy: [700, 750, 800, 850, 900, 950, 1000, 1050, 1100, 1150],
        e: [105000, 105000, 105000, 105000, 105000, 105000, 105000, 105000, 105000, 105000],
        g: [45000, 45000, 45000, 45000, 45000, 45000, 45000, 45000, 45000, 45000],
        mu: [0.32, 0.32, 0.32, 0.32, 0.32, 0.32, 0.32, 0.32, 0.32, 0.32],
        ro: [4500, 4500, 4500, 4500, 4500, 4500, 4500, 4500, 4500, 4500],
        rating: 5 // Add default rating for Titanium
    },
    "Copper": {
        su: [210, 215, 220, 225, 230, 235, 240, 245, 250, 255],
        sy: [70, 75, 80, 85, 90, 95, 100, 105, 110, 115],
        e: [110000, 110000, 110000, 110000, 110000, 110000, 110000, 110000, 110000, 110000],
        g: [42000, 42000, 42000, 42000, 42000, 42000, 42000, 42000, 42000, 42000],
        mu: [0.34, 0.34, 0.34, 0.34, 0.34, 0.34, 0.34, 0.34, 0.34, 0.34],
        ro: [8960, 8960, 8960, 8960, 8960, 8960, 8960, 8960, 8960, 8960],
        rating: 2 // Add default rating for Copper
    },
    "Magnesium": {
        su: [150, 155, 160, 165, 170, 175, 180, 185, 190, 195],
        sy: [60, 65, 70, 75, 80, 85, 90, 95, 100, 105],
        e: [45000, 45000, 45000, 45000, 45000, 45000, 45000, 45000, 45000, 45000],
        g: [17000, 17000, 17000, 17000, 17000, 17000, 17000, 17000, 17000, 17000],
        mu: [0.35, 0.35, 0.35, 0.35, 0.35, 0.35, 0.35, 0.35, 0.35, 0.35],
        ro: [1740, 1740, 1740, 1740, 1740, 1740, 1740, 1740, 1740, 1740],
        rating: 1 // Add default rating for Magnesium
    },
    "Brass": {
        su: [340, 345, 350, 355, 360, 365, 370, 375, 380, 385],
        sy: [120, 125, 130, 135, 140, 145, 150, 155, 160, 165],
        e: [100000, 100000, 100000, 100000, 100000, 100000, 100000, 100000, 100000, 100000],
        g: [37000, 37000, 37000, 37000, 37000, 37000, 37000, 37000, 37000, 37000],
        mu: [0.31, 0.31, 0.31, 0.31, 0.31, 0.31, 0.31, 0.31, 0.31, 0.31],
        ro: [8500, 8500, 8500, 8500, 8500, 8500, 8500, 8500, 8500, 8500],
        rating: 2 // Add default rating for Brass
    }
};

let predictionResults = {}; // Store the results globally

function showInterface(interfaceNum) {
    const sections = document.querySelectorAll('section');
    sections.forEach(sec => sec.style.display = 'none');
    const targetSection = document.getElementById('interface-' + interfaceNum);
    if (targetSection) {
        targetSection.style.display = 'block';
        if(interfaceNum === 3) {
          displayPredictionResults(); // Call to show results on interface 3
        }
    }
}

function predict() {
     const industry = document.getElementById("industry").value;
        const material = document.getElementById("material").value;

        // Validate input values
        const su = parseFloat(document.getElementById("su").value);
        const sy = parseFloat(document.getElementById("sy").value);
        const e = parseFloat(document.getElementById("e").value);
        const g = parseFloat(document.getElementById("g").value);
        const mu = parseFloat(document.getElementById("mu").value);
        const ro = parseFloat(document.getElementById("ro").value);
        const customParameter = document.getElementById("custom-parameter").value;

        if (isNaN(su) || isNaN(sy) || isNaN(e) || isNaN(g) || isNaN(mu) || isNaN(ro)) {
            alert("Please enter valid numeric values for all material properties.");
            return;
        }
       
        // Get material data based on entered material
        let stars ="";
   
        if (materialData.hasOwnProperty(material)) {
            const selectedMaterial = materialData[material];
             let rating =   selectedMaterial.rating;
             
             
             if (su > 500 && sy > 300 && e > 150 && g > 70 && mu > 0.35 && ro > 5) {
                 rating = 5;
             }
               for (let i = 0; i < rating; i++) {
                stars += "<i class='fas fa-star'></i>"; // Use Font Awesome stars
                 }
                
               
                // Store prediction results
                predictionResults = {
                    industry: industry,
                    material: material,
                    su:su,
                    sy:sy,
                    e:e,
                    g:g,
                    mu:mu,
                    ro:ro,
                    customParameter:customParameter,
                    rating: rating,
                    stars: stars
                };
                showInterface(3); //Show the prediction to the user
        
        } else{
               alert("Please enter valid material name");
            }
}

function displayPredictionResults() {
  if (!predictionResults) {
        alert("Please run a prediction first.");
        return;
    }

    const resultDiv = document.getElementById("result");
    const recommendationDiv = document.getElementById("recommendation");
    const alternativeList = document.getElementById("alternative-list");
     recommendationDiv.textContent = `Recommended Material: ${predictionResults.material}`;
    resultDiv.innerHTML = predictionResults.stars; // Set the rating
   
    let recommendationMsg = `
        <ul>
        <li> Industry: ${predictionResults.industry}</li>
          
           </ul>

        <p>The selected material Su :${predictionResults.su}</p>
        <p>The Yield Strength Sy :${predictionResults.sy}</p>
        <p>The Elastic Limit E :${predictionResults.e}</p>
        <p>The Modulus of Rigidity G :${predictionResults.g}</p>
        <p>The Mu Coefficient Mu :${predictionResults.mu}</p>
        <p>The Ro :${predictionResults.ro}</p>
          
        
    `;

     //Find a material with higher ratings
    let higherRatedMaterial = null;
    let bestRating = 0;
    let bestMaterialInfo = null;

    for (const materialName in materialData) {
      if (materialName !== predictionResults.material) {
        const materialRating = materialData[materialName].rating;
        if(materialRating > predictionResults.rating) {
                let newRating =   (materialRating - predictionResults.rating);
                if (newRating > bestRating) {
                  bestRating = newRating;
                  higherRatedMaterial = materialName;
                  bestMaterialInfo = materialData[materialName];
                 }
              }
      }
    }
  //Displaying new alternatives from data
    if (higherRatedMaterial) {
            alternativeList.innerHTML = `
      <h4> Consider the following for greater stability</h4>
          <p> Material :${higherRatedMaterial} which has a higher rating. Rating: ${higherRatedMaterial.rating}</p>
           

           `;
    } else {
        alternativeList.innerHTML = `<li>No higher-rated material found.</li>`;
    }
}

function downloadReport() {
     if (!predictionResults) {
            alert("Please run a prediction first.");
            return;
        }

        const reportContent = `
           <h2> Material Prediction Report </h2>
           <p> Recommended Material: ${predictionResults.material} </p>
           <p> Industry: ${predictionResults.industry} </p>
           <p> Ultimate Strength (Su): ${predictionResults.su} </p>
           <p> Yield Strength (Sy): ${predictionResults.sy} </p>
           <p> Elastic Limit (E): ${predictionResults.e} </p>
           <p> Modulus of Rigidity (G): ${predictionResults.g} </p>
           <p> Mu Coefficient (Mu): ${predictionResults.mu} </p>
           <p> Ro (Density): ${predictionResults.ro} </p>
           <p> Strength Rating: ${predictionResults.stars} </p>
           <h3> Alternative Materials: </h3>
           <p> Please refer to the Prediction Results page for alternative materials. </p>
       `;

        const blob = new Blob([reportContent], {type: "text/html"});
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "material_prediction_report.html";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
}

function loadMaterialData(materialType) {
  
}

document.addEventListener('DOMContentLoaded', (event) => {
        const materialDropdown = document.getElementById("material");
        //Load the material dropdown
        for (const material in materialData) {
            if (materialData.hasOwnProperty(material)) {
                let option = document.createElement("option");
                option.value = material;
                option.text = material;
                materialDropdown.add(option);
            }
        }
});