var planetsDOM = {

    createPlanetsElements : function(){
        let tableContainer = document.createElement('div');
        tableContainer.setAttribute('class', 'table table-striped col-md-12 ')
        tableContainer.setAttribute('id', 'table-container');
        document.body.appendChild(tableContainer);

        let planetTable = document.createElement('table');
        planetTable.setAttribute('class', "table table-striped")
        planetTable.setAttribute('id', 'planet-table');
        document.getElementById('table-container').appendChild(planetTable);

        let tableHead = document.createElement('thead');
        tableHead.setAttribute('class', 'thead-dark');
        tableHead.setAttribute('id', 'table-head');
        document.getElementById('planet-table').appendChild(tableHead);
        document.getElementById('table-head').innerHTML = 
        '<tr>'
            +'<th scope="col">Planets</th>'
            +'<th scope="col">Diameter</th>'
            +'<th scope="col">Climate</th>'
            +'<th scope="col">Terrain</th>'
            +'<th scope="col">Surface water percentage</th>'
            +'<th scope="col">Population</th>'
            +'<th scope="col">Residents</th>'
        +' </tr>'

        let planetsContainer = document.createElement('tbody');
        // planetsContainer.setAttribute('class', 'table table-striped')
        planetsContainer.setAttribute('id', 'planets-container');
        // document.body.appendChild(planetsContainer);
        document.getElementById('planet-table').appendChild(planetsContainer);



    },

    // createTableHeaders: function(){
    //     let tableHeaders = document.createElement('div');
    //     let tableHeaders = document.createElement('div');
    // }

    createDivsWithImages: function (array){
        let i;
        for (i = 0; i < array.length; i++) { 
            let row = document.createElement('tr');
            row.setAttribute('class', 'row')
            row.setAttribute('id', 'row'+i)
            document.getElementById("planets-container").appendChild(row);
            
            let planetName = array[i].name;
            let planetNameCell = document.createElement('td');
            planetNameCell.setAttribute('class', 'cell');
            planetNameCell.setAttribute('id', 'planet-name'+i);
            document.getElementById('row'+i).appendChild(planetNameCell);
            document.getElementById('planet-name'+i).innerHTML = planetName;


            let diameter = array[i].diameter;
            let diameterCell = document.createElement('td');
            diameterCell.setAttribute('class', 'cell');
            diameterCell.setAttribute('id', 'diameter'+i);
            document.getElementById('row'+i).appendChild(diameterCell);
            document.getElementById('diameter'+i).innerHTML = diameter;


            let climate = array[i].climate;
            let climateCell = document.createElement('td');
            climateCell.setAttribute('class', 'cell');
            climateCell.setAttribute('id', 'climate'+i);
            document.getElementById('row'+i).appendChild(climateCell);
            document.getElementById('climate'+i).innerHTML = climate;


            let terrain = array[i].terrain;
            let terrainCell = document.createElement('td');
            terrainCell.setAttribute('class', 'cell');
            terrainCell.setAttribute('id', 'terrain'+i);
            document.getElementById('row'+i).appendChild(terrainCell);
            document.getElementById('terrain'+i).innerHTML = terrain;


            let surfaceWaterPercentage = array[i].surface_water;
            let surfaceWaterPercentageCell = document.createElement('td');
            surfaceWaterPercentageCell.setAttribute('class', 'cell');
            surfaceWaterPercentageCell.setAttribute('id', 'surfaceWaterPercentage'+i);
            document.getElementById('row'+i).appendChild(surfaceWaterPercentageCell);
            document.getElementById('surfaceWaterPercentage'+i).innerHTML = surfaceWaterPercentage;


            let population = array[i].population;
            let populationCell = document.createElement('td');
            populationCell.setAttribute('class', 'cell');
            populationCell.setAttribute('id', 'population'+i);
            document.getElementById('row'+i).appendChild(populationCell);
            document.getElementById('population'+i).innerHTML = population;


            let residents = array[i].residents;
            let residentsDiv = document.createElement('div');
            residentsDiv.setAttribute('class', 'cell');
            residentsDiv.setAttribute('id', 'residents'+i);
            document.getElementById('row'+i).appendChild(residentsDiv);
            if (residents.length == 0){
                document.getElementById('residents'+i).innerHTML = 'No known residents';
            } else { document.getElementById('residents'+i).innerHTML = 
                '<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#myModal'+i+'">'
                    +residents.length + ' resident(s)'
                +'</button>'
            }
            
            let modal = document.createElement('div');
            modal.setAttribute('class', 'modal fade');
            modal.setAttribute('id', "myModal"+i);
            document.body.appendChild(modal);
            document.getElementById("myModal"+i).innerHTML = 
            // +'<div class="modal fade" id="myModal'+i+'">'
                    '<div class="modal-dialog">'
                        +'<div class="modal-content">'
                            +'<div class="modal-header">'
                                +'<h4 class="modal-title">' + planetName + ' residents</h4>'
                                +'<button type="button" class="close" data-dismiss="modal">&times;</button>'
                            +'</div>'                         
                            +'<div class="modal-body">'
                                +'<table>'
                                    +'<thead>'
                                        +'<tr>'
                                            +'<th scope="col">Name</th>'
                                            +'<th scope="col">Height</th>'
                                            +'<th scope="col">Mass</th>'
                                            +'<th scope="col">Skin</th>'
                                            +'<th scope="col">Hair</th>'
                                            +'<th scope="col">Eyes</th>'
                                            +'<th scope="col">Birth</th>'
                                            +'<th scope="col">Gender</th>'
                                        +' </tr>'
                                    +'</thead>'
                                    +'<tbody>'
                                        +'<tr>'
                                            +'<td>'+ +'</td>'
                                            +'<td>'+ +'</td>'
                                            +'<td>'+ +'</td>'
                                            +'<td>'+ +'</td>'
                                            +'<td>'+ +'</td>'
                                            +'<td>'+ +'</td>'
                                            +'<td>'+ +'</td>'
                                            +'<td>'+ +'</td>'
                                            

                                        +'</tr>'

                                    +'</tbody>'

                                +'</table>'
                                
                            +'</div>'
                            +'<div class="modal-footer">'
                                +'<button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>'
                            +'</div>'
                        +'</div>'
                    +'</div>'
                // +'</div>'
            ;
            // document.getElementById('residents'+i).innerHTML = residents;

            // array[i].forEach(function(cell)
            // {
            //     var div = document.createElement('div');
            //     div.setAttribute('class', cell.name);
            //     // div.setAttribute('id', cell.name);
            //     // div.setAttribute('onclick', 'memoryGameEvents.revertCard(this)')
            //     document.getElementById('row'+i).appendChild(div);
            //     // var img = document.createElement("img");
            //     // img.src = gameStuff.defaultImage.image;
            //     // div.appendChild(img);
            //     }
            // )
        }
    },

    createAwaitingGif : function(){
        let awaitingGifContainer = document.createElement('img');
        awaitingGifContainer.setAttribute('id', 'awaiting-gif-container');
        awaitingGifContainer.setAttribute('src', 'https://media.giphy.com/media/8DcYkij7pUxUY/giphy.gif');
        document.body.appendChild(awaitingGifContainer);
    },

    removeAwaitingGif : function(){
        let awaitingGifContainer = document.getElementById("awaiting-gif-container");
        awaitingGifContainer.parentNode.removeChild(awaitingGifContainer);
    },

}

var planetsData;