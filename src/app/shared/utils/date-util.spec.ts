import { DateUtil } from './date-util';
import Sinon from 'sinon';

describe('DateUtil', () => {
  let clock: Sinon.SinonFakeTimers;

  beforeEach(() => {
    clock = Sinon.useFakeTimers(new Date('2026-01-01T12:00:00Z').getTime());
  });

  afterEach(() => {
    // Reset the clock to prevent persistent usage of the fake time
    clock.restore();
  });

  it('returns "Just now" for timestamps within 10 seconds', () => {
    const fiveSecondsAgo = new Date(Date.now() - 5000);
    const result = DateUtil.formatDistanceToNow(fiveSecondsAgo);

    expect(result).toBe('Just now');
  });

  it('returns "34 minutes ago" for timestamp under 1 hour', () => {
    const thirtyNineMinutes = new Date(Date.now() - 34 * DateUtil.MS_PER_MINUTE);
    const result = DateUtil.formatDistanceToNow(thirtyNineMinutes);

    expect(result).toBe('34 minutes ago');
  });

  it('returns "4 hours ago" for timestamps under 6 hours', () => {
    const fourHours = new Date(Date.now() - 4 * DateUtil.MS_PER_HOUR);
    const result = DateUtil.formatDistanceToNow(fourHours);

    expect(result).toBe('4 hours ago');
  });

  it('returns "Yesterday at h:mm AM" for timestamps 1 day old', () => {
    const oneDay = new Date(Date.now() - 1 * DateUtil.MS_PER_DAY);
    const result = DateUtil.formatDistanceToNow(oneDay);

    expect(result).toBe('Yesterday at 6:00 AM');
  });

  it('returns exact time when timestamp is longer than a week', () => {
    const overWeek = new Date(Date.now() - 9 * DateUtil.MS_PER_DAY);
    const result = DateUtil.formatDistanceToNow(overWeek);

    expect(result).toBe('12/23/2025 at 6:00 AM');
  });
});
