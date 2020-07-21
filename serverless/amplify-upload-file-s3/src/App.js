import React, { Fragment } from 'react';

import MyAppBar from './components/appBar';

// import { withAuthenticator } from '@aws-amplify/ui-react';
import { I18n } from "aws-amplify";
import vocabularies from "./i18n/vocabularies";

I18n.putVocabularies(vocabularies);
I18n.setLanguage("ja");

function App() {
    return (
        <Fragment>
            <MyAppBar/>
        </Fragment>
    );
}

export default App;
// export default withAuthenticator(App);