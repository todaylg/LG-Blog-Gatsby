---
title: 《JavaScript数据结构与算法》读书笔记
category: "读书流水"
cover: bg.jpg
author: todaylg


---

之前有扫过一眼《学习JavaScript数据结构与算法》这本书，但那时感觉前端和算法、数据结构啥的应该关系比较小，就仅仅只是草草的瞅了瞅，事实证明了当初自己的愚昧无知。。。。。还是好好补一波吧。。这些基础知识还是不能缺的。。

## 数组

---

最常用的肯定还是数组，数组的标准定义是：**一个存储元素的线性集合**。元素可以通过索引来获取，索引通常是数字，用来计算元素之间存储位置的偏移量。但是JavaScript中的数组画风不太一样，它是一种特殊的对象，用来表示偏移量的索引是该对象的属性（Key），索引可能是整数。然而这些数字索引在内部被转换为字符串类型，这是因为JavaScript对象中的属性名必须是字符串。**数组在JavaScript中只是一种特殊对象**，所以效率上不如其他语言中的数组高。

```javascript
let a = [];
a["A"] = 1; //索引也可以不是整数
a.length; //0  但是不计入length
a[0] =1;
a.length; //1
a;//[1, A: 1]
```

创建数组等数组的基本知识就不赘述了，比较容易搞混的是数组和字符串各自专有的一些方法，详细的看MDN文档，这里的是简要回顾：

* **字符串生成数组**

调用字符串对象的split()方法可以生成数组：

```javascript
var sentence = "test test1 test2";
var words = sentence.split(" ");
```

- **对数组的整体性操作**

```javascript
var nums = [];
for(var i=0;i<10;i++){
    nums[i] = i+1;
}

var test = nums;//当把一个数组赋给另一个数组时，只是为被赋值的数组添加了一个新的引用，当你通过原引用修改数组的值的时候，另一个引用也感知到这个变化
nums[0] = 100;
test[0];//100   

//浅复制也是这个道理(Object.assign)
```

### 存取函数

JavaScript提供了一组用来访问数组元素的函数，叫做存取函数，这些函数返回目标数组的某种变体（不改变原数组）。

- **查找元素**：

indexOf()函数用来查找传进来的参数在目标数组中是否存在。如果包含该参数就返回该元素在数组中的索引，如果不包含就返回-1。如果数组中包含多个相同的元素，indexOf()函数总是返回第一个与参数相同的元素的索引。有一个功能类似的函数：lastIndexOf()则是返回相同元素中最后一个元素的索引，如果没找到相同元素也是返回-1.

- **数组的字符串表示**

有两个方法可以将数组转化为字符串：join()和toString()。这两个方法都返回一个包含数组所有元素的字符串，各元素之间用逗号分隔开，join的参数决定元素之间的分隔符，默认也是逗号。

```javascript
var names = ['test','test1','test2'];
var namestr = names.join();
console.log(namestr);//test,test1,test2

namestr = names.toString();
console.log(namestr);//test,test1,test2
```

- **由已有数组创建新数组**

concat()和splice()方法允许通过已有数组创建新数组。

concat()方法可以合并多个数组创建一个新数组，该方法的发起者是一个数组，参数是另一个数组，作为参数的数组，其中所有元素都被连接到调用concat方法的数组后面：

```javascript
var test1 = [1,2];
var test2 = [3,4];
test1.concat(test2);//[1, 2, 3, 4]
```

splice()方法截取一个数组的子集创建一个新数组,第一个参数是截取的起始索引，第二个参数是截取的长度：

```javascript
var test1 = [1,2,3,4];
test1.splice(0,3);//[1, 2, 3]
```

splice()方法还有其他用法，比如为一个数组添加或删除元素，具体见MDN，这里所有的方法都是简要介绍，详细的看MDN文档。

### 可变函数

JavaScript拥有一组可变函数，使用它们可以不必引用数组中的某个元素就能改变数组的内容。

- **为数组添加元素：**

push()和unshift().

push()方法会将一个元素添加到数组末尾，也可以使用数组的length属性为数组添加元素，但是push()看起来更直观：

```javascript
var nums = [1,2,3,4];
nums.push(5);
console.log(nums);//[1, 2, 3, 4, 5]
nums[nums.length] = 6;
console.log(nums);//[1, 2, 3, 4, 5, 6]
```

unshift()方法可以将元素添加在数组的开头，这个要是不用unshift来实现就比较麻烦了：

```javascript
var nums = [2,3,4];
var newnum = 1;
var N = nums.length;
for(var i = N;i>=0;i--){
    nums[i] = nums[i-1];//数组元素越来越多这种方法会越来越低效
}
nums[0] = newnum;

//使用unshift
var nums = [2,3,4];
var newnum = 1;
nums.unshift(newnum);//[1,2,3,4] 表达式结果是4
//一次添加多个
var nums = [3,4];
var newnum = 1;
nums.unshift(newnum,2);[1,2,3,4] 表达式结果是4
```

- **从数组中删除：**

使用pop()方法可以删除数组末尾的元素：

```javascript
var nums = [1,2,3,4];
nums.pop();//[1, 2, 3]   表达式结果是4
```

使用shift()方法则可以删除数组的第一个元素，pop()和shift()方法都将删除的元素作为方法的返回值返回，因此可以使用一个变量来保存删除的元素

```javascript
var nums = [1,2,3,4];
var first = nums.shift();
first;//1
```

- **从数组中间位置添加和删除元素:**

使用splice()方法即可，第一个参数表示起始索引，第二个参数表示需要删除的个数，第三个参数表示要添加进数组的元素：

```javascript
var nums = [1,4];
nums.splice(1,0,2,3);
nums;//[1, 2, 3, 4]
```

删除元素则只需要写前面两个参数即可，前面也写了示例。

- **为数组排序：**

