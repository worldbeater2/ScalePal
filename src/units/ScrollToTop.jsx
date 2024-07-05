import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import React from 'react'

/**
 * 
 * 
 * 
 *
 * @return {null} 
 */
const ScrollToTop = () => {

  /**
   * Destructures the pathname from the useLocation hook.
   *
   * @type {string}
   */
  const { pathname } = useLocation();

  /**
   * useEffect hook is used to scroll the window to the top whenever
   * the pathname changes.
   *
   * @return {void} Does not return anything.
   */
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // Return null as the component doesn't render anything to the DOM.
  return null;

}

export default ScrollToTop;