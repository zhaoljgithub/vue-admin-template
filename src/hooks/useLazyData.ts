import { useIntersectionObserver } from '@vueuse/core';
import { ref } from 'vue';
// 数据懒加载函数
export const useLazyData = () => {
  const target = ref(null);
  const isLazy = ref(false);
  useIntersectionObserver(target, ([{ isIntersecting }]) => {
    if (isIntersecting) {
      isLazy.value = true;
    }
  });

  return {
    target,
    isLazy,
  };
};
