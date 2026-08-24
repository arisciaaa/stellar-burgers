import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ConstructorPage } from '@pages';
import styles from './app.module.css';
import { useNavigate } from 'react-router-dom';

import {
  AppHeader,
  Modal,
  OrderInfo,
  IngredientDetails,
  ProtectedRoute,
  UnAuthRoute
} from '@components';

import { Preloader } from '@ui';

import { getIngredientsThunk } from '../../services/slices/ingredientsSlice';
import { getUserThunk } from '../../services/slices/userSlice';
import { useDispatch, useSelector } from '../../services/store';

import {
  Feed,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  Profile,
  ProfileOrders,
  NotFound404
} from '@pages';

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const ingredients = useSelector((state) => state.ingredients.ingredients);
  const isIngredientsLoading = useSelector(
    (state) => state.ingredients.isLoading
  );
  const error = useSelector((state) => state.ingredients.error);
  const isAuthChecked = useSelector((state) => state.user.isAuthChecked);

  useEffect(() => {
    dispatch(getIngredientsThunk());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getUserThunk());
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route
          path='/login'
          element={
            <UnAuthRoute>
              <Login />
            </UnAuthRoute>
          }
        />

        <Route
          path='/register'
          element={
            <UnAuthRoute>
              <Register />
            </UnAuthRoute>
          }
        />

        <Route
          path='/forgot-password'
          element={
            <UnAuthRoute>
              <ForgotPassword />
            </UnAuthRoute>
          }
        />

        <Route
          path='/reset-password'
          element={
            <UnAuthRoute>
              <ResetPassword />
            </UnAuthRoute>
          }
        />
        <Route
          path='/profile'
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path='/profile/orders'
          element={
            <ProtectedRoute>
              <ProfileOrders />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile/orders/:number'
          element={
            <ProtectedRoute>
              <Modal title='' onClose={() => navigate(-1)}>
                <OrderInfo />
              </Modal>
            </ProtectedRoute>
          }
        />
        <Route
          path='/feed/:number'
          element={
            <Modal title='' onClose={() => navigate(-1)}>
              <OrderInfo />
            </Modal>
          }
        />

        <Route
          path='/ingredients/:id'
          element={
            <Modal title='' onClose={() => navigate(-1)}>
              <IngredientDetails />
            </Modal>
          }
        />

        <Route path='*' element={<NotFound404 />} />
      </Routes>
    </div>
  );
};

export default App;
