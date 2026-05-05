// Firebase initialization
import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';
import { firebaseConfig, isConfigured } from './firebase-config';

// Initialize Firebase only if we have valid configuration
let app: any = null;
let db: any = null;
let analytics: any = null;

if (isConfigured() && getApps().length === 0) {
  try {
    app = initializeApp(firebaseConfig);
    db = getFirestore(app);
    
    // Initialize Analytics only in browser with valid config
    if (typeof window !== 'undefined') {
      analytics = getAnalytics(app);
    }
  } catch (error) {
    console.warn('Firebase initialization failed:', error);
  }
}

// Export flag to check if Firebase is properly configured
export const isFirebaseConfigured = isConfigured() && app !== null;

// Export Firebase instances (will be null if not configured)
export { db, analytics };
export default app;