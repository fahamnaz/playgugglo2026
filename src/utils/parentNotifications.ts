import type { ParentNotification } from '../data/parentDashboard';

const PARENT_NOTIFICATIONS_KEY = 'playspark-parent-notifications';
const PARENT_NOTIFICATIONS_EVENT = 'playspark-parent-notifications-updated';
const CHILD_NAME_KEY = 'playspark-child-name';
const DEFAULT_CHILD_NAME = 'Alex';
const MAX_PARENT_NOTIFICATIONS = 10;
const DUPLICATE_WINDOW_MS = 2500;

type NotificationTone = ParentNotification['tone'];

interface StoredParentNotification {
  id: string;
  title: string;
  detail: string;
  tone: NotificationTone;
  emoji: string;
  createdAt: string;
}

interface RewardNotificationInput {
  title: string;
  detail: string;
  tone?: NotificationTone;
  emoji?: string;
}

function readStoredNotifications(): StoredParentNotification[] {
  if (typeof window === 'undefined') return [];

  try {
    const raw = window.localStorage.getItem(PARENT_NOTIFICATIONS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((item): item is StoredParentNotification => {
      return Boolean(
        item &&
        typeof item.id === 'string' &&
        typeof item.title === 'string' &&
        typeof item.detail === 'string' &&
        typeof item.tone === 'string' &&
        typeof item.emoji === 'string' &&
        typeof item.createdAt === 'string',
      );
    });
  } catch {
    return [];
  }
}

function getRelativeTimeLabel(createdAt: string) {
  const diffMs = Date.now() - new Date(createdAt).getTime();
  const diffMins = Math.max(0, Math.floor(diffMs / 60000));

  if (diffMins < 1) return 'Just now';
  if (diffMins === 1) return '1 min ago';
  if (diffMins < 60) return `${diffMins} mins ago`;

  const diffHours = Math.floor(diffMins / 60);
  if (diffHours === 1) return '1 hour ago';
  if (diffHours < 24) return `${diffHours} hours ago`;

  const diffDays = Math.floor(diffHours / 24);
  if (diffDays === 1) return '1 day ago';
  return `${diffDays} days ago`;
}

function notifyParentFeedUpdated() {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new Event(PARENT_NOTIFICATIONS_EVENT));
}

export function persistChildName(name: string) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(CHILD_NAME_KEY, name);
}

export function getStoredChildName() {
  if (typeof window === 'undefined') return DEFAULT_CHILD_NAME;
  return window.localStorage.getItem(CHILD_NAME_KEY) || DEFAULT_CHILD_NAME;
}

export function getStoredParentNotifications(): ParentNotification[] {
  return readStoredNotifications().map((item) => ({
    title: item.title,
    detail: item.detail,
    tone: item.tone,
    emoji: item.emoji,
    time: getRelativeTimeLabel(item.createdAt),
  }));
}

export function pushParentNotification(input: RewardNotificationInput) {
  if (typeof window === 'undefined') return;

  const existing = readStoredNotifications();
  const latest = existing[0];
  if (latest && latest.title === input.title && latest.detail === input.detail) {
    const latestTime = new Date(latest.createdAt).getTime();
    if (Date.now() - latestTime < DUPLICATE_WINDOW_MS) {
      return;
    }
  }

  const next: StoredParentNotification = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    title: input.title,
    detail: input.detail,
    tone: input.tone ?? 'info',
    emoji: input.emoji ?? '🌟',
    createdAt: new Date().toISOString(),
  };

  const updated = [next, ...existing].slice(0, MAX_PARENT_NOTIFICATIONS);
  window.localStorage.setItem(PARENT_NOTIFICATIONS_KEY, JSON.stringify(updated));
  notifyParentFeedUpdated();
}

export function createRewardNotification(action: string, detail: string, tone: NotificationTone = 'success', emoji = '🌟') {
  const childName = getStoredChildName();
  pushParentNotification({
    title: `${childName} ${action}`,
    detail,
    tone,
    emoji,
  });
}

export function subscribeToParentNotifications(onChange: () => void) {
  if (typeof window === 'undefined') return () => {};

  const handleStorage = (event: StorageEvent) => {
    if (!event.key || event.key === PARENT_NOTIFICATIONS_KEY) onChange();
  };

  window.addEventListener('storage', handleStorage);
  window.addEventListener(PARENT_NOTIFICATIONS_EVENT, onChange);

  return () => {
    window.removeEventListener('storage', handleStorage);
    window.removeEventListener(PARENT_NOTIFICATIONS_EVENT, onChange);
  };
}
