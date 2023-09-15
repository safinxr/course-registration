
import './App.css'
import CourseRegistration from './components/CourseRegistration'
import Header from './components/Header'

function App() {


  return (
    <>
      <header className="max-w-7xl mx-auto"><Header></Header></header>
      <main className="max-w-7xl mx-auto">
          <CourseRegistration></CourseRegistration>
      </main>
    </>
  )
}

export default App
