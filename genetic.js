let input = '1219j2dijaijdj1odjoiha8d3h18hdahedkah3'
let population = 500
let mutate = 0.1
let best = {
    acc : 0,
    para : ''
}
let stat = {
    acc : [],
    round : [],
}
class Person {
    constructor (option){
        let box = option
        if(!option){
            box = new Array(input.length) 
            for(let i = 0 ; i < box.length ; i ++){
                box[i] = Math.random().toString(36).slice(4,5)
            }    
        }
        this.acc = 0
        this.box = box
    }
}

function check(per,round){
    let count = 0 
    for(let i = 0 ; i < per.box.length ; i ++){
        if(per.box[i] === input[i]){
            count += 1
        }
    }
    let acc = (count/input.length)*100
    if(best.acc < acc || acc === 100){
        best.acc = acc 
        best.para = per.box
        stat.acc.push(acc)
        stat.round.push(round)
    }
    per.acc = acc
}

function crossover(dad,mom){
    let DNA = []
    for(let i = 0 ; i < input.length ; i++){
        let midpoint = Math.floor(Math.random()*input.length)
        if(i > midpoint){
            DNA.push(dad[i])
        }else{
            DNA.push(mom[i])
        }
    }
    if(Math.random() > mutate){
        return new Person(DNA)
    }else{
        DNA[Math.floor((Math.random() * (DNA.length)))] = Math.random().toString(36).slice(3,4)
        return new Person(DNA)
    }
}

function selection (per){
    let matingPool = []
    for(let i = 0 ; i < per.length ; i ++){
        let fitness = per[i].acc/best.acc
        fitness = Math.floor(fitness*100)
        for(let j = 0 ; j < fitness ; j++){
            matingPool.push(per[i].box)
        }
    }
    return matingPool
}

function generetion (pool){
    let output = []
    for (let i = 0 ; i < population ; i ++ ){
        let dad = Math.floor((Math.random() * (pool.length)))
        let mom = 0 
        while(mom == 0 || mom == dad){
            mom = Math.floor((Math.random() * (pool.length)))
        }
        output.push(crossover(pool[dad],pool[mom]))
    }
    return output
}

let j = 0 
let test = []
for (let i = 0 ; i < population ; i++){
    test.push(new Person)
}
while ( best.acc < 100){
    test.map((data)=>{check(data,j)})
    test = selection(test)
    test = generetion(test)
    console.log(`------------------------------------ end round ${j} ------------------------------------`)
    console.log('this is acc = ' ,best.acc)
    j++
}
console.log(stat)
console.log(input.length)