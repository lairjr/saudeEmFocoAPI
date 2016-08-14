import { expect } from 'chai';
import mongoose from 'mongoose';
import sinon from 'sinon';

import occurrences from '../../src/dbcollections/occurrences';

describe('dbcollections/occurrences', () => {
  it('associates correct collection', () => {
    expect(occurrences.modelName).to.equal('occurrences');
  });
});
