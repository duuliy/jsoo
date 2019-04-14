//用法  new compile(el,vm)

class Compile{
    constructor(el,vm){
        //遍历节点宿主
        this.$el=document.querySelector(el)

        this.$vm=vm;

        //编译
        if(this.$el){
            //将内容转化为obj片段
            this.$fragment=this.node2Fragment(this.$el)
            //执行编译
            this.compile(this.$fragment)
            //将编译之后的html追加到$el
            this.$el.appendChild(this.$fragment)
        }
    }

    node2Fragment(el){
        const frag=document.createDocumentFragment();  //创建一个虚拟obj对象
        let child;
        while(child = el.firstChild){
            frag.appendChild(child) //将el的值代替虚拟obj里面值
        }
        return frag
    }

    compile(el){
        const childNodes=el.childNodes;
        Array.from(childNodes).forEach(node => {
            //类型判断
            if(this.isElement(node)){
                // console.log('元素'+node.nodeName)
                const nodeAttrs=node.attributes;
                Array.from(nodeAttrs).forEach(attr=>{
                    const attrName=attr.name;
                    const exp=attr.value;
                    if(this.isDirective(attrName)){
                        const dir=attrName.substring(2)
                        this[dir] && this[dir](node,this.$vm,exp) 
                    }
                    if(this.isEvent(attrName)){
                        const dir =attrName.substring(1)
                        this.eventHandler(node,this.$vm,exp,dir)
                    }
                })
            }else if(this.isInterpolation(node)){
                // console.log('文本'+node.textContent)
                this.compileText(node)
            }

            //递归子阶段
            if(node.childNodes && node.childNodes.length>0){
                this.compile(node)
            }
        });
    }

    compileText(node){
        // console.log(RegExp.$1)
        // node.textContent=this.$vm.$data[RegExp.$1]
        this.update(node,this.$vm,RegExp.$1,'text')
    }

    //更新函数
    update(node,vm,exp,dir){
        const updaterFn=this[dir+'Updater'];
        updaterFn && updaterFn(node,vm[exp]);
        //依赖收集
        new Watcher(vm,exp,function (value) {
            updaterFn && updaterFn(node,value);
        })
    }

    text(node,vm,exp){
        this.update(node,this.$vm,exp,'text')
    }

    //双绑
    model(node,vm,exp){
        this.update(node,vm,exp,'model')
        node.addEventListener('input',e=>{
            vm[exp]=e.target.value;
        })
    }

    modelUpdater(node,value){
        node.value=value
    }

    html(node,vm,exp){
        this.update(node,vm,exp,'html')
    }

    htmlUpdater(node,value){
        node.innerHTML=value
    }

    textUpdater(node,value){
        node.textContent=value
    }

    //事件处 理
    eventHandler(node,vm,exp,dir){
        let fn=vm.$options.methods && vm.$options.methods[exp]
        if(dir && fn){
            node.addEventListener(dir,fn.bind(vm))
        } 
    }

    isDirective(attr){
        return attr.indexOf('k-')==0
    }

    isEvent(attr){
        return attr.indexOf('@')==0
    }

    isElement(node){
      return node.nodeType===1
    }

    isInterpolation(node){
        return node.nodeType===3 && /\{\{(.*)\}\}/.test(node.textContent)
    }
}