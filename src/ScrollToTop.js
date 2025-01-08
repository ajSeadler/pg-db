import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const location = useLocation(); // useLocation hook provides the current location (pathname)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top with smooth behavior
  }, [location]); // Trigger effect when location (route) changes

  return null;
};

export default ScrollToTop;