第一个方法是reverse()，该方法将数组中元素的顺序进行翻转。如果数组的元素时字符串，那么使用数组的sort方法就很合适。因为sort()方法是按照字典顺序对元素进行排序的，因此它假定元素都是字符串类型的，如果是数字类型的也会被认为是字符串类型来进行比较，如果要拿sort进行数字类型元素的比较，可以在调用的时候传入一个比较大小的函数，那么排序的时候sort()方法就会将该函数比较数组中的两个元素的大小，从而决定整个数组的顺序：

```javascript
function compare(num1,num2){
    return num1-num2;
}
var nums = [2,3,1,4,6];
nums.sort(compare);//[1, 2, 3, 4, 6]
```

是不是觉得这个sort有点意思呀？return num1-num2也能当判断条件，这么神奇？那咱们就研究研究它的实现，下面是V8对快速排序实现部分的代码：

```javascript
function QuickSort(a, from, to) {
    var third_index = 0;
    while (true) {
        // Insertion sort is faster for short arrays.
        if (to - from <= 10) {
            InsertionSort(a, from, to);
            return;
        }
        if (to - from > 1000) {
            third_index = GetThirdIndex(a, from, to);
        } else {
            third_index = from + ((to - from) >> 1);
        }
        // Find a pivot as the median of first, last and middle element.
        var v0 = a[from];
        var v1 = a[to - 1];
        var v2 = a[third_index];
        var c01 = comparefn(v0, v1);
        if (c01 > 0) {
            // v1 < v0, so swap them.
            var tmp = v0;
            v0 = v1;
            v1 = tmp;
        } // v0 <= v1.
        var c02 = comparefn(v0, v2);
        if (c02 >= 0) {
            // v2 <= v0 <= v1.
            var tmp = v0;
            v0 = v2;
            v2 = v1;
            v1 = tmp;
        } else {
            // v0 <= v1 && v0 < v2
            var c12 = comparefn(v1, v2);
            if (c12 > 0) {
                // v0 <= v2 < v1
                var tmp = v1;
                v1 = v2;
                v2 = tmp;
            }
        }
        // v0 <= v1 <= v2
        a[from] = v0;
        a[to - 1] = v2;
        var pivot = v1;
        var low_end = from + 1; // Upper bound of elements lower than pivot.
        var high_start = to - 1; // Lower bound of elements greater than pivot.
        a[third_index] = a[low_end];
        a[low_end] = pivot;

        // From low_end to i are elements equal to pivot.
        // From i to high_start are elements that haven't been compared yet.
        partition: for (var i = low_end + 1; i < high_start; i++) {
            var element = a[i];
            var order = comparefn(element, pivot);
            if (order < 0) {
                a[i] = a[low_end];
                a[low_end] = element;
                low_end++;
            } else if (order > 0) {
                do {
                    high_start--;
                    if (high_start == i) break partition;
                    var top_elem = a[high_start];
                    order = comparefn(top_elem, pivot);
                } while (order > 0);
                a[i] = a[high_start];
                a[high_start] = element;
                if (order < 0) {
                    element = a[i];
                    a[i] = a[low_end];
                    a[low_end] = element;
                    low_end++;
                }
            }
        }
        if (to - high_start < low_end - from) {
            QuickSort(a, high_start, to);
            to = low_end;
        } else {
            QuickSort(a, from, low_end);
            from = high_start;
        }
    }
};
```

直接看源码实现有点懵。。。所以先搞懂快速排序的基本原理：先找出一个基准元素（pivot，任意元素均可），然后让所有元素跟基准元素比较，比基准元素小的，放到一个集合中，其他的放到另一个集合中；再对这两个集合执行快速排序，这样递归执行下去，最终得到完全排序好的序列。

```javascript
function QuickSort(arr, func) {    
    if (!arr || !arr.length) return [];    
    if (arr.length === 1) return arr;    
    var pivot = arr[0];    
    var smallSet = [];    
    var bigSet = [];    
    for (var i = 1; i < arr.length; i++) {        
        if (func(arr[i], pivot) < 0) {            
            smallSet.push(arr[i]);        
        } else {            
            bigSet.push(arr[i]);        
        }    
    }    
    return basicSort(smallSet, func).concat([pivot]).concat(basicSort(bigSet, func));//使用了一个新的数组对各部分的结果进行拼接
}
```

那直接在原数组之上进行修改而不创建一个新的数组是不是更好呢？

```javascript
function swap(arr, from, to) {    //处理元素交换
    if (from == to) return;    
    var temp = arr[from];    
    arr[from] = arr[to];    
    arr[to] = temp;
}

function QuickSortWithPartition(arr, func, from, to) {    
    if (!arr || !arr.length) return [];    
    if (arr.length === 1) return arr;    
    from = from === void 0 ? 0 : from;    
    to = to === void 0 ? arr.length - 1 : to;    //如果没有设置form、to就处理整个数组
    var pivot = arr[from];    
    var smallIndex = from;    smallIndex表示左侧小数分区的终止索引
    var bigIndex = from + 1;    bigIndex表示右侧大数分区的终止索引
    for (; bigIndex <= to; bigIndex++) {        
        if (func(arr[bigIndex], pivot) < 0) {            //只处理小于的情况，大于的本来就在大数组分区里了就不用处理了,继续bigIndex++即可。
            smallIndex++;            左侧小数分区++,并且把小的数字给换到smallIndex索引位置
            swap(arr, smallIndex, bigIndex);        
        }    
    }    
    swap(arr, smallIndex, from);    //基准元素的位置（可以是直接和smallIndex交换是因为只是分出大小数组，数组里面还是乱序）
    QuickSortWithPartition(arr, func, from, smallIndex - 1);    //继续迭代小数组
    QuickSortWithPartition(arr, func, smallIndex + 1, to);      //继续迭代大数组
    return arr;
}
```

再做进一步优化，从右往左找到小于基准的元素，然后和从左往右找到的大于基准的元素，二者直接进行位置交换，这样可以节省进行交换的次数：

