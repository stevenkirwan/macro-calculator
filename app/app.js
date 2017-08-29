// Formulas
// For males:
// 10 x weight (kg) + 6.25 x height (cm) – 5 x age (y) + 5 = REE
// For females:
// 10 x weight (kg) + 6.25 x height (cm) – 5 x age (y) – 161 = REE

// Sedentary REE X 1.2
// Light activity REE x 1.375
// Moderate activity REE x 1.55
// Very Active REE x 1.725

//  Lose - 20%
// 3,250 – (3250 x .20) = Weight Loss TDEE
// Gain + 20%
// 3,250 + (3250 x .20) = Weight Gain TDEE

// Example
// Let’s say you’re a 29-year-old, 183 cm, 88 kg, very active male.
// (10 x weight (kg) + 6.25 x height (cm) – 5 x age (y) + 5 = REE) x 1.725 = TDEE
// 10 x 88 + 6.25 x 183 – 5 x 29 + 5 = REE
// 880 + 1144 – 145 + 5 = 1884 (REE)
// 1884 x 1.725 = 3250 (Very Active TDEE)

// 1g Protein = 4 Calories
// 1g Carbohydrate = 4 Calories
// 1g Fat = 9 Calories

var macroController = (function(){

    var data = {
        weight: 0,
        height: 0,
        age: 0,
        activityLevel: ''
    };

    return{

        addUser: function(weight, height, age, activityLevel){
            data['weight'] = weight;
            data['height'] = height;
            data['age'] = age;
            data['activityLevel'] = activityLevel;
            console.log(data);
        },

        // Get REE
        getREE: function(weight ,height, age, gender){
            if(gender == 'male'){
                var REE = Math.round((10 * weight) + (6.25 * height) - (5 * age) + 5);
                return REE;
            }else{
                var REE = Math.round((10 * weight) + (6.25 * height) - (5 * age) - 161);
                return REE;
            }
        },

        // Get users activity level
        getActivityLevel: function(activityLevel){
            switch(activityLevel) {
                case "sedentary":
                    return 1.2;
                    break;
                case "lightActivity":
                    return 1.375;
                    break;
                case "moderateActivity":
                    return 1.55;
                    break;
                case 'veryActive':
                    return 1.725;
                default:
                    return 1.2;
            }
        },

        // Get TDEE based pn REE
        getTDEE: function(r, l){
            var t = Math.round(r * l);
            return t;
        },

        // Get user's goal
        getGoal: function(goal, tdee){
            if(goal == 'lose'){
                var lose = Math.round(tdee - (tdee * 0.20));
                return lose;
            }else if(goal == 'gain'){
                var gain = Math.round(tdee + (tdee * 0.20));
                return gain;
            }else{
                return tdee;
            }
        },

        // Convert Kilos to lbs
        getKilos: function(weight){
            var kg = Math.round(weight / 0.45359237); 
            return kg;
        },

        getProtein: function(weight){
            var protein = Math.round((weight * 1));
            return protein;
        },

        getFat: function(goal){
            var fats = Math.round((goal * 0.25) / 9);
            return fats;
        },

        getTotalCarbs: function(totalProtein, totalFat, cals){
            var carbs = Math.abs(((totalProtein + totalFat) - cals) / 4);
            return carbs;
        },

        getTotalProtein: function(protein){
            var totalProtein = Math.floor(protein * 4);
            return totalProtein;
        },

        getTotalFat: function(fat){
            var totalFat = Math.floor(fat * 9);
            return totalFat;
        }, 

        testing: function(){
            console.log(data);
        }
    }
    
})();

