// Have to import angular first before angular-mocks
// https://github.com/Workiva/karma-jspm/issues/23
import angular from 'angular';
import 'angular-mocks';
import UserModule from './addons';
import UserFactory from './addons.factory';
import test from './addons-test';

describe('Addons', ()=>{
  it('should run this test', ()=> {
    expect(4).to.equal(4);
  });

  it('should import properly', function() {
    expect(test.hello).to.equal('world');
  });
});
