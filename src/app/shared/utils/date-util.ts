/**
 * Utility class for manipulating dates.
 */
export class DateUtil {
  /** Milliseconds in a second. */
  static readonly MS_PER_SECOND = 1000;
  /** Milliseconds in a minute. */
  static readonly MS_PER_MINUTE = DateUtil.MS_PER_SECOND * 60;
  /** Milliseconds in an hour. */
  static readonly MS_PER_HOUR = DateUtil.MS_PER_MINUTE * 60;
  /** Milliseconds in a day. */
  static readonly MS_PER_DAY = DateUtil.MS_PER_HOUR * 24;

  /**
   * From a date, return relevance to the current time as a string.
   *
   * Examples:
   * - Just now
   * - 39 seconds ago
   * - 4 hours ago
   * - Today at 2:23 PM
   * - In 3 days
   *
   * @param date Timestamp or `Date` object to check relevancy on
   * @returns
   */
  static formatDistanceToNow(date: string | Date): string {
    const d = typeof date === 'string' ? new Date(date) : date;
    const now = new Date();

    const diffMs = now.getTime() - d.getTime();
    if (diffMs < 0) {
      // Handle dates in the future
      return this.relevanceInFuture(d, diffMs);
    }

    const diffSeconds = Math.floor(diffMs / DateUtil.MS_PER_SECOND);
    const diffMinutes = Math.floor(diffMs / DateUtil.MS_PER_MINUTE);
    const diffHours = Math.floor(diffMs / DateUtil.MS_PER_HOUR);
    const diffDays = this.calendarDayDiff(d, now);

    // Under 10 seconds
    if (diffSeconds <= 10) {
      return 'Just now';
    }

    // Under a minute
    if (diffSeconds < 60) {
      return `${diffSeconds} seconds ago`;
    }

    // Under 1 hour
    if (diffMinutes < 60) {
      if (diffMinutes === 1) {
        return '1 minute ago';
      }
      return `${diffMinutes} minutes ago`;
    }

    // Under 6 hours
    if (diffHours < 6) {
      if (diffHours === 1) {
        return '1 hour ago';
      }
      return `${diffHours} hours ago`;
    }

    // Today
    if (diffDays === 0) {
      return `Today at ${this.formatTime(d)}`;
    }

    // Yesterday
    if (diffDays === 1) {
      return `Yesterday at ${this.formatTime(d)}`;
    }

    // Within the last week
    if (diffDays < 7) {
      return `${diffDays} days ago`;
    }

    // Final fallback
    return `${d.toLocaleDateString()} at ${this.formatTime(d)}`;
  }

  /**
   * Gets the difference in calendar days between two dates.
   *
   * Example: 01/29/2026 6:00 AM vs 02/01/2026 3:00 AM = `2` days
   *
   * @param a Past date (should be before `b`)
   * @param b Future date
   * @returns Calendar day difference.
   */
  private static calendarDayDiff(a: Date, b: Date): number {
    const aMid = new Date(a.getFullYear(), a.getMonth(), a.getDate());
    const bMid = new Date(b.getFullYear(), b.getMonth(), b.getDate());

    const diffMs = bMid.getTime() - aMid.getTime();

    return Math.floor(diffMs / DateUtil.MS_PER_DAY);
  }

  /**
   * Constructs a calendar distance string using a time in the future.
   *
   * Examples: In a moment, In 35 minutes.
   *
   * @param target Target date
   * @param diffMs Difference in MS from the current time to the target date
   * @returns
   */
  private static relevanceInFuture(target: Date, diffMs: number): string {
    const futureMs = Math.abs(diffMs);

    const futureMinutes = Math.floor(futureMs / DateUtil.MS_PER_MINUTE);
    const futureHours = Math.floor(futureMs / DateUtil.MS_PER_HOUR);

    const now = new Date();
    const futureDays = this.calendarDayDiff(now, target);

    if (futureMinutes <= 1) {
      return 'In a moment';
    }

    if (futureMinutes < 60) {
      return `In ${futureMinutes} minutes`;
    }

    if (futureHours < 8) {
      if (futureHours === 1) {
        return 'In 1 hour';
      }

      return `In ${futureHours} hours`;
    }

    if (futureDays === 0) {
      return `Today at ${DateUtil.formatTime(target)}`;
    }

    if (futureDays === 1) {
      return `Tomorrow at ${DateUtil.formatTime(target)}`;
    }

    return `In ${futureDays} days`;
  }

  /**
   * Gets time from a date as `H:mm A` (2-digit hour, 2-digit minute, AM/PM).
   *
   * @param date
   * @returns
   */
  private static formatTime(date: Date): string {
    return date.toLocaleTimeString([], {
      hour: 'numeric',
      minute: '2-digit',
    });
  }

  private constructor() {
    // Empty constructor
  }
}
