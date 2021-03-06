import React from 'react';
import normalizeLabel from '../../../src/helpers/normalizeLabel';
import Label from '../../../src/components/Label';

chai.should();

describe('normalizeLabel', () => {
  context('when given a label component', () => {
    it('should return the component', () => {
      const label = <Label />;

      normalizeLabel(label).should.equal(label);
    });
  });

  context('when given a string', () => {
    it('should return a label component', () => {
      const text = 'Hello world';
      const label = normalizeLabel(text);

      label.type.should.equal(Label);
      label.props.children.should.equal(text);
    });

    it('should supply the given props to the label component', () => {
      const text = 'Hello world';

      const props = {
        required: true,
      };

      const label = normalizeLabel(text, props);

      label.type.should.equal(Label);
      label.props.children.should.equal(text);

      Object.keys(props).forEach((propName) => {
        label.props[propName].should.equal(props[propName]);
      });
    });
  });
});
