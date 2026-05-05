# Firebase Setup Guide for Neo Technology Solutions

This guide will help you configure Firebase for your contact form submissions and enable all Firebase features on your website.

## 1. Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project"
3. Enter project name: `neotechnology-solutions`
4. Enable Google Analytics (recommended)
5. Complete the setup

## 2. Get Firebase Configuration

1. In Firebase Console, click the gear icon → Project settings
2. In the "General" tab, scroll down to "Your apps"
3. Click the web icon `</>` to add a web app
4. Register your app with nickname: `neotechnology-website`
5. Copy the Firebase configuration object

## 3. Configure Environment Variables

Update the `/lib/firebase-config.ts` file with your actual Firebase configuration:

```typescript
export const firebaseConfig = {
  apiKey: "AIzaSyExample...", // Your actual API key
  authDomain: "neotechnology-solutions.firebaseapp.com",
  projectId: "neotechnology-solutions",
  storageBucket: "neotechnology-solutions.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456",
  measurementId: "G-ABCDEFGHIJ"
};
```

## 4. Set up Firestore Database

1. In Firebase Console, go to "Firestore Database"
2. Click "Create database"
3. Choose "Start in test mode" (we'll configure rules later)
4. Select a location close to your users
5. Click "Done"

## 5. Configure Firestore Security Rules

Go to "Firestore Database" → "Rules" and update with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read/write access to contacts collection
    match /contacts/{document} {
      allow write: if true; // Allow contact form submissions
      allow read: if false; // Prevent reading contact data from frontend
    }
  }
}
```

## 6. Set up Firebase Authentication (Optional)

If you want to add user authentication later:

1. Go to "Authentication" → "Sign-in method"
2. Enable desired providers (Email/Password, Google, etc.)
3. Configure OAuth settings for each provider

## 7. Enable Firebase Analytics

1. Go to "Analytics" → "Events"
2. Analytics will automatically start tracking page views
3. Custom events are already configured in the contact form

## 8. Set up Firebase Hosting (Optional)

To host your website on Firebase:

1. Install Firebase CLI: `npm install -g firebase-tools`
2. Login: `firebase login`
3. Initialize: `firebase init hosting`
4. Select your project
5. Build your app and deploy: `firebase deploy`

## 9. Test Configuration

1. Replace the placeholder values in `/lib/firebase-config.ts`
2. Save the file
3. Open your website
4. Go to the contact section
5. Fill out and submit the contact form
6. Check Firebase Console → Firestore Database → `contacts` collection
7. You should see your test submission

## 10. Security Recommendations

### For Production:
1. **Update Firestore Rules**: Implement proper security rules
2. **API Key Restrictions**: Restrict your API key to your domain
3. **CORS Configuration**: Set up proper CORS headers
4. **Rate Limiting**: Implement rate limiting for form submissions

### API Key Security:
1. Go to Google Cloud Console → APIs & Services → Credentials
2. Find your API key
3. Click "Restrict key"
4. Add your domain(s) to "HTTP referrers"

## 11. Monitor and Analytics

### View Contact Submissions:
1. Firebase Console → Firestore Database → `contacts` collection
2. Each document contains: name, email, company, message, timestamp, source

### Analytics Dashboard:
1. Firebase Console → Analytics → Dashboard
2. View page views, user engagement, and custom events
3. Contact form submissions are tracked as custom events

## 12. Backup and Export

### Automated Backups:
Set up automated Firestore backups in Google Cloud Console

### Export Data:
Use Firebase CLI to export contact data:
```bash
firebase firestore:export gs://your-bucket/backup-folder
```

## Troubleshooting

### Common Issues:

1. **"Permission denied" errors**: Check Firestore rules
2. **"API key not valid" errors**: Verify API key configuration
3. **CORS errors**: Check domain restrictions
4. **Contact form not working**: Check browser console for errors

### Debug Mode:
Enable debug mode by opening browser console and running:
```javascript
window.localStorage.setItem('debug', 'firebase:*');
```

## Support

For Firebase-specific issues:
- [Firebase Documentation](https://firebase.google.com/docs)
- [Firebase Support](https://firebase.google.com/support)

For Neo Technology Solutions support:
- Email: contact@neotechnology.solutions
- Website: neotechnology.solutions