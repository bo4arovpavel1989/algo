const chai = require('chai'),
	{expect} = chai;
const { loopSearch, recursionSearch } = require('./lookForKey');


describe('lookForKey loop search', () => {
  it('should find key', () => {
    const chest = [
      { name: 'box', contains: { name: 'box', contains: { name: 'book' } } },
      { name: 'box', contains: { name: 'bottle' } },
      { name: 'box', contains: { name: 'key' } }
    ];
    const result = loopSearch(chest);

    expect(result).to.eql(true)
  })

  it('should not find key', () => {
    const chest = [
      { name: 'box', contains: { name: 'box', contains: { name: 'book' } } },
      { name: 'box', contains: { name: 'bottle' } },
      { name: 'box', contains: { name: 'box', contains: {} } }
    ];
    const result = loopSearch(chest);

    expect(result).to.eql(false)
  })
});


describe('lookForKey recursion search', () => {
  it('should find key', () => {
    const chest = [
      { name: 'box', contains: { name: 'box', contains: { name: 'book' } } },
      { name: 'box', contains: { name: 'bottle' } },
      { name: 'box', contains: { name: 'key' } }
    ];
    const result = recursionSearch(chest);

    expect(result).to.eql(true)
  })

  it('should not find key', () => {
    const chest = [
      { name: 'box', contains: { name: 'box', contains: { name: 'book' } } },
      { name: 'box', contains: { name: 'bottle' } },
      { name: 'box', contains: { name: 'box', contains: {} } }
    ];
    const result = recursionSearch(chest);

    expect(result).to.eql(false)
  })
});
