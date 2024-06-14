import ModalSucces from './ModalSucces';
import {
  createProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
  getProductById,
  handleCheckout,
  getAllCheckouts,
  getCheckoutItemsByCheckoutId,
} from './ProviderServices';
import {AlertError, AlertInfo, AlertSuccsess} from './CSweetAlert';
import CModal from './CModal';

export {
  ModalSucces,
  createProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
  AlertError,
  AlertInfo,
  AlertSuccsess,
  CModal,
  getProductById,
  handleCheckout,
  getAllCheckouts,
  getCheckoutItemsByCheckoutId,
};