// UI controller
var UIController = (function(){

    var data = {
        age: 0
    };

    // Declare DOM strings
    var DOMstrings = {
        inputWeight: 'weight',
        inputHeight:'height',
        inputAge: 'age',
        inputActivityLevel: 'activity-level',
        InputGender: '.genderCheckbox:checked',
        InputGoal: '.goalCheckbox:checked',
        InputBtn: 'getResult',
        OutputResult: 'result',
        InputMacros: 'getMacros',
        OutputProtein: 'protein',
        OutputFat: 'fat',
        OutputCarbs: 'carbs'  
    };

    return{

        // Get User input
        getInput: function(){

            return{
                weight: document.getElementById(DOMstrings.inputWeight).value,
                height: document.getElementById(DOMstrings.inputHeight).value,
                age: document.getElementById(DOMstrings.inputAge).value,
                activityLevel: document.getElementById(DOMstrings.inputActivityLevel).value,
                gender: document.querySelector(DOMstrings.InputGender).value,
                goal: document.querySelector(DOMstrings.InputGoal).value,
            };

        },

        getOutput: function(){
            result: document.querySelector(DOMstrings.OutputResult)   
        },

        // Reset fields to default
        clearFields: function(){
            return{
                weight: document.getElementById(DOMstrings.inputWeight).value = '',
                height: document.getElementById(DOMstrings.inputHeight).value = '',
                age: document.getElementById(DOMstrings.inputAge).value = '',
                activityLevel: document.getElementById(DOMstrings.inputActivityLevel).value = 'sedentary',
                // gender: document.querySelector(DOMstrings.InputGender).value = '',
                // goal: document.querySelector(DOMstrings.InputGoal).value = ''
            };
        },

        addResult: function(goal){

            var result;
            
            result = document.getElementById(DOMstrings.OutputResult);
            result.innerHTML = '<h1> Calories: ' + goal + '</h1>';

        },

        addProtein: function(kg){

            var protein;
            protein = document.getElementById(DOMstrings.OutputProtein);
            protein.innerHTML += '<h3>Protein<span>' + kg + 'g</span></h3>';

        },

        addFat: function(totalFat){

            var fat;
            fat = document.getElementById(DOMstrings.OutputFat);
            fat.innerHTML += '<h3>Fat<span>' + totalFat + 'g</span></h3>';
            
        },

        addCarbs: function(totalCarbs){

            var carbs;
            carbs = document.getElementById(DOMstrings.OutputCarbs);
            carbs.innerHTML += '<h3>Carbs<span>' + totalCarbs + 'g</span></h3>';
            
        },

        showElement: function(el){
            document.getElementById(el).style.display = 'block';
        },

        hideElement: function(el){
            document.getElementById(el).style.display = 'none';
        },

        // Get DOM strings
        getDOMstrings: function(){
            return DOMstrings;
        }  
    }

})();

// Global app controller
var appController = (function(UICtrl, macroCtrl){

    // Event listeners
    var setupEventListener = function(){

        var DOM = UICtrl.getDOMstrings();

        document.getElementById(DOM.InputBtn).addEventListener('click', function(){
            ctrlGetREE();
            addUserInfo();
            UICtrl.showElement('result__wrapper');
            UICtrl.showElement('macro__btn');
        });

        document.getElementById(DOM.InputMacros).addEventListener('click', function(){
            ctrlGetMacros();
            UICtrl.showElement('marcos');
        });

        document.addEventListener('keypress', function(event){
            if(event.keyCode === 13 || event.which === 13){
                ctrlGetREE();
            }
        });
    };

    var addUserInfo = function(){
        var info;
        
        input = UICtrl.getInput();
        info = macroCtrl.addUser(input.weight, input.height, input.age, input.activityLevel);
    }

    var ctrlGetREE = function(){
        
        var input, REE, gender, TDEE, goal;
        
        // Get user input
        input = UICtrl.getInput();

        // Get activity level
        activityLevel = macroCtrl.getActivityLevel(input.activityLevel);

        // Get REE
        REE = macroCtrl.getREE(input.weight, input.height, input.age, input.gender);

        // Get TDEE
        TDEE = macroCtrl.getTDEE(REE, activityLevel);

        // Get goal, lose/gain weight
        goal = macroCtrl.getGoal(input.goal, TDEE);

        // UICtrl.clearFields();
        UIController.addResult(goal);

        var totalCalories = document.getElementById('cals').value = goal;

    }

    var ctrlGetMacros = function(){

        var input, totalCalories, output, lbs, fat, protein, totalProtein, totalFat, carbs;
        input = UICtrl.getInput();
        output = UICtrl.getOutput();

        // Get total calories 
        totalCalories = document.getElementById('cals').value;

        // Get protein
        lbs = macroCtrl.getKilos(input.weight); // convert kg to lbs
        protein = macroCtrl.getProtein(lbs);
        totalProtein = macroCtrl.getTotalProtein(protein);
        
        // Get fat
        fat = macroCtrl.getFat(totalCalories);
        totalFat = macroCtrl.getTotalFat(fat);

        // Get carbs
        carbs = macroCtrl.getTotalCarbs(totalProtein, totalFat, totalCalories);

        UIController.addProtein(protein);
        UIController.addFat(fat);
        UIController.addCarbs(carbs);

    }

    return{
        init: function(){
            setupEventListener();
        }
    };

})(UIController, macroController);

appController.init();