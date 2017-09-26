const agent = require('superagent-promise')(require('superagent'), Promise);
const chai = require('chai');

const { expect } = chai;
const chaiSubset = require('chai-subset');

chai.use(chaiSubset);

const urlRepo = 'https://api.github.com/users/aperdomob';

describe('Api Github Tests', () => {
  const user = {
    name: 'Alejandro Perdomo',
    company: 'PSL',
    location: 'Colombia'
  };

  it('Consume GET Service - get user aperdomob', () => agent
    .get(urlRepo)
    .then((response) => {
      expect(response.body.name).to.equal(user.name);
      expect(response.body.company).to.equal(user.company);
      expect(response.body.location).to.equal(user.location);
    }));

  it('Consume GET Service - get all repositories and filter', () => {
    const repoNameToFind = 'jasmine-awesome-report';
    const repositoryInfo = {
      full_name: 'aperdomob/jasmine-awesome-report',
      private: false,
      description: 'An awesome html report for Jasmine'
    };

    return agent
      .get(`${urlRepo}/repos`)
      .then((response) => {
        const repository = response.body.find(repo => repo.name === repoNameToFind);
        expect(repository).to.not.equal({});
        expect(repository.full_name).to.equal(repositoryInfo.full_name);
        expect(repository.private).to.equal(repositoryInfo.private);
        expect(repository.description).to.equal(repositoryInfo.description);
      });
  });
});
