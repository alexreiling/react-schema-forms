import React, { Component } from 'react';
import update from 'immutability-helper';
import styled from 'styled-components';
const fallback ={
  placeholder:'',
  desc:'',
  name: 'WARNING: property name missing',
  label: 'Unnamed label',
  step: 1
}
const attrText = [
  'placeholder',
  'name',
  'regex'
]
const attrNumber = [
  'name',
  'placeholder',
  'min',
  'max',
  'step'
]
const attrTextArea = [
  'name',
  'cols',
  'maxLength',
  'placeholder',
  'rows',
  'wrap'
]
function filterProps(obj,propNames){
  var filteredProps = {}
  propNames.forEach(propName => filteredProps[propName] = obj[propName])
  return filteredProps;
}
function generateInputGroup(field, input){
  return <InputGroup>
    <Label htmlFor={field.name}>{field.label}</Label>
    {input}
  </InputGroup>
}
function processField(field,onChange){
  var input
  field = {...fallback,...field}
  if(field.type==='text' || field.type==='number') {
    const attrNames = field.type==='text' ? attrText : attrNumber;
    input = <Input 
      type={field.type}
      onChange={onChange}
      {...filterProps(field,attrNames)}/>
  }
  else if(field.type==='textarea') {
    input = <TextArea
      onChange={onChange}
      {...filterProps(field,attrTextArea)}></TextArea>
  }
  else return null
  return generateInputGroup(field, input)
}

function generateSection(section, onChange){
  //TODO: sorting fields by index
  var jsx = []
  // section title
  if(section.title) jsx.push(<h3>{section.title}</h3>)
  // section description
  if(section.desc) jsx.push(<Description>{section.desc}</Description>)
  // section fields
  if(section.fields) jsx = jsx.concat(section.fields.map(field => processField(field,onChange)))
  // section separator
  return <Section>{jsx}</Section>
}

/**
 * 
 */
class FormGenerator extends Component {
  constructor(props){
    super(props);
    this.state= {
      jsx:<div>Nothing</div>,
      formData: {}
    }
  }
  onChange = (e) => {
    this.setState(update(this.state, {
      formData: { [e.target.name]: {$set: e.target.value}}
    }),() => this.props.onChange(this.state))
  }
  generate = () => {
    // TODO: Grid Layout, sorting sections by index
    var schema = {}
    try{schema = JSON.parse(this.props.schema)}
    catch(err){return <div>{err.message}</div>}
    var jsx = []
    // form title
    if(schema.title) jsx.push(<h2>{schema.title}</h2>)
    // form description
    if(schema.desc) jsx.push(<Description>{schema.desc}</Description>)
    // sections
    if(schema.sections)jsx = jsx.concat(schema.sections.map(section => generateSection(section,this.onChange)))
    this.setState({jsx,newSchema: false})
  };
  componentDidMount(){
    this.generate()
  }
  componentDidUpdate(prevProps){
    if(this.props.schema!==prevProps.schema) this.generate()
  }
  render() {
    return (
      <Form>
        {this.state.jsx}
      </Form>
    );
  }
}
const Form =styled.form`
  font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  padding: 8px;

`
const Section = styled.div`
  border-bottom: 1px solid rgba(0,0,0,.25);
  padding: 8px;
  display:grid;
  grid-template-columns: 1fr;
  grid-template-rows: 40px;
`
const InputGroup = styled.div`
  display: grid;
  grid-template-columns: 200px 1fr;
  margin-bottom: 8px;

`
const Description = styled.p`
  font-style:italic;
  color: #757575;
  padding-left: 8px;
  font-size: 14px;

`
const Label = styled.label`
  font-size: 14px;
  padding: 12px;
  justify-self:end;
`
const Input = styled.input`
  background-color:#f5f5f5;
  height: 40px;
  border: none;
  padding-left: 8px;
`
const TextArea = styled.textarea`
  background-color:#f5f5f5;
  font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  border: none;
  padding-left: 8px;
`
export default FormGenerator;