var obj = {
    ref: "ref1",
    serial: {
        invoiceOne: ["11", "22"],
        invoiceTwo: ["33"]
    }
}

function finds(serial, obj) { 
    for (var key in obj) { 
        console.log(key) 
        if (key == serial) {
            return true;
        }  
    }
    return false;
}

console.log(Object.entries([{ name: 'John', age: 30, city: 'New York' }]))