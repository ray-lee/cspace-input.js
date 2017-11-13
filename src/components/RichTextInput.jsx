import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactQuill, { Quill } from 'react-quill';
import classNames from 'classnames';
import { pathPropType } from '../helpers/pathHelpers';
import styles from '../../styles/cspace-input/RichTextInput.css';
import '!style-loader!css-loader!react-quill/dist/quill.bubble.css';

// Change bold rendering to <b> (instead of <strong>).

const Bold = Quill.import('formats/bold');
Bold.tagName = 'B';
Quill.register(Bold, true);

// Change italic rendering to <i> (instead of <em>).

const Italic = Quill.import('formats/italic');
Italic.tagName = 'I';
Quill.register(Italic, true);

const propTypes = {
  embedded: PropTypes.bool,
  multiline: PropTypes.bool,
  name: PropTypes.string,
  parentPath: pathPropType,
  subpath: pathPropType,
  value: PropTypes.string,
  readOnly: PropTypes.bool,
};

export default class RichTextInput extends Component {
  constructor(props) {
    super(props);

    // Set the allowed formats.
    // TODO: Make this a prop.

    this.formats = ['bold', 'italic', 'underline', 'script'];

    // Configure the toolbar buttons.
    // TODO: Make this a prop.

    this.modules = {
      keyboard: {
        bindings: {
          enter: {
            key: 13,
            handler: () => {
              return this.props.multiline;
            },
          },
          tab: {
            // Don't allow tabs in the content, just do the browser default of focusing the next
            // field.

            handler: () => {
              this.setState({
                isFocused: false,
              });

              return true;
            },
          },
        },
      },
      toolbar: [
        ['bold', 'italic', 'underline', { 'script': 'sub'}, { 'script': 'super' }],
        ['clean'],
      ],
    };

    this.state = {
      value: this.props.value,
    };

    this.handleBlur = this.handleBlur.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    // this.handleRef = this.handleRef.bind(this);
  }

  handleBlur() {
    console.log("blur");
    this.setState({
      isFocused: false,
    });
  }

  handleChange(value) {
    console.log(value);
    this.setState({
      value,
    });
  }

  handleFocus() {
    console.log("focus");
    if (!this.props.readOnly) {
      this.setState({
        isFocused: true,
      });
    }
  }

  // handleRef(ref) {
  //   this.quill = ref;
  // }

  render() {
    const {
      embedded,
      name,
      readOnly,
      /* eslint-disable no-unused-vars */
      parentPath,
      subpath,
      /* eslint-enable no-unused-vars */
      ...remainingProps
    } = this.props;

    const {
      isFocused,
      value,
    } = this.state;

    const className = classNames({
      [styles.embedded]: embedded,
      [styles.normal]: !embedded,
      [styles.enabled]: !readOnly,
      [styles.focus]: isFocused,
    });

    return (
      <ReactQuill
        className={className}
        formats={this.formats}
        modules={this.modules}
        readOnly={readOnly}
        tabIndex={readOnly ? null : 0}
        theme="bubble"
        value={value}
        onChange={this.handleChange}
        onBlur={this.handleBlur}
        onFocus={this.handleFocus}
      />
    );
  }
}

RichTextInput.propTypes = propTypes;
