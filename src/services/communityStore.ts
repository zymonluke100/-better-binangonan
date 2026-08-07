import { db } from '../lib/firebase';
import { collection, addDoc, getDocs, onSnapshot, query, orderBy, doc, updateDoc } from 'firebase/firestore';
import { Announcement, ResidentReport } from '../types';

// Real-time listener for LGU announcements from Firestore
export const subscribeAnnouncements = (
  callback: (announcements: Announcement[]) => void
) => {
  try {
    const q = query(collection(db, 'announcements'));
    return onSnapshot(q, (snapshot) => {
      const list: Announcement[] = [];
      snapshot.forEach((docSnap) => {
        const data = docSnap.data();
        list.push({
          id: docSnap.id,
          title: data.title || 'Official LGU Announcement',
          category: 'LGU Advisory',
          summary: data.summary || data.content?.substring(0, 100) + '...',
          content: data.content || '',
          source: data.author || 'LGU Binangonan',
          badge: data.category || 'Advisory',
          date: data.createdAt || new Date().toISOString().split('T')[0],
          important: true,
        });
      });
      if (list.length > 0) {
        callback(list);
      }
    });
  } catch (err) {
    console.warn('Announcements listener note:', err);
    return () => {};
  }
};

// Real-time listener for Resident Reports from Firestore
export const subscribeCitizenReports = (
  callback: (reports: ResidentReport[]) => void
) => {
  try {
    const q = query(collection(db, 'reports'));
    return onSnapshot(q, (snapshot) => {
      const list: ResidentReport[] = [];
      snapshot.forEach((docSnap) => {
        const data = docSnap.data();
        list.push({
          id: docSnap.id,
          category: data.category || 'General',
          barangay: data.barangay || 'Calumpang',
          locationDetail: data.address || data.locationDetail || 'Binangonan',
          description: data.description || '',
          timestamp: data.createdAt ? `Reported ${data.createdAt}` : 'Recent',
          upvotes: data.likes || data.upvotes || 1,
          status: data.status || 'Pending',
          reporterName: data.residentId || data.reporterName || 'Resident',
        });
      });
      if (list.length > 0) {
        callback(list);
      }
    });
  } catch (err) {
    console.warn('Reports listener note:', err);
    return () => {};
  }
};

// Function to submit a report directly to Firestore
export const addReportToFirestore = async (report: ResidentReport) => {
  try {
    await addDoc(collection(db, 'reports'), {
      title: `${report.category} at ${report.locationDetail}`,
      category: report.category,
      description: report.description,
      barangay: report.barangay,
      address: report.locationDetail,
      status: report.status || 'Pending',
      likes: report.upvotes || 1,
      residentId: report.reporterName || 'Resident',
      createdAt: new Date().toISOString().split('T')[0],
    });
  } catch (err) {
    console.error('Error saving report to Firestore:', err);
  }
};
