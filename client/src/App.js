// import files
import React from "react";

// import react-router library, switch component
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";

// import statement @apollo/client
import { setContext } from '@apollo/client/link/context';

import Header from "./components/Header";
import Footer from "./components/Footer";



// import page components
import Home from "./pages/Home";
import Login from "./pages/Login";
import NoMatch from "./pages/NoMatch";
import SingleThought from "./pages/SingleThought";
import Profile from "./pages/Profile";
import Signup from "./pages/Signup";

const httpLink = createHttpLink({
  uri: "/graphql",
});

// setContext: create a middleware function that will retrieve the token, combine it with httpLink
// authLink: setContext() to retrieve the token from localStorage, set the HTTP req headers of evry req to include the token
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      // ... spread operator
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  // combine authlink and httplink
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

// App functional component
function App() {
  return (
    <ApolloProvider client={client}>
      {/* wrapped div element in a router, child components on page aware of the client-side routing */}
      <Router>
        <div className="flex-column justify-flex-start min-100-vh">
          <Header />
          <div className="container">
            {/* wrapped all route components in a switch comp, include one or more */}
            <Switch>
              {/* path route will render the component */}
              <Route exact path="/" component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/signup" component={Signup} />
              {/* ? means the () is optional, /profile/myusername will both render the profile component */}
              <Route exact path="/profile/:username?" component={Profile} />
              <Route exact path="/thought/:id" component={SingleThought} />

             {/* route at the end to render the nomatch comp */}
              <Route component={NoMatch} />
            </Switch>
          </div>
          <Footer />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
