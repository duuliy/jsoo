

//数据相应化（数据劫持）
class KVue{

    constructor(options){
        this.$options=options;

        //数据响应化
        this.$data=options.data;
        this.observe(this.$data)

        //模拟watcher
        // new Watcher();
        // this.$data.test;

        new Compile(options.el,this)

        if(options.created){
            options.created.call(this)
        }

    }

    observe(value){
        if(!value || typeof value!=='object') return;
        
        //遍历该对象
        Object.keys(value).forEach(key=>{
            this.defineReactive(value,key,value[key])
            this.proxyDate(key)  //代理data中的属性到vue
        })
    }
    //数据响应化
    defineReactive(obj,key,val){
        typeof obj==='object'&&this.observe(val) //递归解决数据嵌套

        const dep=new Dep()

        Object.defineProperty(obj,key,{
            get(){
                Dep.target && dep.addDep(Dep.target)
                return val;
            },
            set(newVal){
                if(newVal===val)return void(666);
                // console.log(val)
                // console.log(newVal)
                val=newVal;
                // new Compile(that.$options.el,that)
                dep.notify()
                console.log('数据更新了')
                //数据更新了
            }
        })
    }

    proxyDate(key){
        Object.defineProperty(this,key,{
            get(){
                return this.$data[key]
            },
            set(newVal){
                // console.log(this.$data[key])
                this.$data[key]=newVal
                // console.log(this.$data[key])
            }
        })
    }
}

//dep订阅者
class Dep{
    constructor(){
        //这里存放若干依赖(watcher)
        this.deps=[]
    }
    addDep(dep){
        this.deps.push(dep)
    }
    notify(){
        // console.log(this.deps)
        this.deps.forEach(dep=>dep.update())
    }
}

//观察者
class Watcher{
    constructor(vm,key,cb){
        this.vm=vm;
        this.key=key;
        this.cb=cb;
        //当前watcher实例指定到Dep的静态属性target
        Dep.target=this;
        this.vm[this.key]  //触发相对应的getter
        Dep.target=null; 
    }
    update(){
        console.log(997)
        this.cb.call(this.vm,this.vm[this.key])
    }
}