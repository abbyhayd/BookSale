import { BrowserRouter, Routes, Route } from 'react-router'
import { BookSearchPage } from './Pages/BookSearchPage'
import { BookDetailPage } from './Pages/BookDetailPage'
import { AuthorDetailPage } from './Pages/AuthorDetailPage'
import { QueryClient, QueryClientProvider} from '@tanstack/react-query'
import { BookServiceContext } from './Services/BookServiceContext'
import BookService from './Services/BookService'
import { ReviewServiceContext } from './Services/ReviewServiceContext'
import ReviewService from './Services/ReviewService'
import {AuthorServiceContext} from './Services/AuthorServiceContext'
import AuthorService from './Services/AuthorService'
import { AuthorsPage } from './Pages/AuthorsPage'
import { BookSaleServiceContext } from './Services/BookSaleContext'
import BookSaleService from './Services/BookSaleService'
import { NavigationBar } from './Components/NavigationBar'

const queryClient = new QueryClient()

function App() {
  return (
    <AuthorServiceContext.Provider value={AuthorService}>
      <BookServiceContext.Provider value={BookService}>
        <ReviewServiceContext.Provider value={ReviewService}>
          <BookSaleServiceContext.Provider value={BookSaleService}>
            <QueryClientProvider client={queryClient}>
              <BrowserRouter>
              <div>
                <NavigationBar/>
                <Routes>
                  <Route index element={<h1>Home Page</h1>} />
                  <Route path='/search' element={<BookSearchPage/>}/>
                  <Route path='/book/:bookId' element={<BookDetailPage />}/>
                  <Route path='/author/:authorName' element={<AuthorDetailPage />}/>
                  <Route path='/allauthors' element={<AuthorsPage />}/>
                </Routes>
              </div>
              </BrowserRouter>
            </QueryClientProvider>
          </BookSaleServiceContext.Provider>
        </ReviewServiceContext.Provider>
      </BookServiceContext.Provider>
    </AuthorServiceContext.Provider>

  )
}

export default App