```javascript
function QuickSortWithPartitionOp(arr, func, from, to) {    
    if (!arr || !arr.length) return [];    
    from = from === void 0 ? 0 : from;    
    to = to === void 0 ? arr.length - 1 : to;    
    if (from >= to - 1) return arr;    
    var pivot = arr[from];    
    var smallEnd = from + 1;    
    var bigBegin = to;    
    while (smallEnd < bigBegin) {        
        while (func(arr[bigBegin], pivot) > 0 && smallEnd < bigBegin) {            //这招在前面怎么写好js的学习笔记也有用过
            bigBegin--;        
        }        
        while (func(arr[smallEnd], pivot) < 0 && smallEnd < bigBegin) {            
            smallEnd++;        
        }        
        if (smallEnd < bigBegin) {            
            swap(arr, smallEnd, bigBegin);        
        }    
    }    
    swap(arr, smallEnd, from);    
    QuickSortWithPartitionOp(arr, func, from, smallEnd - 1);    
    QuickSortWithPartitionOp(arr, func, smallEnd + 1, to);    
    return arr;
}
```

基准元素的选择也是有讲究的，挑选基准元素的一种方法为三数取中，即挑选基准元素时，先把第一个元素、最后一个元素和中间一个元素挑出来，这三个元素中大小在中间的那个元素就被认为是基准元素。

```javascript
function getPivot(arr, func, from, to) {    
    var middle = (from + to) >> 1;   //右移运算符  右移一位相当于除2，右移n位相当于除以2的n次方
    var i0 = arr[from];    
    var i1 = arr[to];    
    var i2 = arr[middle];    
    var temp;    
    if (func(i0, i1) > 0) {        
        temp = i0;        
        i0 = i1;        
        i1 = temp;    
    }    
    if (func(i0, i2) > 0) {        
        arr[middle] = i0;        
        arr[from] = i2;        
        arr[to] = i1;        
        return i0;    
    } else {        
        arr[from] = i0;        
        if (func(i1, i2) > 0) {            
            arr[middle] = i1;            
            arr[to] = i2;            
            return i1;        
        } else {            
            arr[middle] = i2;            
            arr[to] = i1;            
            return i2;        
        }    
    }
}
```

不过v8的源代码的基准元素选取更为复杂。如果数组长度不超过1000，则进行基本的三数取中；如果数组长度超过1000，那么v8的处理是除去首尾的元素，对剩下的元素每隔200左右（200~215，并不固定）挑出一个元素。对这些元素排序，找出中间的那个，并用这个元素跟原数组首尾两个元素一起进行三数取中。

还有一个优化的地方在于重复元素的处理，从性能的角度，如果发现一个元素与基准元素相同，那么它应该被记录下来，避免后续再进行不必要的比较。所以还是得改分区的代码。

```javascript
function QuickSortWithPartitionDump(arr, func, from, to) {    
    if (!arr || !arr.length) return [];    
    from = from === void 0 ? 0 : from;    
    to = to === void 0 ? arr.length - 1 : to;    
    if (from >= to - 1) return arr;    
    var pivot = getPivot(arr, func, from, to);    //方法执行之后from比pivot小，to比pivot大
    var smallEnd = from;    
    var bigBegin = to;    
    for (var i = smallEnd + 1; i < bigBegin; i++) {        //i由smallEnd到bigBegin，而smallEnd和bigBegin在for循环过程中也是动态改变的
        var order = func(arr[i], pivot);        
        if (order < 0) {            //i处元素比基准小
            smallEnd++;            
            swap(arr, i, smallEnd);        
        } else if (order > 0) {            //i处元素比基准大
            while (bigBegin > i && order > 0) {            //while循环从bigBegin一直找出不比基准大的元素（可能是小于也可能是等于）    
                bigBegin--;                
                order = func(arr[bigBegin], pivot);     //order被更新了       
            }            
            if (bigBegin == i) break;            //分区结束
            swap(arr, i, bigBegin);            //不管那么多，先把i处不大于基准的数（bigBegin）和i处比基准大的数先换了
            if (order < 0) {                //再判断i处的数是和基准数的大小
                smallEnd++; 
                swap(arr, i, smallEnd);   
            }        
        }    
    }    
    QuickSortWithPartitionDump(arr, func, from, smallEnd);    
    QuickSortWithPartitionDump(arr, func, bigBegin, to);    
    return arr;
}
```

V8对于小数组（小于16项或10项。v8认为10项以下的是小数组。），可能使用快速排序的速度还不如平均复杂度更高的选择排序。所以对于小数组，可以使用选择排序法要提高性能，减少递归深度。

```javascript
function insertionSort(a, func, from, to) {    
    for (var i = from + 1; i < to; i++) {        
        var element = a[i];        
        for (var j = i - 1; j >= from; j--) {            
            var tmp = a[j];            
            if (func(tmp, element) > 0) {                
                a[j + 1] = tmp;            
            } else {                
                break;            
            }        
        }        
        a[j + 1] = element;    //j--如果没有break会是-1，break则跳出for循环
    }
}
```

还有一些V8做的额外的优化：快速排序递归很深，如果递归太深的话，很可以出现“爆栈”，我们应该尽可能避免这种情况。上面提到的对小数组采用选择排序算法，以及采用内省排序算法都可以减少递归深度。不过v8引擎中，做了一些不太常见的优化，每次我们分区后，v8引擎会选择元素少的分区进行递归，而将元素多的分区直接通过循环处理，无疑这样的处理大大减小了递归深度。

```javascript
function quickSort(arr, from, to) {    
    while (true) {         // 排序分区过程省略
                 // ...

        if (to - bigBegin < smallEnd - from) {            
            quickSort(a, bigBegin, to);            
            to = smallEnd;        
        } else {            
            quickSort(a, from, smallEnd);            
            from = bigBegin;        
        }    
    }
}
```

