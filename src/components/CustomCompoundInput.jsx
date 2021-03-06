import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import classNames from 'classnames';
import get from 'lodash/get';
import { getPath, pathPropType } from '../helpers/pathHelpers';
import { isInput } from '../helpers/inputHelpers';
import styles from '../../styles/cspace-input/CompoundInput.css';

const propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  defaultChildSubpath: pathPropType,
  name: PropTypes.string,
  // TODO: Stop using propTypes in isInput. Until then, these unused props need to be declared so
  // this component is recognized as an input.
  /* eslint-disable react/no-unused-prop-types */
  parentPath: pathPropType,
  subpath: pathPropType,
  /* eslint-enable react/no-unused-prop-types */
  readOnly: PropTypes.bool,
  value: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.instanceOf(Immutable.Map),
  ]),
};

const defaultProps = {
  children: undefined,
  className: undefined,
  defaultChildSubpath: undefined,
  name: undefined,
  parentPath: undefined,
  subpath: undefined,
  readOnly: undefined,
  value: {},
};

const getChildValue = (value, subpath, name) => {
  let keyPath = [];

  if (subpath) {
    keyPath = keyPath.concat(subpath);
  }

  if (name) {
    keyPath = keyPath.concat(name);
  }

  if (keyPath.length === 0) {
    return value;
  }

  if (Immutable.Map.isMap(value)) {
    return value.getIn(keyPath);
  }

  return get(value, keyPath);
};

export default class CustomCompoundInput extends Component {
  decorateInputs(children) {
    const {
      readOnly,
    } = this.props;

    return React.Children.map(children, (child) => {
      if (!child || !child.type) {
        // Undefined/null child or text node. Just return it.
        return child;
      }

      if (isInput(child)) {
        const {
          name,
        } = child.props;

        let {
          subpath,
        } = child.props;

        const {
          defaultChildSubpath,
          value,
        } = this.props;

        if (typeof subpath === 'undefined') {
          subpath = defaultChildSubpath;
        }

        return React.cloneElement(child, {
          readOnly,
          subpath,
          parentPath: getPath(this.props),
          value: getChildValue(value, subpath, name),
        });
      }

      return React.cloneElement(child, {
        children: this.decorateInputs(child.props.children),
      });
    }, this);
  }

  render() {
    const {
      children,
      className,
      name,
      readOnly,
    } = this.props;

    const classes = classNames(className, styles.common, {
      [styles.readOnly]: readOnly,
    });

    return (
      <fieldset
        className={classes}
        data-name={name}
      >
        {this.decorateInputs(children)}
      </fieldset>
    );
  }
}

CustomCompoundInput.propTypes = propTypes;
CustomCompoundInput.defaultProps = defaultProps;
