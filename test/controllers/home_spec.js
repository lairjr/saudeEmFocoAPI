import assert from 'assert';
import sinon from 'sinon';

import homeController from '../../src/controllers/home';

describe('home controller', () => {
  const res = {
    send: sinon.spy()
  };

  it('sends a hello world', (done) => {
    homeController.get({}, res);

    assert(res.send.calledWith('Hello world'));

    done();
  });
});
