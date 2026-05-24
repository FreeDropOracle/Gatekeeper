import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  getDoc,
  query,
  orderBy,
  serverTimestamp,
  Timestamp,
  writeBatch,
} from 'firebase/firestore';
import { db, isFirebaseReady } from './config';
import type { Category, LinkItem, ProgressTracker, Achievement } from '@/types';

function requireDb() {
  if (!db) throw new Error('Firestore not initialized. Configure .env.local');
}

// ─── Categories ───────────────────────────────────────────

export async function fetchCategories(userId: string): Promise<Category[]> {
  requireDb();
  const q = query(
    collection(db!, 'users', userId, 'categories'),
    orderBy('orderIndex', 'asc')
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as Category));
}

export async function createCategory(
  userId: string,
  data: Omit<Category, 'id' | 'createdAt'>
): Promise<Category> {
  requireDb();
  const docRef = await addDoc(collection(db!, 'users', userId, 'categories'), {
    ...data,
    createdAt: serverTimestamp(),
  });
  return { id: docRef.id, ...data, createdAt: Timestamp.now() } as Category;
}

export async function updateCategory(
  userId: string,
  categoryId: string,
  data: Partial<Category>
): Promise<void> {
  requireDb();
  const ref = doc(db!, 'users', userId, 'categories', categoryId);
  await updateDoc(ref, data);
}

export async function deleteCategory(userId: string, categoryId: string): Promise<void> {
  requireDb();
  await deleteDoc(doc(db!, 'users', userId, 'categories', categoryId));
}

export async function reorderCategories(
  userId: string,
  orderedIds: string[]
): Promise<void> {
  requireDb();
  const batch = writeBatch(db!);
  orderedIds.forEach((id, index) => {
    const ref = doc(db!, 'users', userId, 'categories', id);
    batch.update(ref, { orderIndex: index });
  });
  await batch.commit();
}

// ─── Links ────────────────────────────────────────────────

export async function fetchLinks(userId: string): Promise<LinkItem[]> {
  requireDb();
  const q = query(
    collection(db!, 'users', userId, 'links'),
    orderBy('createdAt', 'desc')
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as LinkItem));
}

export async function createLink(
  userId: string,
  data: Omit<LinkItem, 'id' | 'createdAt' | 'clickCount'>
): Promise<LinkItem> {
  requireDb();
  const payload = {
    ...data,
    clickCount: 0,
    createdAt: serverTimestamp(),
  };
  const docRef = await addDoc(collection(db!, 'users', userId, 'links'), payload);
  return { id: docRef.id, ...payload, createdAt: Timestamp.now() } as LinkItem;
}

export async function updateLink(
  userId: string,
  linkId: string,
  data: Partial<LinkItem>
): Promise<void> {
  requireDb();
  await updateDoc(doc(db!, 'users', userId, 'links', linkId), data);
}

export async function deleteLink(userId: string, linkId: string): Promise<void> {
  requireDb();
  await deleteDoc(doc(db!, 'users', userId, 'links', linkId));
}

export async function incrementLinkClicks(userId: string, linkId: string): Promise<void> {
  requireDb();
  const ref = doc(db!, 'users', userId, 'links', linkId);
  const snap = await getDoc(ref);
  const current = (snap.data()?.clickCount as number) || 0;
  await updateDoc(ref, { clickCount: current + 1 });
}

// ─── Progress ─────────────────────────────────────────────

export async function fetchProgress(userId: string): Promise<ProgressTracker[]> {
  requireDb();
  const snapshot = await getDocs(collection(db!, 'users', userId, 'progress'));
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as ProgressTracker));
}

export async function createProgress(
  userId: string,
  data: Omit<ProgressTracker, 'id' | 'updatedAt'>
): Promise<ProgressTracker> {
  requireDb();
  const payload = { ...data, updatedAt: serverTimestamp() };
  const docRef = await addDoc(collection(db!, 'users', userId, 'progress'), payload);
  return { id: docRef.id, ...payload, updatedAt: Timestamp.now() } as ProgressTracker;
}

export async function updateProgress(
  userId: string,
  progressId: string,
  data: Partial<ProgressTracker>
): Promise<void> {
  requireDb();
  await updateDoc(doc(db!, 'users', userId, 'progress', progressId), {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

export async function deleteProgress(userId: string, progressId: string): Promise<void> {
  requireDb();
  await deleteDoc(doc(db!, 'users', userId, 'progress', progressId));
}

// ─── Achievements ─────────────────────────────────────────

export async function fetchAchievements(userId: string): Promise<Achievement[]> {
  requireDb();
  const snapshot = await getDocs(collection(db!, 'users', userId, 'achievements'));
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as Achievement));
}

export async function unlockAchievement(
  userId: string,
  badgeId: string,
  progressSnapshot?: Record<string, unknown>
): Promise<void> {
  requireDb();
  await addDoc(collection(db!, 'users', userId, 'achievements'), {
    badgeId,
    unlockedAt: serverTimestamp(),
    progressSnapshot: progressSnapshot || {},
  });
}
