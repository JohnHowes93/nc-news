process.env.NODE_ENV = 'test';
const { expect } = require('chai');
const { dateParser } = require('../utils/utils');

describe('date fixing function', () => {
  it('parses the dates on an array', () => {
    const testData = [
      {
        title: 'Running a Node App',
        topic: 'coding',
        author: 'jessjelly',
        body:
          'This is part two of a series on how to get up and running with Systemd and Node.js. This part dives deeper into how to successfully run your app with systemd long-term, and how to set it up in a production environment.',
        created_at: 1471522072389,
      },
    ];
    const actual = dateParser(testData);
    const expected = [
      {
        title: 'Running a Node App',
        topic: 'coding',
        author: 'jessjelly',
        body:
          'This is part two of a series on how to get up and running with Systemd and Node.js. This part dives deeper into how to successfully run your app with systemd long-term, and how to set it up in a production environment.',
        created_at: '2016-08-18T12:07:52.389Z',
      },
    ];
    expect(actual).to.eql(expected);
  });
});
