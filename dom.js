window.dom = {
    // 增加
    create(node){
        if (typeof node === "string"){
            if (node.indexOf('<') !== -1){
                let templete = document.createElement('template');
                templete.innerHTML = node.trim();
                return templete.content.firstChild
            }else{
                return document.createElement(node);
            }
        }else{
            return "输入不合法"
        }
    },
    find(node,parentsNode){
        if (arguments.length === 2){
            let parent = document.querySelector(parentsNode);
            return document.querySelectorAll(node);
        }else if (arguments.length === 1){
            return  document.querySelectorAll(node)[0];
        }
    },
    //新增加一个弟弟元素
    after(node,node2) {
       node.parentNode.insertBefore(node2,node.nextSibling)
    },
    // 增加一个哥哥元素
    before(node,node2) {
        node.parentNode.insertBefore(node2,node)
    },
    // 增加一个子节点
    append(parent,child){
        parent.appendChild(child)
    },
    // 增加一个父节点
    wrap(child,parent){
        dom.before(child,parent)
        dom.append(parent,child)
    },
    // 删除节点
    remove(node){
        let nodeClone = node.cloneNode();
        node.remove()
        return nodeClone;
    },
    // 删除所有子节点
    empty(node) {
        let arr = [];
        while (node.firstChild){
            arr.push(dom.remove(node.firstChild))
        }
        return arr;
    },
    //读属性
    attr(node,attr,value){
        if (arguments.length === 3){
            node.setAttribute(attr, value);
        }else if (arguments.length === 2){
            return  node.getAttribute(attr);
        }
    },
    //读写文本内容
    text(node,value){
        if (arguments.length === 2){
            node.setAttribute("text",'value');
        }else if (arguments.length === 1){
            return node.innerText
        }
    },
    // 读写html里面的内容
    html(node,value){
        if (arguments.length === 2){
            node.innerHTML = value;
        }else if (arguments.length === 1){
            return node.innerHTML;
        }
    },
    // 修改style
    style(node,name,value){
        if (arguments.length === 3){
            node.style[name] = value;
        }else if (arguments.length === 2){
            if (typeof name === "string"){
                return  node.style[name]
            }else if (name instanceof Object){
                for (let key in name){
                    console.log(key);
                    node.style[key] = name[key];
                }
            }
        }
    },
    class:{
        add(node,value){
            node.classList.add(value);
        },
        remove(node,value){
           return  node.classList.remove(value)
        }
    },
    on(node,event,fn){
        node.addEventListener(event,fn)
    },
    off(node,event,fn){
        node.removeEventListener(event,fn)
    },
    parent(node){
        return node.parentNode;
    },
    children(node){
        return node.children;
    },
    siblings(node){
        let children =  dom.parent(node).children;
        return  Array.from(children).filter((value)=>{
            return value !== node
        })
    },
    next(node){
        let nextNode = node.nextSibling;
        while (nextNode && nextNode.nodeType !== 1){
            nextNode = nextNode.nextSibling;
        }
        return nextNode
    },
    previous(node){
        let previousNode = node.previousSibling;
        while (previousNode && previousNode.nodeType !== 1){
            previousNode = previousNode.previousSibling;
        }
        return previousNode
    },
    each(node,fn){
        for (let i = 0; i < node.length; i++) {
            fn.call(null,node[i]);
        }
    },
    index(node){
       let children = Array.from(dom.children(dom.parent(node)));
       let num = 0;
        for (let i = 0; i < children.length; i++) {
            if (children[i] === node){
                num = i;
            }
        }
        return num+1
    }
}
