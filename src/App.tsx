import { Switch, Route } from "wouter";
import Homepage from "./pages/Homepage";
import Grinds from "./pages/Grinds";
import Settings from "./pages/Settings";
import Stats from "./pages/Stats";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <div className="min-h-screen bg-slate-900">
      <Switch>
        <Route path="/" component={Homepage} />
        <Route path="/grinds" component={Grinds} />
        <Route path="/settings" component={Settings} />
        <Route path="/stats" component={Stats} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

export default App;
