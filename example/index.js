import React from 'react'
import ReactDOM from 'react-dom'
import MultiSelect from '../src' 

const OPTIONS = [
    {id: "aaa", name: "aaa"}, 
    {id: "aaa1", name: "aaa1"},
    {id: "aaa2", name: "aaa2"},
    {id: "bbb", name: "bbb"}, 
    {id: "bbb1", name: "bbb1"}, 
    {id: "ccc", name: "ccc"}, 
    {id: "ccc1", name: "ccc1"}, 
    {id: "ddd", name: "ddd"}
];


const paddingLeft = "20px"; 
const preStyle = {
    background: "#eee",
    padding: "0 10px"
}

class App extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            checked1: [],
            checked2: ["aaa"],
            checked3: [],
            checked4: [],
            checked5: [],
            checked6: [],
        }
    }

    handleChangeState(ck, checkedName){     
        this.setState({ [checkedName] : ck })
    }

    render() { 

        return  <div className="container" style={{width: "1000px", margin: "0 auto"}}>
                    <div className="example1">
                        <p>1、默认参数</p>
                        <MultiSelect
                            options={OPTIONS}
                            onchange={(ck) => this.handleChangeState(ck, 'checked1')}
                        />
                        <span style={{paddingLeft}}>
                            选中值：{this.state.checked1.toString()}
                        </span>  
                        <pre style={preStyle}>
                            {`
<MultiSelect
    options={OPTIONS}
    onchange={(ck) => this.handleChangeState(ck, 'checked1')}
/>                             
                            `}
                        </pre>
                    </div>
                    <div className="example2"> 
                        <p>2、设置默认选中项</p>
                        <MultiSelect
                            options={OPTIONS}
                            defaultChecked={["aaa"]}
                            onchange={(ck) => this.handleChangeState(ck, 'checked2')}
                        />
                        <span style={{paddingLeft}}>
                            选中值：{this.state.checked2.toString()}
                        </span>   
                        <pre style={preStyle}>
                            {`
<MultiSelect
    options={OPTIONS}
    defaultChecked={["aaa"]}
    onchange={(ck) => this.handleChangeState(ck, 'checked2')}
/>                            
                            `}
                        </pre> 
                    </div>
                    <div className="example3"> 
                        <p>3、设置选中时可显示多少项选项名称</p>
                        <MultiSelect
                            options={OPTIONS}
                            selectedWordLength={1}
                            onchange={(ck) => this.handleChangeState(ck, 'checked3')}
                        />
                        <span style={{paddingLeft}}>
                            选中值：{this.state.checked3.toString()}
                        </span>   
                        <pre style={preStyle}>
                            {`
<MultiSelect
    options={OPTIONS}
    selectedWordLength={1}
    onchange={(ck) => this.handleChangeState(ck, 'checked3')}
/>                          
                            `}
                        </pre> 
                    </div>
                    <div className="example4"> 
                        <p>4、设置选中时可显示多少项选项名称</p>
                        <MultiSelect
                            options={OPTIONS}
                            selectedWordLength={1}
                            onchange={(ck) => this.handleChangeState(ck, 'checked4')}
                        />
                        <span style={{paddingLeft}}>
                            选中值：{this.state.checked4.toString()}
                        </span>   
                        <pre style={preStyle}>
                            {`
<MultiSelect
    options={OPTIONS}
    selectedWordLength={1}
    onchange={(ck) => this.handleChangeState(ck, 'checked4')}
/>                          
                            `}
                        </pre> 
                    </div>
                    <div className="example5"> 
                        <p>5、设置下拉选项未搜索到对应选项时，可直接回车或点击添加到下拉选项上</p>
                        <MultiSelect
                            options={OPTIONS}
                            allowAdd={true}
                            onchange={(ck) => this.handleChangeState(ck, 'checked5')}
                        />
                        <span style={{paddingLeft}}>
                            选中值：{this.state.checked5.toString()}
                        </span>   
                        <pre style={preStyle}>
                            {`
<MultiSelect
    options={OPTIONS}
    allowAdd={true}
    onchange={(ck) => this.handleChangeState(ck, 'checked5')}
/>                         
                            `}
                        </pre> 
                    </div>
                    <div className="example6"> 
                        <p>6、设置下拉选项size大小</p>
                        <MultiSelect
                            options={OPTIONS}
                            size="small"
                            onchange={(ck) => this.handleChangeState(ck, 'checked6')}
                        />
                        <span style={{paddingLeft}}>
                            选中值：{this.state.checked6.toString()}
                        </span>   
                        <pre style={preStyle}>
                            {` 
<MultiSelect
    options={OPTIONS}
    size="small"
    onchange={(ck) => this.handleChangeState(ck, 'checked6')}
/>                         
                            `}
                        </pre> 
                    </div> 
                </div>
    }
}


ReactDOM.render(
    <App />,
    document.getElementById('app')
)

