# Go

## 1. 变量

在 Go 语言中，使用关键字 `var`声明变量，变量名后紧接变量类型（类型后置）。在声明变量时，变量类型后置，且行尾无需分号，例如：

``` go
var message string = 'Hello Wrold'
```

:::info
Go 是一种静态类型语言，因此变量（variable）是有明确类型的，编译器也会检查变量类型的正确性
:::

变量的命名规则遵循驼峰命名法，即首个单词小写，每个新单词的首字母大写，例如： startDate

### 1.1 基本类型

在 Go 语言中，变量可大致为：布尔型（bool）、字符串型（string）、整型（int）、浮点型（float）、复数型（complex）

:::tip 补充

- 计算机中数据存储的最小单位为 bit（位），即 0 或者 1
- byte 是计算机中数据的基本单元，1 字节 = 8 bit，数据在计算机中存储或者计算，至少为1个字节
:::

> [!IMPORTANT]
>
> - 所有的内存在 Go 中都是经过初始化的
> - 当一个变量被声明之后，系统自动赋予它该类型的零值：
> `int 为 0`，`float 为 0.0`，`bool 为 false`，`string 为空字符串`，`指针为 nil`

```go
package main

import "fmt"

var age int 

func main() {
  fmt.Println(age)    // 输出 0
}
```

#### 1.1.1 预定义类型（predeclared types）

整型默认占用 4 字节，此外还可通过额外指定位数来调整占用空间，例如：int8(占一个字节)、int16(占两个字节)、int32(占4个字节)、int64（占8个字节）

在 int 前额外前缀 `u` 即可表示`无符号整数`，例如：uint8、uint16、uint32、uint64、uintptr

:::tip

- 有符号和无符号的区别：int8 范围 -128-127，uint8 范围：0-255
- `uint8` 可以使用 `byte` 来进行表示
- `int32` 可以使用 `rune` 来表示，通常代表一个 `Unicode 码`

:::

float 类型的预定义类型与整型类似，但是只有：`float32` 和 `float64`

#### 1.1.2 不指明变量类型

变量类型的后置通常不是严格的，可以省略，`在编译时编译器会自动推导类型`，例如：

```go
package main

import "fmt"

var level = 1

func main() {
  /**
    Printf 用于格式化输出,它的第一个参数是格式字符串，也就是 "%T"(用于打印变量类型)，
    后续的参数是要格式化的值
  */
 fmt.Printf("%T", level)    // 输出 int
}
```

### 1.2 批量格式

> 觉得每行都用 var 声明变量比较烦琐？Go语言提供了批量声明的方式

~~~go
var (
    a int
    b string
    c []float32
)
~~~

~~~go
package main

import "fmt"


var (
 a int
 b string
 c []float32
)
func main() {
    //%d 整数占位符，%s 字符串占位符， %f 浮点数占位符(默认精度为6)
 fmt.Printf("%d,%s,%f",a,b,c)
}
~~~

## 1.5 简短格式

> 我们可以省略`var`关键字，这样写起来更加便捷

~~~go
//i是变量名 1 是值（或者表达式）
i := 1
~~~

**上面讲过，如果不指明类型，直接赋值，Go会自动推导类型**

使用简短格式有以下限制：

1. 定义变量，同时显式初始化
2. 不能提供数据类型
3. 只能用在函数内部

~~~go
package main

import "fmt"

//不能
//aa :=1
func main() {
 aa :=1
 fmt.Println(aa)
}
~~~

**简短变量声明被广泛用于大部分的局部变量的声明和初始化，var 形式的声明语句往往用于需要显式指定变量类型的地方**

# 2. 初始化变量

~~~go
//创建了一个游戏角色 初始等级为1
var level int = 1
~~~

~~~go
//短变量声明
level := 1
~~~

以下的代码会出错：

~~~go
package main

func main() {
 
 var level int = 1
    // 再次声明并赋值 会报错 no new variables on left side of := （左边的变量已经被声明了，不能重复声明）
 level := 1
}
~~~

**但是有特例**

比如：`net.Dial`提供按指定协议和地址发起网络连接，这个函数有两个返回值，一个是`连接对象（conn）`，一个是`错误对象（err）`

正常的写法：

~~~go
package main

import (
 "fmt"
 "net"
)
func main() {

 var conn net.Conn
 var err error
 conn, err = net.Dial("tcp", "127.0.0.1:8080")
 fmt.Println(conn)
 fmt.Println(err)
}
~~~

短变量的写法：

~~~go
package main

import (
 "fmt"
 "net"
)

func main() {

 conn, err := net.Dial("tcp", "127.0.0.1:8080")
 conn1, err := net.Dial("tcp", "127.0.0.1:8080")
 fmt.Println(conn)
 fmt.Println(conn1)
 fmt.Println(err)
}
~~~

**在多个短变量声明和赋值中，至少有一个新声明的变量出现在左值中，即便其他变量名可能是重复声明的，编译器也不会报错**

# 3. 小demo

> 变量交换，比如a=100，b=200，交换之后 a=200，b=100

如果是你，你会怎么样进行实现呢？

**第一种**

~~~go
package main

import "fmt"

