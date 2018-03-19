import React          from 'react';
import { shallow }    from 'enzyme';
import AudioLimit     from './audio_limit';

describe('AudioLimit', () => {
  it('gets timeLimit', () => {
    const item =  {
      question: {
        timeValue: {
          hours: '1',
          minutes: '70',
          seconds: '100',
        }
      }
    };

    const result = AudioLimit.getAudioLimit(item);

    expect(result).toEqual(7900);
  });

  it('assigns a unique ID to the input field', () => {
    const props = {
      item: {
        id: 'foo'
      }
    };

    const result = shallow(<AudioLimit {...props} />);
    const expected = `audio-limit-${props.item.id}`;
    expect(result.find('input').first().html()).toContain(expected);
    expect(result.find('label').first().html()).toContain(expected);
  });
});
