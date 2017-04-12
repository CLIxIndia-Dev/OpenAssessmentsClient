import $             from 'jquery';
import EdX           from './edx';

import { readFixture } from '../../../specs_support/utils';

describe('EdX', () => {

  beforeEach(() => {
    jasmine.Ajax.install();
  });

  afterEach(() => {
    jasmine.Ajax.uninstall();
  });

  describe('buildProblemMaterial', () => {

    it('builds html for a drag and drop using the provided material', () => {
      const xml  = readFixture('edXCourse/problem/1bdd2690346d437eacc85567ed79702f.xml');
      EdX.buildProblemMaterial($(xml));
    });

    it('builds html for a numeric input using the provided material', () => {
      const xml  = readFixture('edXCourse/problem/78934fbb26f44b2b85d252a4f3c52d54.xml');
      EdX.buildProblemMaterial($(xml));
    });

    it('builds html for a dropdown input using the provided material', () => {
      const xml  = readFixture('edXCourse/problem/8d6900d170f34deeb718866c2954c75f.xml');
      EdX.buildProblemMaterial($(xml));
    });

  });

});
