/**
 * Created by a on 2017/11/28.
 */
class search{
    constructor(x,y){
        this.list=[];
        return this.email(x,y);
    }
    email(x,y){
        let reg=/\w+((-w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+/;
        for(var i=0;i<x.length;i++){
            if(reg.test(x[i])){
                if(x[i].indexOf(y)>=0){
                    console.log("123")
                    this.list.push(x[i]);
                }
            }
        }
    }
}
