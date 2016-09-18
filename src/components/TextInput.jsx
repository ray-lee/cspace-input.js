import React, { PropTypes } from 'react';
import LineInput from './LineInput';
import MultilineInput from './MultilineInput';

function getInputComponent(multiline, value) {
  let isMultiline = false;

  if (typeof multiline === 'undefined' || multiline == null) {
    isMultiline = (value && value.indexOf('\n') >= 0);
  } else if (multiline) {
    isMultiline = true;
  }

  return (isMultiline ? MultilineInput : LineInput);
}

/**
 * A text input. There are three modes: single line, multiline, and fallback.
 *
 * In single line mode, the input is rendered as a LineInput.
 *
 * In multiline mode, the input is rendered as a MultilineInput.
 *
 * In fallback mode, the input is rendered as a LineInput, unless the supplied value contains a
 * newline; then it is rendered as a MultilineInput. Fallback mode is appropriate when existing
 * data to be rendered may contain a mix of single line and multiline values, but new values
 * should be prohibited from containing multiple lines.
 */
export default function TextInput(props) {
  const {
    multiline,
    value,
    ...remainingProps,
  } = props;

  const InputComponent = getInputComponent(multiline, value);

  return (
    <InputComponent
      value={value}
      {...remainingProps}
    />
  );
}

TextInput.propTypes = {
  multiline: PropTypes.bool,
  value: PropTypes.string,
  ...LineInput.propTypes,
  ...MultilineInput.propTypes,
};

TextInput.defaultProps = {
  multiline: null,
  value: '',
};

TextInput.isInput = true;
