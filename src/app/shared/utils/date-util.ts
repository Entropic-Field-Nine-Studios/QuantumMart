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
   * Examples: Just now, 39 seconds ago, 4 hours ago, Today at 2:23pm, In 3 days
   *
   * @param date
   * @returns
   */
  static formatDistanceToNow(date: string | Date): string {
    const d = typeof date === 'string' ? new Date(date) : date;
    const now = new Date();

    const diffMs = now.getTime() - d.getTime();
    if (diffMs < 0) {
      // Handle dates in the future
      return this.relevanceInFuture(diffMs);
    }

    const diffSeconds = Math.floor(diffMs / DateUtil.MS_PER_SECOND);
    const diffMinutes = Math.floor(diffMs / DateUtil.MS_PER_MINUTE);
    const diffHours = Math.floor(diffMs / DateUtil.MS_PER_HOUR);
    const diffDays = Math.floor(diffMs / DateUtil.MS_PER_DAY);

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

  private static relevanceInFuture(diffMs: number): string {
    const futureMs = Math.abs(diffMs);
    const futureMinutes = Math.floor(futureMs / DateUtil.MS_PER_MINUTE);
    const futureHours = Math.floor(futureMs / DateUtil.MS_PER_HOUR);
    const futureDays = Math.floor(futureMs / DateUtil.MS_PER_DAY);

    if (futureMinutes < 1) {
      return 'In a moment';
    }

    if (futureMinutes < 60) {
      return `In ${futureMinutes} minutes`;
    }

    if (futureHours < 24) {
      return `In ${futureHours} hours`;
    }

    if (futureDays === 1) {
      return `Tomorrow at ${DateUtil.formatTime(new Date(diffMs))}`;
    }

    return `In ${futureDays} days`;
  }

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
