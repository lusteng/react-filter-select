import React from 'react'
import ClassNames from 'classnames'
import Checkbox from '../components/Checkbox'   
import PropTypes from 'prop-types'
import { fromJS } from 'immutable'

//style
import '../assets/css/multiSelect.scss'

class MultiSelect extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            expanded: false,
            hasFocus: false,
            search: "",
            checked: this.props.defaultChecked ? [...this.props.defaultChecked] : [],
            options: [...this.props.options] || [],
            visibleSearch: true,
        }

        this.wrapper = Object;
    }
 
    componentWillMount() {
        let self = this;
        document.addEventListener('touchstart', (e) => this.handleDocumentClick(e, self));
        document.addEventListener('mousedown', (e) => this.handleDocumentClick(e, self));
    } 

    componentWillReceiveProps(nextProps){
        if(this.props.defaultChecked && !fromJS(this.props.defaultChecked).equals(fromJS(nextProps.defaultChecked))){
            this.setState({
                checked : [...nextProps.defaultChecked]
            });
        }
        if(!fromJS(this.props.options).equals(fromJS(nextProps.options))){
            this.setState({
                options: [...nextProps.options]
            })
        }
    }
    

    handleDocumentClick(ev, self){ 
        self.wrapper && 
        !self.wrapper.contains(ev.target) && 
        self.setState({expanded: false, search: ""});
    }  

    handleFocus(e){ 
        const { hasFocus } = this.state;
        e.target === this.wrapper && 
        !hasFocus && 
        this.setState({hasFocus: true});
    }

    handleBlur(e = {target: any}){
        const { hasFocus } = this.state;
        hasFocus && this.setState({hasFocus: false});
    }

    handleToggleExpanded(bool){
        const { expanded } = this.state;
        if (this.props.isLoading) {
            return;
        }
        const newExpanded = bool === undefined ? !expanded : bool;
        this.setState({expanded: newExpanded, visibleSearch: newExpanded});
        if (!newExpanded && this.wrapper) {
            this.wrapper.focus();
        }
    }  

    handleChangeCheck(id, ev){  
        let { checked } = this.state;  
        const index = checked.indexOf(id); 
        index > -1 ? checked.splice(index, 1) : checked.push(id);
        this.setState({checked, visibleSearch: false}); 
        this.props.onchange(checked);
        ev.preventDefault();
    }

    handleChangeCheckAll(ev){
        const { search, checked, options } = this.state;
        let matchCheckboxLen = 0;
        let checkedLen = 0;
        if(options.length > 0){
            options.map(o => {
                if(o.name.indexOf(search) > -1){
                    matchCheckboxLen ++;
                    checked.indexOf(o.id) > -1 && checkedLen ++;
                }
            });
            if(checkedLen < matchCheckboxLen){  
                options.map(item => {
                    item.name.indexOf(search) > -1 && 
                    checked.indexOf(item.id) === -1 && 
                    checked.push(item.id);    
                });
            }else{    
                options.map(item => {
                    item.name.indexOf(search) > -1 && 
                    checked.splice(checked.indexOf(item.id), 1);    
                });          
            }  
        }
        this.setState({ checked, visibleSearch: matchCheckboxLen === 0 });
        this.props.onchange(checked);
        ev.preventDefault();
    } 

    handleChangeSearch(search){
        this.setState({ search }); 
    }

    handleCustomAddOption(){
        if(this.props.allowAdd){
            let { search, options } = this.state;
            options.unshift({
                id: new Date().getTime(),
                name: search
            });
            this.setState({
                options
            });
        }
    }

    render(){
        const { 
            expanded,
            hasFocus,
            search,
            checked,
            options,
            visibleSearch
         } = this.state
         
        const checkedLen = checked.length, 
              selectedWordLength = (this.props.selectedWordLength || this.props.selectedWordLength === 0) ? (this.props.selectedWordLength + 1) : 4,  
              optionsLen = options.length;

        let selectedName = '',
            count = 0,
            showCount = 0,
            showCheckedLen = 0,
            list = [];

        options.map((item, index) => {
            const isHasChecked = checked.indexOf(item.id) > -1;
            if(isHasChecked){
                count ++;
                checkedLen < selectedWordLength && (selectedName += item.name + ',');
            }
            if(item.name.indexOf(search) === -1){
                return;
            }
            isHasChecked && showCount ++;
            showCheckedLen ++; 
            list.push(<p key={index} className="multi-line text-overflow" title={item.name} onClick={e => this.handleChangeCheck(item.id, e)}>
                        <Checkbox
                            checked={checked.indexOf(item.id) > -1}
                            onClick={e => this.handleChangeCheck(item.id, e)}
                        >
                        {item.name}
                        </Checkbox>
                    </p>);
        }); 

        list.length === 0 && (list = <p key={'empty'} className="multi-line" onClick={e => this.handleCustomAddOption()}>
                                        <span className="multi-text">
                                            {
                                                optionsLen > 0 
                                              ? this.props.allowAdd 
                                              ? "无匹配结果，回车或点击可添加" 
                                              : "无匹配数据" 
                                              : "无数据" 
                                            }
                                        </span>        
                                    </p>)
          count < selectedWordLength 
        ? (selectedName = selectedName.substring(0, selectedName.length - 1)) 
        : (selectedName = '已选中'+ count +'个选项');    
        optionsLen === count && (selectedName = optionsLen === 0 ? "请选择" : "全选");
        
        return (
            <div 
                className={ClassNames({"multi-select-wrap": true, "small": this.props.size && this.props.size === 'small'})}  
                ref={ref => this.wrapper = ref} 
                onFocus={this.handleFocus.bind(this)}
                onBlur={this.handleBlur.bind(this)}
            > 
                <div 
                    className={ClassNames({"multi-input": true, expanded, "focus" : hasFocus})}
                    style={{width: this.props.width || "248px" }} 
                > 
                    <input 
                        type="text" 
                        value={visibleSearch ? search : ""} 
                        className="multi-search" 
                        placeholder={selectedName || this.props.placeholder || "请选择" } 
                        onFocus={e => this.handleToggleExpanded(true)}
                        onChange={e => this.handleChangeSearch(e.target.value)} 
                    />
                    <i className="icon"></i>  
                </div>
                {expanded && <div className="multi-dropdown"> 
                    <p key={"all"} className="multi-line" onClick={e => this.handleChangeCheckAll(e)}>
                        <Checkbox
                            checked={optionsLen > 0 && showCheckedLen > 0 && showCheckedLen === showCount} 
                            onClick={e => this.handleChangeCheckAll(e)}
                        >
                        全选/全不选
                        </Checkbox>
                    </p>
                    <div className="multi-list">
                        {list}
                    </div>  
                </div>}         
            </div>
        )
    }
}

MultiSelect.propTypes = {
    options: PropTypes.array.isRequired,
    defaultChecked: PropTypes.array,
    onchange: PropTypes.func,
    selectedWordLength: PropTypes.number,
    allowAdd: PropTypes.bool,
    size: PropTypes.string
}

export default MultiSelect