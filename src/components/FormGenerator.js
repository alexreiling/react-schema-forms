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
  if(section.title) jsx.push(<H3>{section.title}</H3>)
  // section description
  if(section.desc) jsx.push(<Description>{section.desc}</Description>)
  // section fields
  if(section.fields) jsx = jsx.concat(section.fields.map(field => processField(field,onChange)))
  // section separator
  return <Section>{jsx}</Section>
}
function generateSubmit(submit, onSubmit){
  if(submit.type==='http')
    return <Submit type='button' onClick={()=>alert(`This would be an http ${submit.method} request to ${submit.url}`)}>{submit.buttonText}</Submit>
  else if(submit.type==='onSubmit')
    return <Submit type='button' onClick={()=>onSubmit}>{submit.buttonText}</Submit>
  else return null;
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
    if(schema.title) jsx.push(<H2>{schema.title}</H2>)
    // form description
    if(schema.desc) jsx.push(<Description>{schema.desc}</Description>)
    // sections
    if(schema.sections)jsx = jsx.concat(schema.sections.map(section => generateSection(section,this.onChange)))
    // submit
    if(schema.submit) jsx.push(generateSubmit(schema.submit,this.onSubmit))
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
  margin:16px;
  padding: 24px;
  border-radius: 4px;
  box-shadow: 0 10px 20px rgba(0,0,0,0.19);

`
const Section = styled.div`
  border-bottom: 1px solid rgba(0,0,0,.25);
  display:grid;
  grid-template-columns: 1fr;
  grid-template-rows: 40px;
  :last-of-type {
    border-bottom: none;
  }
`
const InputGroup = styled.div`
  display: grid;
  grid-template-columns: 200px 1fr;
  margin-bottom: 8px;

`
const Description = styled.p`
  color: #757575;
  margin:0;
  margin-bottom: 8px;
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
  padding: 8px;
  resize: none;
  font-size: 14px;

`
const H2 = styled.h2`
  margin: 8px 0 8px 0;
  padding: 0;
  font-weight:300;
  letter-spacing: 1px;
  color: #757575;

`
const H3 = styled.h3`
  margin: 8px 0 8px 0;
  padding: none;
  font-weight:600;

`
const Submit = styled.button`
  background-color:#4285f4;
  border:none;
  cursor: pointer;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  text-align: center;
  text-transform: uppercase;
  text-rendering: geometricPrecision;
  color: #fff;
  min-width: 100px;
  line-height: 20px;
  box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14),0 3px 1px -2px rgba(0,0,0,0.12),0 1px 5px 0 rgba(0,0,0,0.2);
  font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  padding: 8px;
  
`
export default FormGenerator;