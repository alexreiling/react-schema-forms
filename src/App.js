import React, { Component } from 'react';
import styled from 'styled-components'

import Editor from './components/Editor';
import FormGenerator from './components/FormGenerator';

import schema from './config/testForm'
const AppGrid = styled.div`
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  grid-template-areas: 
  'schema input form'
  'schema output form';


`
const GridCard = styled.div`
  grid-area: ${props => props.gridArea};
  background-color: white;
  border-bottom: 1px solid rgba(0,0,0,.25);
  border-right: 1px solid rgba(0,0,0,.25);

`

class App extends Component {
  constructor(){
    super()
    this.state = {
      schema:schema,
      output: {},
      input:{}
    }
  }
  onSchemaEdited = schema => {
    console.log(schema)
    this.setState({schema})
  }
  onFormDataChange = form => {
    this.setState({output:form.formData})
  }
  onInputChanged = input => {
    this.setState({input})
  }
  render() {
    return (
      <AppGrid>
        <GridCard gridArea='schema'>
          <Editor
            title="JSON Schema"
            code={JSON.stringify(this.state.schema, null, 2)}
            onChange={this.onSchemaEdited}
          />
        </GridCard>
        <GridCard gridArea='input'>
          <Editor
              title="Data input"
              code={JSON.stringify(this.state.input, null, 2)}
              onChange={this.onInputChanged}
            />
        </GridCard>
        <GridCard gridArea='output'>
        <Editor
            title="Form Output"
            code={JSON.stringify(this.state.output, null, 2)}
            readOnly = {true}
          />
        </GridCard>
        <GridCard gridArea='form'>
          <FormGenerator
            schema={JSON.stringify(this.state.schema)}
            onChange={this.onFormDataChange}/>
        </GridCard>
      </AppGrid>
    );
  }
}

export default App;
