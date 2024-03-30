import React from 'react'
import { createBrowserRouter, Route, createRoutesFromElements, RouterProvider } from 'react-router-dom'
import Home from './pages/Home'
import News from './pages/News'
import Search from './pages/Search'
import About from './pages/About'


const newRoutes = createBrowserRouter(

  createRoutesFromElements(
    <Route path="/" >
      
      <Route index element={<Home />} />

      <Route path="about" element={<About></About>} />
      <Route path="Search" element={<Search></Search>} />
      <Route path="News" element={<News></News>} />

      {/* <Route path="*" element={<PageNotFound></PageNotFound>} /> */}

    </Route>
  )
)

const App = () => {
  return (
    <RouterProvider
      router={newRoutes}
    />
  )
}

export default App