func main() {
 a := 100
 b := 200
 var c int
 c = b
 b = a
 a = c
 fmt.Printf("a=%d,b=%d",a,b)
}
~~~

**第二种**

~~~go
package main

import "fmt"

func main() {
 a := 100
 b := 200

 a = a^b
 b = b^a
 a = a^b
 fmt.Printf("a=%d,b=%d",a,b)
}
~~~

**第三种**

~~~go
package main

import "fmt"

func main() {
 a := 100
 b := 200
 b,a = a,b
 fmt.Printf("a=%d,b=%d",a,b)
}
~~~

> 应该有点体会到Go语言编程的快捷，方便以及强大了吧

# 4. 匿名变量

使用`多重赋值`时，如果`不需要在左值中接受变量`，可以使用匿名变量

比如上面的例子:

~~~go
package main

import (
 "fmt"
 "net"
)
func main() {

    //conn, err := net.Dial("tcp", "127.0.0.1:8080")
    //如果不想接收err的值，那么可以使用_表示，这就是匿名变量
    conn, _ := net.Dial("tcp", "127.0.0.1:8080")
 fmt.Println(conn)
}
~~~

> 匿名变量以“_”下划线表示
>
> 匿名变量不占用命名空间，也不会分配内存。匿名变量可以重复声明使用

**“_”本身就是一个特殊的标识符，被称为空白标识符。它可以像其他标识符那样用于变量的声明或赋值（任何类型都可以赋值给它），但任何赋给这个标识符的值都将被抛弃，因此这些值不能在后续的代码中使用，也不可以使用这个标识符作为变量对其它变量进行赋值或运算。**

~~~go
package main

import (
 "fmt"
 "net"
)

func main() {

 conn, _ := net.Dial("tcp", "127.0.0.1:8080")
 //匿名变量可以重复声明
 conn1, _ := net.Dial("tcp", "127.0.0.1:8080")
 // 匿名变量不可以直接开头
 // _ :=1
 fmt.Println(conn)
 fmt.Println(conn1)
}
~~~

# 5. 作用域

> 一个变量（常量、类型或函数）在程序中都有一定的作用范围，称之为`作用域`。

了解变量的作用域对我们学习Go语言来说是比较重要的，因为`Go语言(静态语言)会在编译时检查每个变量是否使用过，一旦出现未使用的变量，就会报编译错误`。

如果不能理解变量的作用域，就有可能会带来一些不明所以的编译错误。

根据变量定义位置的不同，可以分为以下三个类型：

- 函数内定义的变量称为局部变量
- 函数外定义的变量称为全局变量
- 函数定义中的变量称为形式参数

## 5.1 局部变量

在函数体内声明的变量称之为`局部变量`，它们的作用域`只在函数体内`，函数的参数和返回值变量都属于局部变量。

**局部变量不是一直存在的，它只在定义它的函数被调用后存在，函数调用结束后这个局部变量就会被销毁。**

~~~go
package main
import (
    "fmt"
)
func main() {
    //声明局部变量 a 和 b 并赋值
    var a int = 3
    var b int = 4
    //声明局部变量 c 并计算 a 和 b 的和
    c := a + b
    fmt.Printf("a = %d, b = %d, c = %d\n", a, b, c)
}
~~~

## 5.2 全局变量

在函数体外声明的变量称之为`全局变量`，全局变量只需要在`一个源文件中定义，就可以在所有源文件中使用`，当然，不包含这个全局变量的源文件需要使用“import”关键字引入全局变量所在的源文件之后才能使用这个全局变量。

全局变量声明`必须以 var 关键字开头`，如果想要在外部包中使用全局变量的`首字母必须大写`。

~~~go
package main
import "fmt"
//声明全局变量
var c int
func main() {
    //声明局部变量
    var a, b int
    //初始化参数
    a = 3
    b = 4
    c = a + b
    fmt.Printf("a = %d, b = %d, c = %d\n", a, b, c)
}
~~~

**Go语言程序中全局变量与局部变量名称可以相同，但是函数体内的局部变量会被优先考虑。**

~~~go
package main
import "fmt"
//声明全局变量
var bb float32 = 3.14
func main() {
 bb := 3
 fmt.Println(bb)
}
//执行结果 3
~~~

## 5.3 形式参数

在定义函数时函数名后面括号中的变量叫做`形式参数`（简称形参）。形式参数只在函数调用时才会生效，函数调用结束后就会被销毁，在函数未被调用时，函数的形参`并不占用实际的存储单元`，也没有实际值。

形式参数会作为`函数的局部变量来使用`。

~~~go
package main
import (
    "fmt"
)
//全局变量 a
var a int = 13
func main() {
    //局部变量 a 和 b
    var a int = 3
    var b int = 4
    fmt.Printf("main() 函数中 a = %d\n", a)
    fmt.Printf("main() 函数中 b = %d\n", b)
    c := sum(a, b)
    fmt.Printf("main() 函数中 c = %d\n", c)
}
func sum(a, b int) int {
    fmt.Printf("sum() 函数中 a = %d\n", a)
    fmt.Printf("sum() 函数中 b = %d\n", b)
    num := a + b
    return num
}
~~~

**至此，Go语言变量相关的知识，我们就掌握了**
