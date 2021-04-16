import React, { useRef, useEffect } from 'react';
import { useLocation, Switch, Router } from 'react-router-dom';
import AppRoute from './utils/AppRoute';
import ScrollReveal from './utils/ScrollReveal';
import ReactGA from 'react-ga';
import { createBrowserHistory } from 'history';
// Layouts
import LayoutDefault from './layouts/LayoutDefault';

// Views 
import Home from './views/Home';

//Initialize Google Analytics
ReactGA.initialize(process.env.REACT_APP_GA_CODE);

const history = createBrowserHistory();

history.listen(location => {
  ReactGA.set({ page: location.pathname });
  ReactGA.pageview(location.pathname);
});


const App = () => {

  const childRef = useRef();
  let location = useLocation();
  
  useEffect(() => {
    document.body.classList.add('is-loaded')
    childRef.current.init();
    //trackPage(location.pathname);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return (
    <Router history={history}>
      <ScrollReveal
        ref={childRef}
        children={() => (
          <Switch>
            <AppRoute exact path="/" component={Home} layout={LayoutDefault} />
          </Switch>
        )} />
    </Router>
  );
}

export default App;