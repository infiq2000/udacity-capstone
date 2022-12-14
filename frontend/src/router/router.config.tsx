import AccountInfo from "../pages/AccountInfo";
import Activity from "../pages/Activity";
import FavouriteList from "../pages/FavouriteList";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import Passages from "../pages/Passages";
import PassagesDetail from "../pages/PassagesDetail";
import PersonalCollection from "../pages/PersonalCollection";
import PersonalCollectionDetail from "../pages/PersonalCollectionDetail";
import PublicCollection from "../pages/PublicCollection";
import PublicCollectionDetail from "../pages/PublicCollectionDetail";
import ReadingTests from "../pages/ReadingTests";
import ReadingTestsDetail from "../pages/ReadingTestsDetail";
import SignUp from "../pages/SignUp";
import Vocabulary from "../pages/Vocabulary";
import VocabularyList from "../pages/VocabularyList";
import RouterPath from "./RouterPath";
import { RouteConfig } from "./types";
export const routesConfig: RouteConfig[] = [
  {
    path: RouterPath.HOME,
    component: Home,
    isProtected: false,
  },
  {
    path: RouterPath.NOT_FOUND,
    component: NotFound,
    isProtected: false,
  },
  {
    path: RouterPath.READING_TESTS,
    component: ReadingTests,
    isProtected: false,
  },
  {
    path: RouterPath.READING_TESTS_DETAIL,
    component: ReadingTestsDetail,
    isProtected: false,
  },
  {
    path: RouterPath.READING_PASSAGES,
    component: Passages,
    isProtected: false,
  },
  {
    path: RouterPath.READING_PASSAGES_DETAIL,
    component: PassagesDetail,
    isProtected: false,
  },

  {
    path: RouterPath.PERSONAL_COLLECTION,
    component: PersonalCollection,
    isProtected: true,
  },
  {
    path: RouterPath.PERSONAL_COLLECTION_DETAIL,
    component: PersonalCollectionDetail,
    isProtected: true,
  },
  { path: RouterPath.ACTIVITY, component: Activity, isProtected: true },
  {
    path: RouterPath.PUBLIC_COLLECTION,
    component: PublicCollection,
    isProtected: false,
  },
  {
    path: RouterPath.PUBLIC_COLLECTION_DETAIL,
    component: PublicCollectionDetail,
    isProtected: false,
  },
  {
    path: RouterPath.ACCOUNT_INFORMATION,
    component: AccountInfo,
    isProtected: true,
  },
  {
    path: RouterPath.FAVOURITE_LIST,
    component: FavouriteList,
    isProtected: true,
  },
  {
    path: RouterPath.VOCABULARY_LIST,
    component: VocabularyList,
    isProtected: true,
  },
  {
    path: RouterPath.VOCABULARY,
    component: Vocabulary,
    isProtected: true,
  },
  // {
  //   path: RouterPath.LOGIN,
  //   component: Login,
  //   isProtected: false,
  // },
  {
    path: RouterPath.REGISTER,
    component: SignUp,
    isProtected: false,
  },
];
