import {createBrowserRouter, RouterProvider, ScrollRestoration} from "react-router-dom"
import { AuthProvider } from './Components/AuthContext/AuthContext';
import './App.css'
import Layout from './Layout/Layout'
import Connexion from './Pages/Connexion/Connexion'
import NouveauCompte from "./Pages/NouveauCompte/NouveauCompte"
import APropos from './Pages/A Propos/APropos'
import MentionsLegales from './Pages/MentionsLegales/MentionsLegales'
import Contact from './Pages/Contact/Contact'
import Error from './Pages/Error/Error'
import RecemmentAjoutes from "./Pages/RecemmentAjoutes/RecemmentAjoutes"
import MieuxNotes from "./Pages/MieuxNotes/MieuxNotes"
import CreationScenario from "./Pages/CreationScenario/CreationScenario"
import JeuxCategories from "./Pages/JeuxCategories/JeuxCategories"
import Scenario from "./Pages/Scenario/Scenario"
import TousScenarios from "./Pages/TousScenarios/TousScenarios"
import TousJeux from "./Pages/TousJeux/TousJeux"
import ScenarioSimilaire from "./Pages/ScenarioSimilaire/ScenarioSimilaire"
import ChoixIA from "./Pages/ChoixIA/ChoixIA"
import CompteUtilisateur from "./Pages/CompteUtilisateur/CompteUtilisateur"
import EcrireScenario from "./Pages/EcrireScenario/EcrireScenario"
import Jeu from "./Pages/Jeu/Jeu"
import JeuxSimilaire from "./Pages/JeuxSimilaire/JeuxSimilaire"
import MonCompte from "./Pages/MonCompte/MonCompte"
import PublicationScenario from "./Pages/PublicationScenario/PublicationScenario"
import ScenariosCategories from "./Pages/ScenariosCategories/ScenariosCategories"
import UtilisationIA from "./Pages/UtilisationIA/UtilisationIA"


function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout/>,
      errorElement: <Error/>,
      children:[
        {
          path: "/connexion",
          element: <Connexion/>,
          errorElement: <Error/>,
        },
        {
          path: "/nouveaucompte",
          element: <NouveauCompte/>,
          errorElement: <Error/>,
          },
          {
            path: "/apropos",
            element: <APropos/>,
            errorElement: <Error/>,
          },
          {
            path: "/mentionslegales",
            element: <MentionsLegales/>,
            errorElement: <Error/>,
          },
          {
            path: "/contact",
            element: <Contact/>,
            errorElement: <Error/>,
          },
          {
            path: "/recemmentajoutes",
          element: <RecemmentAjoutes/>,
          errorElement: <Error/>,
        },
        {
          path: "/mieuxnotes",
          element: <MieuxNotes/>,
          errorElement: <Error/>,
        },
        {
          path: "/creationscenario",
          element: <CreationScenario/>,
          errorElement: <Error/>,
        },
        {
          path: "/jeuxcategories",
          element: <JeuxCategories/>,
          errorElement: <Error/>,
        },
        {
          path: "/scenario/:scenarioId",
          element: <Scenario />,
          errorElement: <Error />,
        },
        {
          path: "/tousscenarios",
          element: <TousScenarios/>,
          errorElement: <Error/>,
        },
        {
          path: "/tousjeux",
          element: <TousJeux/>,
          errorElement: <Error/>,
        },
        {
          path: "/scenariossimilaire",
          element: <ScenarioSimilaire/>,
          errorElement: <Error/>,
        },
        {
          path: "/choixia",
          element: <ChoixIA/>,
          errorElement: <Error/>,
        },
        {
          path: "/compteutilisateur",
          element: <CompteUtilisateur/>,
          errorElement: <Error/>,
        },
        {
          path: "/ecrirescenario",
          element: <EcrireScenario/>,
          errorElement: <Error/>,
        },
        {
          path: "/jeu/:gameId",
          element: <Jeu />,
          errorElement: <Error />,
        },
        {
          path: "/jeuxsimilaire",
          element: <JeuxSimilaire/>,
          errorElement: <Error/>,
        },
        {
          path: "/moncompte",
          element: <MonCompte/>,
          errorElement: <Error/>,
        },
        {
          path: "/publicationscenario",
          element: <PublicationScenario/>,
          errorElement: <Error/>,
        },
        {
          path: "/scenarioscategories",
          element: <ScenariosCategories/>,
          errorElement: <Error/>,
        },
        {
          path: "/utilisationia",
          element: <UtilisationIA/>,
          errorElement: <Error/>,
        },
      ],
    },
  ]);

  return (
    <AuthProvider>
      <RouterProvider router={router}/>
    </AuthProvider>
  )
}

export default App
