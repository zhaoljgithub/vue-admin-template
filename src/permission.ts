import router from "./router";
import {
  clearLocalStorage
} from "@/utils/auth";
import { message } from 'ant-design-vue';
import NProgress from "nprogress"; // progress bar
import "nprogress/nprogress.css"; // progress bar style
import { getToken } from "@/utils/auth"; // get token from cookie

NProgress.configure({ showSpinner: false }); // NProgress Configuration

const whiteList = ["/login"]; // no redirect whitelist

router.beforeEach(async (to, from, next) => {
  // start progress bar
  NProgress.start();
  const hasToken = getToken()
  if (hasToken) {
    try {
      if (to.path === "/login") {
        // 清空信息
        clearLocalStorage()
        next();
        NProgress.done()
      } else {
        next();
        NProgress.done()
      }
    } catch (err) {
        message.error('Has Error')
        clearLocalStorage()
        next("/login")
        NProgress.done()
    }
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next();
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      // next(`/login?redirect=${to.path}`)
      clearLocalStorage()
      next("/login")
      NProgress.done()
    }
  }
});

router.afterEach(() => {
  NProgress.done();
});