### 迭代器方法

 迭代器方法对数组中的每个元素应用一个函数，可以返回一个值、一组值或者一个新数组。

- **不生成新数组的迭代器方法：**

forEach(),该方法接受一个函数作为参数，对数组的每个元素使用该函数。

另一个迭代器方法是every()，该方法接受一个返回值为布尔类型的函数，对数组中的每个元素使用该函数。如果对于所有的元素，该函数均返回true则该方法返回true，还有some则是只要有一个元素返回true这个方法就返回true。

reduce()方法接受一个函数。返回一个值。该方法会从一个累加值开始，不断对累加值和数组的后续元素调用该元素，直到数组的最后一个元素，最后返回得到的累加值，下面的代码展示了如何使用reduce()方法为数组中的元素求和：

```javascript
function add(runningTotal,currentValue){
    console.log(runningTotal);//1 3 6 10
    console.log(currentValue);//2 3 4 5
    return runningTotal+currentValue;
}

var nums = [1,2,3,4,5];
var sum = nums.reduce(add);//15
```

reduce()方法还可以用来将数组中的元素连接成一个长的字符串。JavaScript还提供了reduceRight()方法，它则是从右到左执行。

- **生成新数组的迭代器方法：map()和filter()。**

map()和forEach()有点像，会对数组中的每个元素使用某个函数，两者的区别是map()返回一个新的数组，该数组的元素是对原有元素应用某个函数得到的结果。

```javascript
function first(word){
    return word[0];
}
var words = ['test','test1','test2'];
var test = words.map(first);
console.log(test.join(''));//ttt(如果是用toString的话会有逗号，所以用join()传入一个空字符串)
```

filter和every类似（也并不类似），传入一个返回值为布尔类型的函数。和every不同的是当对数组中的所有元素应用该函数结果均为true时，every返回true，而filter不是这样，filter对每个元素应用函数，之后返回一个数组，该数组包含应用该函数后结果为true的元素。

```javascript
function isBigEnough(value) {
  return value >= 10;
}
var filtered = [12, 5, 8, 130, 44].filter(isBigEnough);// filtered is [12, 130, 44]
```

也可以使用filter()方法过滤字符串数组，只要在调用的函数中使用indexOf判断返回true还是false即可。

之所以花大篇幅说明数组的特点也是因为数组是最常用最基础的。基于数组做简单的一些封装就可以实现列表、栈、队列的数据结构。

## 列表

---

列表是一组有序的数据。每个列表中的数据项称为元素。在JavaScript中，列表中的元素可以是任意数据类型。列表感觉只是在JavaScript的数组上边改了些方法名字，感觉还复杂了。。。一直也没用过。。。实现列表类：

```javascript
class List {
    constructor(){
        this.listSize = 0;// 
        this.pos = 0;
        this.dataStore = [];//初始化一个空数组来保存列表元素（底层存储结构还是数组）
    }
}
```

- append

实现append()方法给列表的下一个位置增加一个元素，这个位置刚好等于变量listSize的值，所以直接在listSize处添加元素，之后listSize增加1即可：

```javascript
function append(element) {
   this.dataStore[this.listSize++] = element;//++要在后面
}
```

* remove()、find()

remove()需要先删除指定元素，之后再移动数组元素填补空白，不过在JavaScript中用splice就可以很简单的解决这个问题：

```javascript
function find(element) {
   for (var i = 0; i < this.dataStore.length; ++i) {//遍历
      if (this.dataStore[i] == element) {
         return i;
      }
   }
   return -1;
}

function remove(element) {
   var foundAt = this.find(element);
   if (foundAt > -1) {
      this.dataStore.splice(foundAt,1);
      --this.listSize;
      return true;
   }
   return false;
}
function toString() {
    return this.dataStore;
}
```

其他方法的实现也大同小异，就先不赘述了，就是简单的包了一层数组，这样一个简单的List就实现了：

```javascript
var names = new List();
names.append("Cynthia");
names.append("Raymond");
names.append("Barbara");
console.log(names.toString());
names.remove("Raymond");
console.log(names.toString());
```

## 栈

---

栈就厉害了，它的使用遍布程序语言实现的方方面面：什么函数调用、表达式求值等等。栈简单的来说就是后入先出的一种数据结构，入栈push、出栈pop、查看栈顶元素peek。在JavaScript中基于数组也可以很容易的实现栈的数据结构：

```javascript
class Stack() {

    var items = [];

    push(element){
        items.push(element);
    };

    pop(){
        return items.pop();
    };

    peek(){
        return items[items.length-1];
    };

    isEmpty(){
        return items.length == 0;
    };

    size(){
        return items.length;
    };

    clear(){
        items = [];
    };

    print(){
        console.log(items.toString());
    };

    toString(){
        return items.toString();
    };
}
//基本使用
var stack = new Stack();
 console.log(stack.isEmpty()); //outputs true
 stack.push(5);
 stack.push(8);
 console.log(stack.peek()); // outputs 8
 stack.push(11);
 console.log(stack.size()); // outputs 3
 console.log(stack.isEmpty()); //outputs false
 stack.push(15);
 stack.pop();
 stack.pop();
 console.log(stack.size()); // outputs 2
 stack.print(); // outputs [5, 8]
//1.进制转换
//233 == 11101001
//2x(10x10) + 3x(10) + 3x(1)

function divideBy2(decNumber){

    var remStack = new Stack(),
        rem,
        binaryString = '';

    while (decNumber > 0){
        rem = Math.floor(decNumber % 2);
        remStack.push(rem);
        decNumber = Math.floor(decNumber / 2);
    }

    while (!remStack.isEmpty()){
        binaryString += remStack.pop().toString();
    }

    return binaryString;
}

console.log(divideBy2(233));
console.log(divideBy2(10));
console.log(divideBy2(1000));

/*
    The folow algorithm converts from base 10 to any base
 */
function baseConverter(decNumber, base){

    var remStack = new Stack(),
        rem,
        baseString = '',
        digits = '0123456789ABCDEF';

    while (decNumber > 0){
        rem = Math.floor(decNumber % base);
        remStack.push(rem);
        decNumber = Math.floor(decNumber / base);
    }

    while (!remStack.isEmpty()){
        baseString += digits[remStack.pop()];
    }

    return baseString;
}

console.log(baseConverter(100345, 2));
console.log(baseConverter(100345, 8));
console.log(baseConverter(100345, 16));

//2.判断回文
//使用栈的话可以轻松的判断一个字符串是否是回文
//直接将字符串完整压入栈后再弹出栈,判断前后两个字符串是否一致即可知道该字符串是否是回文
function isPalindrome(word) {
    let s = new Stack();
    for(let i=0;i0){
        rword+=s.pop();
    }
    if(word===rword){
        return true;
    }else{
        return false;
    }

}

//3.栈常常被用来实现编程语言，这里模拟一下使用栈实现递归(只是模拟)
function factorial(n){
    if(n===0){
        return 1;
    }else{
        return n*factorial(n-1);
    }
}

function fact(n){
    let s  = new Stack();
    while(n>1){
        s.push(n--);
    }
    let product = 1;
    while(s.length()>0){
        product*=s.pop();
    }
    return product;
}
```

