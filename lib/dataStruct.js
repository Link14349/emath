class stack
{
    constructor(){
        this.value = [];
    }
    top(){
        return this.value[this.value.length - 1];
    }
    pop(){
        this.value.splice(this.value.length - 1,1);
    }
    push(value){
        this.value.push(value);
    }
    empty(){
        return this.value.length === 0;
    }
}
module.exports.stack = stack;