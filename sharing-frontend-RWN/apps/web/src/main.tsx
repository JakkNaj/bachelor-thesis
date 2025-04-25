import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './api/axios-config';

const App = React.lazy(() => import('./App').then(module => ({ default: module.App })));

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<Suspense fallback={<div>Loading...</div>}>
			<App />
		</Suspense>
	</React.StrictMode>
);
