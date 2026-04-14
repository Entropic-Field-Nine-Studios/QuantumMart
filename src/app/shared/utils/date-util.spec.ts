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

  it('returns "Today at 12:00 AM" for timestamp on the same day', () => {
    const today = new Date(Date.now() - 6 * DateUtil.MS_PER_HOUR);
    const result = DateUtil.formatDistanceToNow(today);

    expect(result).toBe('Today at 12:00 AM');
  });

  it('returns "Yesterday at 6:00 PM" for timestamp on the previous day', () => {
    const prevDay = new Date(Date.now() - 12 * DateUtil.MS_PER_HOUR);
    const result = DateUtil.formatDistanceToNow(prevDay);

    expect(result).toBe('Yesterday at 6:00 PM');
  });

  it('returns exact time when timestamp is longer than a week', () => {
    const overWeek = new Date(Date.now() - 9 * DateUtil.MS_PER_DAY);
    const result = DateUtil.formatDistanceToNow(overWeek);

    expect(result).toBe('12/23/2025 at 6:00 AM');
  });
});