## 队列

---

队列是一种列表，只不过只能在队尾插入元素队首删除元素，先进先出。基于数组来实现也是很简单。基于普通队列还可以实现带优先级的优先队列。

```javascript

class Queue{
    var items = [];

    enqueue(element){
        items.push(element);
    };

    dequeue(){
        return items.shift();
    };

    front(){
        return items[0];
    };

    isEmpty(){
        return items.length == 0;
    };

    clear(){
        items = [];
    };

    size(){
        return items.length;
    };

    print(){
        console.log(items.toString());
    };
}
//基本使用
var queue = new Queue();
console.log(queue.isEmpty()); //outputs true
queue.enqueue("John");
queue.enqueue("Jack");
queue.print();
queue.enqueue("Camila");
queue.print();
console.log(queue.size()); //outputs 3
console.log(queue.isEmpty()); //outputs false
queue.dequeue();
queue.dequeue();
queue.print();

//实现基数排序
function distribute(nums, queues, n ,digit){
    for(let i=0;i
```

## 链表

---

数组并不总是组织数据的最佳数据结构，静态语言下的数组长度是固定的，增加删除元素会很麻烦，需要把其他元素进行向前或者向后平移，虽然JavaScript的数组不用关心这个问题，但也因为JavaScript的数组是按对象来实现的，所以效率不高。这时候如果不需要随机访问，那么链表就几乎可以替代掉一维数组的使用场景。基于对象可以实现链表(包括双向链表与循环链表)。

```javascript
function LinkedList() {
    var Node = function (element) {
        this.element = element;
        this.next = null;
    };
    var length = 0;
    var head = null;
    this.append = function (element) {
        var node = new Node(element),
            current;
        if (head === null) { //first node on list
            head = node;
        } else {
            current = head;
            //loop the list until find last item
            while (current.next) {
                current = current.next;
            }
            //get last item and assign next to added item to make the link
            current.next = node;
        }
        length++; //update size of list
    };
    this.insert = function (position, element) {
        //check for out-of-bounds values
        if (position >= 0 && position <= length) {
            var node = new Node(element),
                current = head,
                previous,
                index = 0;
            if (position === 0) { //add on first position
                node.next = current;
                head = node;
            } else {
                while ((index++) < position) {
                    previous = current;
                    current = current.next;
                }
                node.next = current;
                previous.next = node;
            }
            length++; //update size of list
            return true;
        } else {
            return false;
        }
    };
    this.removeAt = function (position) {
        //check for out-of-bounds values
        if (position > -1 && position < length) {
            var current = head,
                previous,
                index = 0;
            //removing first item
            if (position === 0) {
                head = current.next;
            } else {
                while ((index++) < position) {
                    previous = current;
                    current = current.next;
                }
                //link previous with current's next - skip it to remove
                previous.next = current.next;
            }
            length--;
            return current.element;
        } else {
            return null;
        }
    };

    this.remove = function (element) {
        var index = this.indexOf(element);
        return this.removeAt(index);
    };

    this.indexOf = function (element) {
        var current = head,
            index = 0;
        while (current) {
            if (element === current.element) {
                return index;
            }
            index++;
            current = current.next;
        }
        return -1;
    };

    this.isEmpty = function () {
        return length === 0;
    };

    this.size = function () {
        return length;
    };

    this.getHead = function () {
        return head;
    };

    this.toString = function () {
        var current = head,
            string = '';
        while (current) {
            string = current.element;
            current = current.next;
        }
        return string;

    };

    this.print = function () {
        console.log(this.toString());
    };
}

//基本使用
var list = new LinkedList();
list.append(15);
list.print();
console.log(list.indexOf(15));
list.append(10);
list.print();
console.log(list.indexOf(10));
list.append(13);
list.print();
console.log(list.indexOf(13));
console.log(list.indexOf(10));
list.append(11);
list.append(12);
list.print();
console.log(list.removeAt(1));
list.print()
console.log(list.removeAt(3));
list.print();
list.append(14);
list.print();
list.insert(0, 16);
list.print();
list.insert(1, 17);
list.print();
list.insert(list.size(), 18);
list.print();
list.remove(16);
list.print();
list.remove(11);
list.print();
list.remove(18);
list.print();
```

那什么场景下JS使用链表会有优势呢？？？目前还没有遇到具体这样的场景。。。

其实会发现基于JavaScript的Array与Object类进行简单的封装就可以实现一些数据结构了，集合、字典/哈希表也不例外：

## 集合

---

