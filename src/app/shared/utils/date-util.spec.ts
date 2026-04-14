import { DateUtil } from './date-util';
import Sinon from 'sinon';

describe('DateUtil', () => {
  let clock: Sinon.SinonFakeTimers;

  beforeEach(() => {
    clock = Sinon.useFakeTimers(new Date(2026, 0, 1, 6, 0, 0).getTime());
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

  it('returns "X minutes ago" for timestamp under 1 hour', () => {
    const thirtyNineMinutes = new Date(Date.now() - 34 * DateUtil.MS_PER_MINUTE);
    const result = DateUtil.formatDistanceToNow(thirtyNineMinutes);

    expect(result).toBe('34 minutes ago');
  });

  it('returns "X hours ago" for timestamps under 6 hours', () => {
    const fourHours = new Date(Date.now() - 4 * DateUtil.MS_PER_HOUR);
    const result = DateUtil.formatDistanceToNow(fourHours);

    expect(result).toBe('4 hours ago');
  });

  it('returns "Today at X" for timestamp on the same day', () => {
    const today = new Date(Date.now() - 6 * DateUtil.MS_PER_HOUR);
    const result = DateUtil.formatDistanceToNow(today);

    expect(result).toBe('Today at 12:00 AM');
  });

  it('returns "Yesterday at X" for timestamp on the previous day', () => {
    const prevDay = new Date(Date.now() - 12 * DateUtil.MS_PER_HOUR);
    const result = DateUtil.formatDistanceToNow(prevDay);

    expect(result).toBe('Yesterday at 6:00 PM');
  });

  it('returns "X days ago" using exact calendar days', () => {
    const fiveDays = new Date(Date.now() - (12 * DateUtil.MS_PER_HOUR + 4 * DateUtil.MS_PER_DAY));
    const result = DateUtil.formatDistanceToNow(fiveDays);

    expect(result).toBe('5 days ago');
  });

  it('returns exact time when timestamp is longer than a week', () => {
    const overWeek = new Date(Date.now() - 9 * DateUtil.MS_PER_DAY);
    const result = DateUtil.formatDistanceToNow(overWeek);

    expect(result).toBe('12/23/2025 at 6:00 AM');
  });

  // ================
  // = FUTURE TESTS =
  // ================

  it('returns "In a moment" for timestamps less than 1 minute in the future', () => {
    const inMoment = new Date(Date.now() + 30 * DateUtil.MS_PER_SECOND);
    const result = DateUtil.formatDistanceToNow(inMoment);

    expect(result).toBe('In a moment');
  });

  it('returns "In X minutes" for timestamps less than 1 hour away', () => {
    const inMinutes = new Date(Date.now() + 25 * DateUtil.MS_PER_MINUTE);
    const result = DateUtil.formatDistanceToNow(inMinutes);

    expect(result).toBe('In 25 minutes');
  });

  it('returns "In X hours" for timestamps less than 8 hours away', () => {
    const inFourHours = new Date(Date.now() + 4 * DateUtil.MS_PER_HOUR);
    let result = DateUtil.formatDistanceToNow(inFourHours);

    expect(result).toBe('In 4 hours');

    // Test singular
    const inOneHour = new Date(Date.now() + DateUtil.MS_PER_HOUR);
    result = DateUtil.formatDistanceToNow(inOneHour);

    expect(result).toBe('In 1 hour');
  });

  it('returns "Today at X" for timestamps more than 7 hours away on same day', () => {
    const inEightHours = new Date(Date.now() + 8 * DateUtil.MS_PER_HOUR);
    const result = DateUtil.formatDistanceToNow(inEightHours);

    expect(result).toBe('Today at 2:00 PM');
  });

  it('returns "Tomorrow at X" for timestamps 1 calendar day away', () => {
    const in20Hours = new Date(Date.now() + 20 * DateUtil.MS_PER_HOUR);
    const result = DateUtil.formatDistanceToNow(in20Hours);

    expect(result).toBe('Tomorrow at 2:00 AM');
  });
});
