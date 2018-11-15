import React, { Component } from 'react';
import { UnControlled as CodeMirror } from "react-codemirror2";
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import "codemirror/mode/javascript/javascript";
import styled from 'styled-components';
import "../codeMirror.css";
const cmOptions = {
  theme: "default",
  viewportMargin: Infinity,
  mode: {
    name: "javascript",
    json: true,
    statementIndent: 2,
  },
  lineNumbers: true,
  lineWrapping: true,
  indentWithTabs: false,
  tabSize: 2
};
const Title = styled.div`
  padding: 8px;
  border-bottom: 1px solid rgba(0,0,0,.25);
  font-weight: 500;
`
class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = { valid: true, code: props.code };
  }

  componentWillReceiveProps(props) {
    this.setState({ valid: true, code: props.code });
  }

/*   shouldComponentUpdate(nextProps, nextState) {
    return shouldRender(this, nextProps, nextState);
  } */

  onCodeChange = (editor, metadata, code) => {
    this.setState({ valid: true, code });
    setImmediate(() => {
      try {
        this.props.onChange(JSON.parse(this.state.code));
      } catch (err) {
        this.setState({ valid: false, code });
      }
    });
  };

  render() {
    const { title, theme } = this.props;
    return (
      <div>
        <Title>
          {title}
        </Title>
        <CodeMirror
          onChange={this.onCodeChange}
          value={this.props.code}
          autoCursor={false}
          options={{...cmOptions,...this.props}}
        />
      </div>
    );
  }
}

export default Editor;