集合有两个特点，一个是集合是无序的，另一个则是集合不允许相同成员存在。其实就是数学那些什么交集并集补集那些东西。ES6已经有了Set类可以直接使用。也可以基于数组实现，保证唯一性无非就是添加元素之前先indexOf()检查一下、删除则是splice，并集交集那些无非也就是遍历，因为已经有官方实现了所以就pass了：

[ES6 Set](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Set)

[ES6入门指南]([http://es6.ruanyifeng.com/#docs/set-map)

## 字典

---

字典是以键值对形式存储数据的数据结构，JavaScript的Object类就是以字典形式设计的。

ES6提供了Map数据结构，它类似于对象也是键值对的集合，但是它的键就不再限于字符串，各种类型的值都可以当作键，是一种更完善的哈希结构实现。

[ES6 Map](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Map)

[ES6入门指南]([http://es6.ruanyifeng.com/#docs/set-map)

## 哈希表

---

哈希表说白了就是空间换时间，基于数组（Map更好）实现哈希表其实就是所有元素根据该元素对应的键，保存在数组的特定位置（散列函数将键映射为一个数字），这样在哈希表上进行插入、删除和直接取得数据就非常快（毕竟是直接通过数组索引），但要是遍历操作（比如查找最大值什么的）那就不适合了（得用二叉查找树）。那如何使用一个高效的散列函数避免生成两个一样的键就有讲究了。

```javascript

functionHashTable() {
    vartable = [];
    varloseloseHashCode = function (key) {
        varhash = 0;
        for (vari = 0; i < key.length; i++) {
            hash += key.charCodeAt(i);
        }
        returnhash % 37;
    };
    vardjb2HashCode = function (key) {
        varhash = 5381;
        for (vari = 0; i < key.length; i++) {
            hash = hash * 33 + key.charCodeAt(i);
        }
        returnhash % 1013;
    };
    varhashCode = function (key) {
        returnloseloseHashCode(key);
    };
    this.put = function (key, value) {
        varposition = hashCode(key);
        console.log(position + ' - ' + key);
        table[position] = value;
    };
    this.get = function (key) {
        returntable[hashCode(key)];
    };
    this.remove = function (key) {
        table[hashCode(key)] = undefined;
    };
    this.print = function () {
        for (vari = 0; i < table.length; ++i) {
            if (table[i] !== undefined) {
                console.log(i + ": " + table[i]);
            }
        }
    };
}

//基本使用

varhash = newHashTable();

hash.put('Gandalf', 'gandalf@email.com');

hash.put('John', 'johnsnow@email.com');

hash.put('Tyrion', 'tyrion@email.com');

hash.put('Aaron', 'aaron@email.com');

hash.put('Donnie', 'donnie@email.com');

hash.put('Ana', 'ana@email.com');

hash.put('Jonathan', 'jonathan@email.com');

hash.put('Jamie', 'jamie@email.com');

hash.put('Sue', 'sue@email.com');

hash.put('Mindy', 'mindy@email.com');

hash.put('Paul', 'paul@email.com');

hash.put('Nathan', 'nathan@email.com');

console.log('**** Printing Hash **** ');

hash.print();

console.log('**** Get **** ');

console.log(hash.get('Gandalf'));

console.log(hash.get('Loiane'));

console.log('**** Remove **** ');

hash.remove('Gandalf');

console.log(hash.get('Gandalf'));

hash.print();
```

## 图

---

**Tips（2017-10-11）**：因为最近研究数据可视化的缘故，所以对图这个一开始瞅着以为啥用都没有的数据结构有了一回新的认知，受教育了。。。。

```javascript

class Graph {
    constructor() {
        this.vertices = []; //存储图中所有的顶点名字
        this.adjList = {}; //顶点邻接表
        this.marked = {};//顶点遍历标识位
        this.edgeTo = [];//存放从一个顶点到下一个顶点的所有边  
    }

    addVertex(v) { //添加顶点
        this.vertices.push(v);
        this.marked[v] = false;
        if (!this.adjList[v]) this.adjList[v] = {};
    }

    addEdge(v, w, n = 1) { //添加边
        this.adjList[v][w] = n; //基于有向图
        this.adjList[w][v] = n; //基于无向图
    }

    bfs(s) {
        let queue = [];
        this.marked[s] = true;
        queue.push(s);//非数字也是可以push的
        while (queue.length > 0) {
            let v = queue.shift();
            // if (v != undefined) {
            //     console.log("访问节点：" + v);
            // }
            for (let node in this.adjList[v]) {
                if (!this.marked[node]) {
                    this.edgeTo[node] = v;//将对应节点存入边数组  
                    this.marked[node] = true;//依次访问其相邻子列表
                    queue.push(node);//将子列表推送入队列  
                }
            }
        }
    }

    shortestPath(source, target) {
        let path = [];
        for (let i = target; i != source; i = this.edgeTo[i]) {//在相邻边数组中寻找  
            path.push(i);
        }
        path.push(source);//将起始节点加进最短路径数组  
        console.log(path);
        return path;  
    }
}
class Dijkstra {
    constructor(map) {
        this.map = map;
    }

    findShortestPath(start, end, map = this.map) {
        let costs = {},
            tempList = { '0': [start] },
            predecessors = {},
            nodes = [],
            tempEnd = end,
            mapArr = [],
            ListArr = [];
        for (let key in map) {
            mapArr.push(key);
        }
        costs[start] = 0;
        console.log('起始节点： ' + start)
        while (tempList) {
            let keys = [],
                List = '';
            for (let key in tempList) {
                Object.prototype.hasOwnProperty.call(tempList, key) && keys.push(key);
                List += (' ' + tempList[key] + '(消耗为' + key + ')');
            }
            if (List != '')
                console.log('List中现有：' + List);
            if (!keys.length) break;
            keys.sort((a, b) => a - b);

            let first = keys[0],
                bucket = tempList[first],
                node = bucket.shift(),
                currentCost = parseFloat(first),
                adjacentNodes = map[node] || {};
            if (ListArr.indexOf(node) != -1) continue;//如果是已经添加的节点就直接跳过
            console.log('找到其中消耗最小的节点：' + node)
            ListArr.push(node);

            if (ListArr.length == mapArr.length) break;//判断所有节点都被加入来作为结束条件
            if (!bucket.length) delete tempList[first];
            for (let key in tempList) {
                console.log('List中还剩： ' + tempList[key] + '(消耗为' + key + ')');
            }
            console.log(node + '节点到其他节点的关系为： ')
            for (let vertex in adjacentNodes) {
                if (Object.prototype.hasOwnProperty.call(adjacentNodes, vertex)) {
                    var cost = adjacentNodes[vertex],
                        totalCost = cost + currentCost,
                        vertexCost = costs[vertex];//取得当前节点之前保存的最小消耗

                    if ((vertexCost === undefined) || (vertexCost > totalCost)) {//需要更新
                        console.log('到' + vertex + '节点的最小消耗更新为' + totalCost);
                        costs[vertex] = totalCost;
                        if (!tempList['' + totalCost]) tempList['' + totalCost] = [];
                        tempList['' + totalCost].push(vertex);//
                        predecessors[vertex] = node;//记录前一个节点
                    } else {
                        console.log('从' + node + '到' + vertex + '的最小总消耗为' + totalCost + '。比之前保存的最短路径值' + vertexCost + '大，所以不用更改')
                    }
                }
            }
        }
        console.log('从' + start + '开始,到各点的最短距离为：');
        console.log(costs);
        while (tempEnd !== undefined) {
            nodes.push(tempEnd);
            tempEnd = predecessors[tempEnd];
        }
        nodes.reverse();//得到路径
        console.log('从' + start + '开始到' + end + '的最短路径为' + nodes.join('=>'));

    }
}
```

测试两种方法查找最短路径的时间：

```javascript
let startTime = new Date().getTime();
    let graph = new Graph();
    let myVertices = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
    function autoGenera(nodeNum) {
        for (let i = 0; i < nodeNum; i++) {
            graph.addVertex(String.fromCharCode(65 + i));
        }
        for (let i = 0; i < nodeNum - 1; i++) {
            let data = {};
            data.id = String.fromCharCode(65 + i);
            let source = String.fromCharCode(65 + Math.floor(Math.sqrt(i)));
            let target = String.fromCharCode(65 + i + 1);
            graph.addEdge(source, target);
        }
    }
    autoGenera(500);
    //1.多条最短路径的情况
    //2.性能测试
    // graph.addEdge('A', 'B');
    // graph.addEdge('A', 'C');
    // graph.addEdge('A', 'D');
    // graph.addEdge('C', 'D');
    // graph.addEdge('C', 'G');
    // graph.addEdge('D', 'G');
    // graph.addEdge('D', 'H');
    // graph.addEdge('B', 'E');
    // graph.addEdge('B', 'F');
    // graph.addEdge('E', 'I');
    console.log(graph.adjList);
    //结果如下：
    // A -> B C D 
    // B -> A E F 
    // C -> A D G 
    // D -> A C G H 
    // E -> B I 
    // F -> B 
    // G -> C D 
    // H -> D 
    // I -> E 

    // var map = {a:{b:2,c:5,d:1},b:{a:2,c:3,d:2},c:{b:3,d:3,e:1,a:5,f:5},d:{a:1,b:2,c:3,e:1},e:{c:1,d:1,f:2},f:{e:2,c:3}};
    let dijkstra = new Dijkstra(graph.adjList);
    dijkstra.findShortestPath('A', 'F');
    let endTime = new Date().getTime();
    console.log("dijkstra Time: ");
    console.log(endTime - startTime + "ms");

    //bfs
    let startTime1 = new Date().getTime();
    graph.bfs("A");
    let paths = graph.shortestPath("A", "F");
    while (paths.length > 0) {//将路径循环找出  
        if (paths.length > 1) {
            console.log(paths.pop() + "-");
        } else {
            console.log(paths.pop());
        }
    }
    let endTime1 = new Date().getTime();
    console.log("bfs Time: ");
    console.log(endTime1 - startTime1 + "ms");
```

## 拓扑排序：

拓扑排序的定义是将有向图中的顶点以线性方式进行排序。即对于任何连接自顶点u到顶点v的有向边uv，在最后的排序结果中，顶点u总是在顶点v的前面。

有两种实现方法：一种是Kahn算法，这个算法关键在于管理一个入度为0的顶点的集合，每次从该集合中取出(没有特殊的取出规则，随机取出也行，使用队列/栈也行，下同)一个顶点，将该顶点放入保存结果的List中。紧接着循环遍历由该顶点引出的所有边，从图中移除这条边，同时获取该边的另外一个顶点，如果该顶点的入度在减去本条边之后为0，那么也将这个顶点放到入度为0的集合中。然后继续从集合中取出一个顶点…………

当集合为空之后，检查图中是否还存在任何边，如果存在的话，说明图中至少存在一条环路。不存在的话则返回结果List，此List中的顺序就是对图进行拓扑排序的结果。

而另一种方法就是基于DFS的拓扑排序，只需要在即将退出dfs方法的时候，将当前顶点添加到结果集中即可

```javascript

function dfs(v){
    visited[v] = true;  
    for(w in adj[v]) {  
        if (!visited[w]){  
            dfs(w);  
        }  
    }   
    res.push(v);//多了这一行
}
```

只不过是换成了从出度的角度来构造。dfs方法本身是个递归方法，只要当前顶点还存在边指向其它任何顶点，它就会递归调用dfs方法，而不会退出。因此，退出dfs方法，意味着当前顶点没有指向其它顶点的边了(顶点都被标记过了)，即当前顶点是一条路径上的最后一个顶点。dfs还需实现环路检测（Kahn算法不需要，出度为0的集合为空之后，图中还存在没有被移除的边，就说明了图中存在环路）。

## 树

---

树是非线性结构的数据结构，以分层的方式存储数据用与比如文件系统的文件、存储有序列表等。而其中的特殊的树就是二叉树，在二叉树上进行查找非常的快（链表的劣势），添加和删除元素也非常快（数组的劣势）。

```javascript
//二叉树
function BinarySearchTree() {

    var Node = function(key){
        this.key = key;
        this.left = null;
        this.right = null;
    };

    var root = null;

    this.insert = function(key){

        var newNode = new Node(key);

        //special case - first element
        if (root === null){
            root = newNode;
        } else {
            insertNode(root,newNode);
        }
    };

    var insertNode = function(node, newNode){
        if (newNode.key < node.key){        //小数在左
            if (node.left === null){
                node.left = newNode;
            } else {
                insertNode(node.left, newNode);
            }
        } else {
            if (node.right === null){       //大数在右
                node.right = newNode;
            } else {
                insertNode(node.right, newNode);
            }
        }
    };

    this.getRoot = function(){
        return root;
    };

    this.search = function(key){

        return searchNode(root, key);
    };

    var searchNode = function(node, key){

        if (node === null){
            return false;
        }

        if (key < node.key){
            return searchNode(node.left, key);  //递归

        } else if (key > node.key){
            return searchNode(node.right, key);

        } else { //element is equal to node.item
            return true;
        }
    };

    this.inOrderTraverse = function(callback){      //中序遍历
        inOrderTraverseNode(root, callback);
    };

    var inOrderTraverseNode = function (node, callback) {
        if (node !== null) {
            inOrderTraverseNode(node.left, callback);//小
            callback(node.key);//中
            inOrderTraverseNode(node.right, callback);//大
        }
    };

    this.preOrderTraverse = function(callback){     //先序遍历
        preOrderTraverseNode(root, callback);
    };

    var preOrderTraverseNode = function (node, callback) {
        if (node !== null) {
            callback(node.key);//中
            preOrderTraverseNode(node.left, callback);//小
            preOrderTraverseNode(node.right, callback);//大
        }
    };

    this.postOrderTraverse = function(callback){        //后序遍历
        postOrderTraverseNode(root, callback);
    };

    var postOrderTraverseNode = function (node, callback) {
        if (node !== null) {
            postOrderTraverseNode(node.left, callback);//小
            postOrderTraverseNode(node.right, callback);//大
            callback(node.key);//中
        }
    };

    this.min = function() {
        return minNode(root);
    };

    var minNode = function (node) {
        if (node){
            while (node && node.left !== null) {
                node = node.left;
            }

            return node.key;
        }
        return null;
    };

    this.max = function() {
        return maxNode(root);
    };

    var maxNode = function (node) {
        if (node){
            while (node && node.right !== null) {
                node = node.right;
            }

            return node.key;
        }
        return null;
    };

    this.remove = function(element){
        root = removeNode(root, element);
    };

    var findMinNode = function(node){
        while (node && node.left !== null) {
            node = node.left;
        }

        return node;
    };

    var removeNode = function(node, element){

        if (node === null){
            return null;
        }

        if (element < node.key){
            node.left = removeNode(node.left, element);//递归
            return node;

        } else if (element > node.key){
            node.right = removeNode(node.right, element);
            return node;

        } else { //element is equal to node.item  找到了！！

            //handle 3 special conditions
            //1 - a leaf node   要删除的节点没有子节点
            //2 - a node with only 1 children  有一个
            //3 - a node with 2 children    有两个

            //case 1
            if (node.left === null && node.right === null){
                node = null;
                return node;
            }

            //case 2
            if (node.left === null){
                node = node.right;
                return node;

            } else if (node.right === null){
                node = node.left;
                return node;
            }

            //case 3
            var aux = findMinNode(node.right);  //右子树的最小节点（也可以是是左子树最大）----就是用最接近要删除的节点的值来替换，这样就不会搅乱顺序了
            node.key = aux.key;
            node.right = removeNode(node.right, aux.key);
            return node;
        }
    };
}
//基本使用
var tree = new BinarySearchTree();

tree.insert(11);
tree.insert(7);
tree.insert(15);
tree.insert(5);
tree.insert(3);
tree.insert(9);
tree.insert(8);
tree.insert(10);
tree.insert(13);
tree.insert(12);
tree.insert(14);
tree.insert(20);
tree.insert(18);
tree.insert(25);
tree.insert(6);

console.log('********* in-order transverse ***********');
function printNode(value){
    console.log(value);
}
tree.inOrderTraverse(printNode);

console.log('********* pre-order transverse ***********');
tree.preOrderTraverse(printNode);

console.log('********* post-order transverse ***********');
tree.postOrderTraverse(printNode);

console.log('********* max and min ***********');
console.log(tree.max());
console.log(tree.min());
console.log(tree.search(1) ? 'Key 1 found.' : 'Key 1 not found.');
console.log(tree.search(8) ? 'Key 8 found.' : 'Key 8 not found.');

console.log('********* remove 6 ***********');
tree.remove(6);
tree.inOrderTraverse(printNode);

console.log('********* remove 5 ***********');
tree.remove(5);
tree.inOrderTraverse(printNode);

console.log('********* remove 15 ***********');
tree.remove(15);
tree.inOrderTraverse(printNode);

console.log('********* raw data structure ***********');
console.log(tree.getRoot());
```

查询得知中序遍历可以用来做表达式树,在编译器底层实现的时候用,可以实现基本的加减乘除，比如 a*b+c,非常有意思，前序遍历用来实现目录结构的显示，后序遍历可以用来实现计算目录内的文件,占用的数据大小，实践应用中自己还并没有碰到到过需要定义树这个数据结构的情况。。。

虽然目前实际应用中JS自己还遇到过需要抽象这些数据结构来解决问题的场景（数组和队列基本就无往不克了。。），但毕竟书到用时方恨少嘛。。先留个印象也是好的~
