import React from 'react';
import { render } from 'react-dom';
import createTestContainer from '../../helpers/createTestContainer';
import { isInput } from '../../../src/helpers/inputHelpers';
import RichTextInput from '../../../src/components/RichTextInput';

chai.should();

describe('RichTextInput', function suite() {
  beforeEach(function before() {
    this.container = createTestContainer(this);
  });

  const handleCommit = () => {};

  it('should be considered an input by isInput()', function test() {
    isInput(<RichTextInput />).should.equal(true);
  });

  it('should render as a Quill editor', function test() {
    render(
      <RichTextInput
        value="Hello <i>world</i>"
        onCommit={handleCommit}
      />, this.container);

    // this.container.firstElementChild.nodeName.should.equal('INPUT');
    // this.container.firstElementChild.type.should.equal('text');
  });

  it('when multiline is true', function test() {
    render(
      <RichTextInput
        multiline
        value="Hello <i>world</i>"
        onCommit={handleCommit}
      />, this.container);

    // this.container.firstElementChild.nodeName.should.equal('INPUT');
    // this.container.firstElementChild.type.should.equal('text');
  });

  it('when readOnly is true', function test() {
    render(
      <RichTextInput
        readOnly
        value="Hello <i>world</i>"
      />, this.container);

    // this.container.firstElementChild.nodeName.should.equal('INPUT');
    // this.container.firstElementChild.type.should.equal('text');
  });
});
