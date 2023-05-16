import './page.css';

import MainPage from './pages/main/page';

export default function Home() {
  return (
    <main className="main-container" style={{ colorScheme: 'dark'}}>
      <MainPage />
    </main>
  )
}
