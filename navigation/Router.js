// @flow
import { createRouter } from "@expo/ex-navigation";

import HomeScreen from "../screens/HomeScreen";
import ArticleListScreen from "../screens/ArticleListScreen";
import WebScreen from "../screens/WebScreen";

export default createRouter(() => ({
  home: () => HomeScreen,
  articleList: () => ArticleListScreen,
  article: () => WebScreen,
}));
