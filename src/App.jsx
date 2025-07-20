import { lazy, Suspense } from "react";
import "./App.css";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import SharedLayout from "./components/SharedLayout/SharedLayout";
import { Toaster } from "react-hot-toast";

const HomePage = lazy(() => import("./pages/HomePage/HomePage"));
const CatalogPage = lazy(() => import("./pages/CatalogPage/CatalogPage"));
const DetailsPage = lazy(() => import("./pages/DetailsPage/DetailsPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage/NotFoundPage"));
const FeaturesPage = lazy(() => import("./pages/FeaturesPage/FeaturesPage"));
const ReviewsPage = lazy(() => import("./pages/ReviewsPage/ReviewsPage"));

function App() {
  const location = useLocation();

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Suspense>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<SharedLayout />}>
            <Route index element={<HomePage />} />
            <Route path="catalog" element={<CatalogPage />} />
            <Route path="catalog/:id" element={<DetailsPage />}>
              <Route index element={<Navigate to="features" replace />} />
              <Route path="features" element={<FeaturesPage />} />
              <Route path="reviews" element={<ReviewsPage />} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
