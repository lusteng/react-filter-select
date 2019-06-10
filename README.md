A multi select component for React.

## Installation

```bash
npm install react-filter-select
```

## Demo

![image](https://github.com/lusteng/react-filter-select/blob/master/images/react-mul-select.gif)
 
## Demo link 
[http://www.liubaitong.com/reactmulselect/index.html](http://www.liubaitong.com/reactmulselect/index.html)


## Usage

```javascript
import React from 'react'
import ReactDOM from 'react-dom'
import MultiSelect from 'react-filter-select' 

class App extends React.Component {
    constructor(props){
        super(props);
    }

    handleChange(checked){
        console.log(checked)  
    }

    render() { 
        return  <MultiSelect
                    options={[{id: "a", name: "a"}]}  
                    onchange={(checked) => this.handleChange(checked)}
                /> 
    }
} 

```

## API

| Prop | Type | Default | Description |
| --- | --- | --- | --- |  
| options | array | **Required** | 下拉选项列表 [{name: 'xxx', id: 'xxx'}] |
| defaultChecked | array | [] | 下拉框默认选中项ids ['xxx'] |
| onchange | func | **Required** | 选中的option发生改变时触发的回调函数 |
| selectedWordLength | number | 4 | 选中的项少于多少项时以逗号隔开显示 |   
| allowAdd | bool |  false | 搜索不到选项时，是否允许添加搜索内容至下拉列表 |
| size | string |  "large" | 下拉框外观大小 @params : "large" or "small"  |   

 

## License

MIT
