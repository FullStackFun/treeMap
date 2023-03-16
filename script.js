//console.log(d3)

let gameURL = 'https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/video-game-sales-data.json'


let gameData

let board = d3.select('#board')
let tooltip = d3.select('#tooltip')


let makeTreeMap = function() {
    let rank = d3.hierarchy(gameData, (x) => {
        return x['children']
    })

        .sum((x) => {
            return x['value']
        })
        .sort((x1, x2) => {
            return x2['value'] - x1['value']
        })
    
        makeTreeMap = d3.treemap()
                    .size([1005, 603])

        makeTreeMap(rank)

    //console.log(rank.leaves())
    gameTiles = rank.leaves()
    console.log(gameTiles)
    
    tile = board.selectAll('g')
        .data(gameTiles)
        .enter()
        .append('g')
        .attr('transform', (x) => {
            return 'translate(' + x['x0'] + ',' + x['y0'] + ')'
        })

    tile.append('rect')
            .attr('class', 'tile')
            .attr('fill', (x) => {
            let category = x['data']['category']
            
            if (category == 'Wii' || category == 'NES' || category == 'GB' || category == 'DS' || category == 'SNES' || category == 'GBA' || category == '3DS' || category == 'N64') {
                return '#5b9786'
            } else {
                return '#5b7897'
            }

           /*  if (category == 'Wii') {
                return '#fd6e7d'
            } else if (category == '2600') {
                return '#fd6e78'
            } else if (category == 'NES') {
                return '#fd6e73'
            } else if (category == 'GB') {
                return '#fd6e6e'
            } else if (category == 'DS') {
                return '#fd726e'
            } else if (category == 'X360') {
                return '#fd776e'
            } else if (category == 'PS3') {
                return '#fd7c6e'
            } else if (category == 'SNES') {
                return '#fd816e'
            } else if (category == 'GBA') {
                return '#fd866e'
            } else if (category == 'PS4') {
                return '#fd8a6e'
            } else if (category == '3DS') {
                return '#fd8f6e' 
            } else if (category == 'N64') {
                return '#fd946e'
            } else if (category == 'PS') {
                return '#fd996e'
            } else if (category == 'XB') {
                return '#fd9e6e'
            } else if (category == 'PC') {
                return '#fda26e'
            } else if (category == 'PSP') {
                return '#fda76e'
            } else if (category == 'XOne') {
                return '#fdac6e'
            } else if (category == 'PS2') {
                return '#fdb16e'
            }    */    
        })
        .attr('data-name', (x) => {
                return x['data']['name']}) 
        .attr('data-category', (x) => {
            return x['data']['category']})
        .attr('data-value', (x) => {
            return x['data']['value'] })
        .attr('width', (x) => {
            return x['x1'] - x['x0']
        })
        .on('mouseover', (x) => {
            tooltip.transition()
                .style('visibility', 'visible')
                tooltip.html (
                   'Name: ' + x['data']['name'] + ' Category: ' + x['data']['category'] + ' Value: ' + x['data']['value']
                )
                tooltip.attr('data-value', x['data']['value'])
        })
        .on('mouseout', (x) => {
            tooltip.transition()
                .style('visibility', 'hidden')
        })


        .attr('height', (x) => {
            return x['y1'] - x['y0']
        })
        
        tile.append('text')
            .text((x) => {
                return x['data']['name']
            })
            .attr('x', 0)
            .attr('y', 25)
       
       
    

}



d3.json(gameURL)
    .then(
        (data, error) => {

            if (error) {
                console.log(error)
            } else {
                gameData = data
                console.log(gameData)
                makeTreeMap()
            }

         } 
    )